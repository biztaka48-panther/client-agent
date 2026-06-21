"""
LINE Webhook ルーター

エンドポイント:
- POST /webhooks/line/log
    ログ収集 Bot 用。署名検証 → イベントパース → ログ出力。
    （Sheets への書き込みは GAS 側（line-logger-bot/Code.gs）が行うため、
      このエンドポイントは受信確認とデバッグログが主な責務です。
      将来的に Python 側で Sheets 書き込みをしたい場合はここを拡張してください。）

- POST /webhooks/line/secretary
    AI 秘書 Bot 用。
    1. 署名検証
    2. イベントパース
    3. 「まとめ」トリガー検出
    4. Google Sheets から直近ログ取得
    5. Claude API で状況整理＋返信案生成
    6. LINE Reply API で返信

設計方針:
- 署名検証失敗は 401 で返す（LINE からのリクエストでなければ以降の処理は不要）。
- 致命的なエラー（環境設定漏れ等）は 500 で返して運用者が気づけるようにする。
- 「まとめ」以外のメッセージは 200 を返してスキップする。
"""

from __future__ import annotations

import json
import logging

from fastapi import APIRouter, Header, HTTPException, Request

from app.core import claude_client, sheets_client
from app.core.config import settings
from app.core.line_utils import (
    build_error_reply,
    find_trigger_event,
    parse_events,
    reply_text,
    verify_line_signature,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks/line", tags=["line"])


# ---------------------------------------------------------------------------
# 共通ヘルパー
# ---------------------------------------------------------------------------

async def _get_parsed_events(
    request: Request,
    x_line_signature: str | None,
    channel_secret: str | None,
    bot_name: str,
) -> tuple[list, dict]:
    """
    署名検証 → JSON パース → イベントパース の共通フロー。

    戻り値: (parsed_events, raw_payload)
    エラー時は HTTPException を投げる。
    """
    body = await request.body()

    if not channel_secret:
        logger.error("[%s] channel_secret が未設定です。Settings を確認してください。", bot_name)
        raise HTTPException(status_code=500, detail=f"[{bot_name}] 環境変数 channel_secret が未設定")

    if not x_line_signature:
        raise HTTPException(status_code=401, detail="Missing header: X-Line-Signature")

    if not verify_line_signature(channel_secret, body, x_line_signature):
        logger.warning("[%s] 署名検証失敗。不正なリクエストの可能性があります。", bot_name)
        raise HTTPException(status_code=401, detail="Invalid X-Line-Signature")

    try:
        payload = json.loads(body.decode("utf-8"))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON: {e}") from e

    parsed = parse_events(payload)
    logger.info("[%s] Webhook received. events=%d", bot_name, len(parsed))
    for ev in parsed:
        logger.debug(
            "[%s] event ts=%s type=%s group=%s user=%s msgType=%s text=%.80s",
            bot_name,
            ev.timestamp,
            ev.event_type,
            ev.group_id,
            ev.user_id,
            ev.message_type,
            ev.message_text,
        )

    return parsed, payload


# ---------------------------------------------------------------------------
# ログ収集 Bot（/webhooks/line/log）
# ---------------------------------------------------------------------------

@router.post("/log")
async def line_log_webhook(
    request: Request,
    x_line_signature: str | None = Header(default=None, alias="X-Line-Signature"),
) -> dict:
    """
    ログ収集 Bot のWebhook受け口。

    現状の責務:
    - LINE Webhook を受信して署名検証
    - イベント内容をサーバーログに出力（デバッグ・監査用）
    - 200 OK を返す（Sheets への書き込みは GAS 側が行う）

    拡張候補:
    - 将来的に Python 側で Sheets に直接書き込む場合は
      sheets_client の write 系関数をここから呼ぶ。
    """
    parsed, _ = await _get_parsed_events(
        request, x_line_signature, settings.line_log_channel_secret, "LogBot"
    )
    return {"ok": True, "events_received": len(parsed)}


# ---------------------------------------------------------------------------
# AI 秘書 Bot（/webhooks/line/secretary）
# ---------------------------------------------------------------------------

@router.post("/secretary")
async def line_secretary_webhook(
    request: Request,
    x_line_signature: str | None = Header(default=None, alias="X-Line-Signature"),
) -> dict:
    """
    AI 秘書 Bot のWebhook受け口。

    処理フロー:
    1. 署名検証
    2. イベントパース
    3. 「まとめ」トリガー検出（なければ無視して 200）
    4. Google Sheets から直近ログ取得
    5. Claude API で状況整理＋返信案生成
    6. LINE Reply API で返信
    """
    parsed, _ = await _get_parsed_events(
        request, x_line_signature, settings.line_secretary_channel_secret, "SecretaryBot"
    )

    # --- ステップ3: トリガー検出 ---
    trigger = find_trigger_event(parsed, trigger_text="まとめ")
    if not trigger:
        logger.info("[SecretaryBot] 「まとめ」トリガーなし。処理をスキップします。")
        return {"ok": True, "action": "ignored"}

    reply_token = trigger.reply_token
    group_id = trigger.group_id

    if not reply_token:
        logger.error("[SecretaryBot] replyToken がありません。LINE の仕様変更の可能性があります。")
        raise HTTPException(status_code=400, detail="Missing replyToken")
    if not group_id:
        logger.warning("[SecretaryBot] groupId がありません。個人チャットは現在非対応です。")
        raise HTTPException(status_code=400, detail="Missing groupId (個人チャットは非対応)")

    # --- ステップ4〜5: Sheets → Claude ---
    reply_msg: str
    try:
        _assert_secretary_settings()

        limit = settings.summary_limit
        logs = sheets_client.fetch_recent_logs(
            group_id=group_id,
            service_account_json=settings.google_service_account_json,  # type: ignore[arg-type]
            spreadsheet_id=settings.google_sheets_spreadsheet_id,  # type: ignore[arg-type]
            sheet_range=settings.google_sheets_range,
            limit=limit,
        )
        logger.info("[SecretaryBot] Sheets から %d 件取得。group_id=%s", len(logs), group_id)

        result = claude_client.call_claude(
            logs=logs,
            group_id=group_id,
            api_key=settings.claude_api_key,  # type: ignore[arg-type]
            model=settings.claude_model,
            extra_instruction=settings.summary_extra_instruction,
        )
        reply_msg = result.text

    except Exception as e:
        logger.exception("[SecretaryBot] 要約生成に失敗しました。")
        reply_msg = build_error_reply(title="要約の生成に失敗しました", detail=str(e))

    # --- ステップ6: LINE へ返信 ---
    try:
        await reply_text(
            access_token=settings.line_secretary_channel_access_token,  # type: ignore[arg-type]
            reply_token=reply_token,
            text=reply_msg,
        )
    except Exception as e:
        logger.exception("[SecretaryBot] LINE 返信に失敗しました。")
        raise HTTPException(status_code=500, detail=f"LINE 返信失敗: {e}") from e

    return {"ok": True, "action": "replied", "group_id": group_id}


def _assert_secretary_settings() -> None:
    """秘書 Bot に必要な設定が揃っているか確認。足りなければ RuntimeError。"""
    missing = []
    if not settings.claude_api_key:
        missing.append("CLAUDE_API_KEY")
    if not settings.google_service_account_json:
        missing.append("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not settings.google_sheets_spreadsheet_id:
        missing.append("GOOGLE_SHEETS_SPREADSHEET_ID")
    if not settings.line_secretary_channel_access_token:
        missing.append("LINE_SECRETARY_CHANNEL_ACCESS_TOKEN")
    if missing:
        raise RuntimeError(f"必須の環境変数が未設定です: {', '.join(missing)}")
