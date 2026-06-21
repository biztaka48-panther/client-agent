"""
AI秘書Bot（FastAPI）

要件（Step3）:
- POST /webhook/secretary を追加
  - LINEからのWebhookを受け取る
  - 「まとめ」というテキストを検知
  - Sheets取得 → Claude分析 → LINE返信（Reply API）

起動例（PowerShell）:
  set LINE_SECRETARY_CHANNEL_SECRET=xxxxx
  set LINE_SECRETARY_CHANNEL_ACCESS_TOKEN=xxxxx
  set GOOGLE_SERVICE_ACCOUNT_JSON=...（サービスアカウントJSON文字列）
  set GOOGLE_SHEETS_SPREADSHEET_ID=xxxx
  set CLAUDE_API_KEY=xxxx
  uvicorn main:app --reload --port 8002 --app-dir ai-secretary-bot
"""

from __future__ import annotations

import json
import logging
import os
from typing import Any, Dict, Optional

import httpx
from fastapi import FastAPI, Header, HTTPException, Request

import claude_client
import sheets_client
import utils


logger = logging.getLogger("ai_secretary")
logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))

LINE_REPLY_API_URL = "https://api.line.me/v2/bot/message/reply"

app = FastAPI(title="AI Secretary Bot API", version="0.1.0")


def _env_required(key: str) -> str:
    v = os.getenv(key)
    if not v:
        raise RuntimeError(f"Missing env: {key}")
    return v


def _extract_trigger_event(payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    payload(events) から「まとめ」トリガーに該当するイベントを1つ抽出する。

    方針:
    - events は複数入り得るため、最初に見つかった「まとめ」メッセージを採用
    - textメッセージ以外は対象外
    """

    events = payload.get("events") or []
    if not isinstance(events, list):
        return None

    for ev in events:
        msg = (ev or {}).get("message") or {}
        if msg.get("type") != "text":
            continue
        text = (msg.get("text") or "").strip()
        if text == "まとめ":
            return ev
    return None


def _build_line_reply_body(reply_token: str, message_text: str) -> Dict[str, Any]:
    """
    LINE Reply API のリクエストbodyを作る。
    """

    return {
        "replyToken": reply_token,
        "messages": [
            {
                "type": "text",
                "text": message_text,
            }
        ],
    }


async def _reply_to_line(*, access_token: str, reply_token: str, message_text: str) -> None:
    """
    LINE Reply API を呼び出して返信する。

    エラー設計:
    - 失敗時は例外を投げ、上位でログ出し＋（必要なら）エラーメッセージ返信へ繋げる
    """

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    body = _build_line_reply_body(reply_token, message_text)

    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.post(LINE_REPLY_API_URL, headers=headers, json=body)
        if r.status_code < 200 or r.status_code >= 300:
            raise RuntimeError(f"LINE Reply API error: {r.status_code} {r.text}")


@app.post("/webhook/secretary")
async def webhook_secretary(
    request: Request,
    x_line_signature: Optional[str] = Header(default=None, alias="X-Line-Signature"),
) -> Dict[str, Any]:
    """
    LINE Webhook（秘書Bot）受け口。

    処理フロー:
    1. LINE Webhookを受信
    2. 署名検証
    3. メッセージが「まとめ」かチェック
    4. Google Sheetsから会話ログ取得
    5. Claude APIで分析
    6. 返信メッセージを整形
    7. LINE Reply APIで返信
    """

    body = await request.body()

    # 1) 署名検証に必要な秘密情報
    try:
        secret = _env_required("LINE_SECRETARY_CHANNEL_SECRET")
    except Exception as e:
        logger.exception("env error")
        raise HTTPException(status_code=500, detail=str(e))

    if not x_line_signature:
        raise HTTPException(status_code=401, detail="Missing header: X-Line-Signature")

    if not utils.verify_line_signature(secret, body, x_line_signature):
        raise HTTPException(status_code=401, detail="Invalid signature")

    # 2) JSONパース
    try:
        payload = json.loads(body.decode("utf-8"))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON: {e}")

    trigger_event = _extract_trigger_event(payload)
    if not trigger_event:
        # 「まとめ」以外は何もしない（Webhookの受信としては成功扱いにする）
        return {"ok": True, "action": "ignored"}

    # 3) 返信に必要な情報を取り出す
    reply_token = trigger_event.get("replyToken") or ""
    source = trigger_event.get("source") or {}
    group_id = source.get("groupId") or ""

    if not reply_token:
        # ReplyToken が無いと返信できない
        raise HTTPException(status_code=400, detail="Missing replyToken")
    if not group_id:
        # groupId が無いと Sheets から拾う対象が決められない（個チャ対応をするならここを拡張）
        raise HTTPException(status_code=400, detail="Missing groupId")

    # 4) Sheets → Claude → 返信作成
    try:
        limit = int(os.getenv("SUMMARY_LIMIT", "100"))
        logs = sheets_client.fetch_recent_logs(group_id=group_id, limit=limit)
        extra = os.getenv("SUMMARY_EXTRA_INSTRUCTION")
        claude_result = claude_client.call_claude(logs=logs, group_id=group_id, extra_instruction=extra)
        reply_text = utils.format_reply_message(claude_result.text)
    except Exception as e:
        logger.exception("summary generation failed")
        reply_text = utils.build_error_message(title="要約の生成に失敗しました", detail=str(e))

    # 5) LINEへ返信
    try:
        access_token = _env_required("LINE_SECRETARY_CHANNEL_ACCESS_TOKEN")
        await _reply_to_line(access_token=access_token, reply_token=reply_token, message_text=reply_text)
    except Exception as e:
        logger.exception("reply failed")
        # 返信に失敗した場合は、Webhook側は 500 にして運用で検知できるようにする
        raise HTTPException(status_code=500, detail=f"Reply failed: {e}")

    return {"ok": True, "action": "replied", "group_id": group_id}

