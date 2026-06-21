"""
LINE Webhook 検証用のローカルサーバー（FastAPI）

目的:
- LINE Webhook の署名検証（HMAC-SHA256）
- Webhook ペイロードのパース（events の取り出し）
- 受信内容をログに出して、GAS や本番実装前の切り分けを容易にする

使い方（例）:
  set LINE_CHANNEL_SECRET=xxxxx
  uvicorn line_handler:app --reload --port 8001 --app-dir ai-secretary-bot

  # テスト送信
  python ai-secretary-bot/test_webhook.py

注意:
- これは「検証用」です。実運用では、イベント種別ごとの処理や再送対策などが必要です。
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import logging
import os
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
import importlib.util
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, Header, HTTPException, Request


logger = logging.getLogger("line_handler")
logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))


@dataclass
class ParsedEvent:
    """
    LINE events のうち、ログ用途で最低限欲しい項目を抜き出した形。
    - 実装が進んだら Pydantic モデルに置き換えてもOK
    """

    timestamp: str
    event_type: str
    group_id: str
    user_id: str
    message_type: str
    message_text: str
    reply_token: str


def _load_local_module(module_filename: str, module_name: str):
    """
    `ai-secretary-bot/` はフォルダ名にハイフンが含まれ、通常の import（パッケージ）に向きません。
    そのため、この検証用サーバーでは「同じフォルダにある .py を動的に読み込む」方式で連携します。

    - 本番実装では、フォルダ名を `ai_secretary_bot/` のようにして通常importに寄せるのがおすすめです。
    """

    here = Path(__file__).resolve().parent
    target = here / module_filename
    spec = importlib.util.spec_from_file_location(module_name, target)
    if not spec or not spec.loader:
        raise RuntimeError(f"Cannot load module: {target}")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def try_run_summary_flow(parsed_events: List[ParsedEvent]) -> Optional[Dict[str, Any]]:
    """
    「まとめ」トリガーを検出したときだけ、Sheets→Claudeの流れを実行する。

    返り値:
    - トリガーが無い: None
    - トリガーがある: { ok, group_id, logs_count, claude_text / error }
    """

    trigger_event: Optional[ParsedEvent] = None
    for ev in parsed_events:
        if ev.message_type == "text" and (ev.message_text or "").strip() == "まとめ":
            trigger_event = ev
            break

    if not trigger_event:
        return None

    if not trigger_event.group_id:
        # グループIDが無いと、Sheetsのフィルタ対象が決められない
        return {"ok": False, "error": "Missing group_id in trigger event"}

    try:
        sheets_client = _load_local_module("sheets_client.py", "sheets_client")
        claude_client = _load_local_module("claude_client.py", "claude_client")

        limit = int(os.getenv("SUMMARY_LIMIT", "100"))
        logs = sheets_client.fetch_recent_logs(group_id=trigger_event.group_id, limit=limit)

        # 追加指示は環境変数で上書きできるようにしておく（運用で調整しやすい）
        extra = os.getenv("SUMMARY_EXTRA_INSTRUCTION")
        result = claude_client.call_claude(logs=logs, group_id=trigger_event.group_id, extra_instruction=extra)

        return {
            "ok": True,
            "group_id": trigger_event.group_id,
            "logs_count": len(logs),
            "claude_text": result.text,
        }
    except Exception as e:
        logger.exception("summary flow failed")
        return {"ok": False, "group_id": trigger_event.group_id, "error": str(e)}


def verify_line_signature(channel_secret: str, body: bytes, x_line_signature: str) -> bool:
    """
    LINE Webhook の署名検証。

    仕様:
    - computed = Base64( HMAC_SHA256(channelSecret, requestBodyBytes) )
    - ヘッダ X-Line-Signature と computed が一致すればOK

    なぜ必要か:
    - Webhook が第三者に改ざんされていないことを検証するため
    """

    mac = hmac.new(channel_secret.encode("utf-8"), body, hashlib.sha256).digest()
    computed = base64.b64encode(mac).decode("utf-8")
    return computed == (x_line_signature or "").strip()


def parse_events(payload: Dict[str, Any]) -> List[ParsedEvent]:
    """
    Webhook payload（JSON）から events を取り出し、ログに使いやすい形へ変換。

    ここでは「落ちにくさ」を優先しており、未知の構造でも例外にならないように
    .get を多用しています。
    """

    events = payload.get("events") or []
    parsed: List[ParsedEvent] = []

    for ev in events:
        # LINE の timestamp はミリ秒（epoch）
        ts_ms = ev.get("timestamp")
        if isinstance(ts_ms, int):
            dt = datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc)
            timestamp = dt.isoformat()
        else:
            timestamp = datetime.now(timezone.utc).isoformat()

        source = ev.get("source") or {}
        group_id = source.get("groupId") or ""
        user_id = source.get("userId") or ""

        event_type = ev.get("type") or ""
        reply_token = ev.get("replyToken") or ""

        message = ev.get("message") or {}
        message_type = message.get("type") or ""

        # テキスト以外も最低限の識別情報を残す（画像/ファイル等）
        if message_type == "text":
            message_text = message.get("text") or ""
        elif message_type in {"image", "video", "audio"}:
            message_text = f"id={message.get('id','')}"
        elif message_type == "file":
            message_text = f"fileName={message.get('fileName','')} fileSize={message.get('fileSize','')} id={message.get('id','')}"
        elif message_type == "sticker":
            message_text = f"packageId={message.get('packageId','')} stickerId={message.get('stickerId','')}"
        elif message_type == "location":
            message_text = f"title={message.get('title','')} address={message.get('address','')}"
        else:
            # 未知の type でも情報が残るよう JSON 化しておく
            try:
                message_text = json.dumps(message, ensure_ascii=False)
            except Exception:
                message_text = str(message)

        parsed.append(
            ParsedEvent(
                timestamp=timestamp,
                event_type=event_type,
                group_id=group_id,
                user_id=user_id,
                message_type=message_type,
                message_text=message_text,
                reply_token=reply_token,
            )
        )

    return parsed


app = FastAPI(title="LINE Webhook Local Handler", version="0.1.0")


@app.post("/callback")
async def callback(
    request: Request,
    x_line_signature: Optional[str] = Header(default=None, alias="X-Line-Signature"),
) -> Dict[str, Any]:
    """
    LINE Developers で設定する Webhook URL の受け口（例: /callback）

    処理:
    - 生ボディ（bytes）を取得
    - 署名検証（channel secret は環境変数から取得）
    - JSONパース
    - events をパースしてログ出力
    """

    body = await request.body()

    secret = os.getenv("LINE_CHANNEL_SECRET")
    if not secret:
        # 設定漏れは早めに気づけるように 500 扱い
        raise HTTPException(status_code=500, detail="Missing env: LINE_CHANNEL_SECRET")

    if not x_line_signature:
        raise HTTPException(status_code=401, detail="Missing header: X-Line-Signature")

    if not verify_line_signature(secret, body, x_line_signature):
        raise HTTPException(status_code=401, detail="Invalid signature")

    try:
        payload = json.loads(body.decode("utf-8"))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON: {e}")

    parsed = parse_events(payload)

    # ログ（初心者でも追えるよう、要点だけ整形して出す）
    logger.info("Webhook received. events=%d", len(parsed))
    for p in parsed:
        logger.info(
            "event ts=%s type=%s group=%s user=%s msgType=%s text=%s replyToken=%s",
            p.timestamp,
            p.event_type,
            p.group_id,
            p.user_id,
            p.message_type,
            p.message_text,
            p.reply_token,
        )

    # --- 「まとめ」トリガー（Step3の目的） ---
    # 誰かが "まとめ" と送ったら、Sheetsから直近ログを取り出して Claude に投げる。
    # ここでは「動作のつながり」を確認できるように、結果をレスポンスに含めます。
    summary_result = try_run_summary_flow(parsed)

    return {"ok": True, "events": [p.__dict__ for p in parsed], "summary": summary_result}

