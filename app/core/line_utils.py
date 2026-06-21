"""
LINE 共通ユーティリティ

責務:
- Webhook 署名検証（HMAC-SHA256）
- LINE events のパース
- LINE Reply API 呼び出し
- ログ・エラーメッセージ整形

このモジュールは log bot / secretary bot の両方から使われます。
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

import httpx

logger = logging.getLogger(__name__)

LINE_REPLY_API_URL = "https://api.line.me/v2/bot/message/reply"
LINE_PUSH_API_URL = "https://api.line.me/v2/bot/message/push"


# ---------------------------------------------------------------------------
# 署名検証
# ---------------------------------------------------------------------------

def verify_line_signature(channel_secret: str, body: bytes, x_line_signature: str) -> bool:
    """
    LINE Webhook 署名検証。

    仕様:
    - computed = Base64( HMAC_SHA256(channelSecret, requestBodyBytes) )
    - X-Line-Signature ヘッダと computed が一致すれば OK
    """
    mac = hmac.new(channel_secret.encode("utf-8"), body, hashlib.sha256).digest()
    computed = base64.b64encode(mac).decode("utf-8")
    return hmac.compare_digest(computed, (x_line_signature or "").strip())


# ---------------------------------------------------------------------------
# イベントパース
# ---------------------------------------------------------------------------

@dataclass
class ParsedEvent:
    """LINE イベント1件を扱いやすい形に整理した型。"""

    timestamp: str
    event_type: str
    group_id: str
    user_id: str
    message_type: str
    message_text: str
    reply_token: str
    raw: dict[str, Any] = field(default_factory=dict, repr=False)


def _ms_to_iso8601(ts_ms: int) -> str:
    """LINE の timestamp（ミリ秒）を ISO8601（UTC）へ変換。"""
    dt = datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc)
    return dt.isoformat()


def _extract_message_text(message_type: str, message: dict[str, Any]) -> str:
    """
    メッセージタイプに応じてログ用文字列を作る。
    テキスト以外も「情報が残る」よう文字列化します。
    """
    if not message_type:
        return ""
    if message_type == "text":
        return message.get("text") or ""
    if message_type in {"image", "video", "audio"}:
        return f"id={message.get('id', '')}"
    if message_type == "file":
        return (
            f"fileName={message.get('fileName', '')} "
            f"fileSize={message.get('fileSize', '')} "
            f"id={message.get('id', '')}"
        )
    if message_type == "sticker":
        return f"packageId={message.get('packageId', '')} stickerId={message.get('stickerId', '')}"
    if message_type == "location":
        return f"title={message.get('title', '')} address={message.get('address', '')}"
    try:
        return json.dumps(message, ensure_ascii=False)
    except Exception:
        return str(message)


def parse_events(payload: dict[str, Any]) -> list[ParsedEvent]:
    """
    LINE Webhook の payload（JSON dict）から events を取り出してパース。

    設計方針:
    - 未知の構造でも落とさない（.get を使い、型チェックもゆるめに）
    - 取れなかったフィールドは空文字
    """
    events = payload.get("events") or []
    parsed: list[ParsedEvent] = []

    for ev in events:
        ts_ms = ev.get("timestamp")
        timestamp = _ms_to_iso8601(ts_ms) if isinstance(ts_ms, int) else datetime.now(tz=timezone.utc).isoformat()

        source = ev.get("source") or {}
        message = ev.get("message") or {}
        message_type = message.get("type") or ""

        parsed.append(ParsedEvent(
            timestamp=timestamp,
            event_type=ev.get("type") or "",
            group_id=source.get("groupId") or "",
            user_id=source.get("userId") or "",
            message_type=message_type,
            message_text=_extract_message_text(message_type, message),
            reply_token=ev.get("replyToken") or "",
            raw=ev,
        ))

    return parsed


def find_trigger_event(events: list[ParsedEvent], trigger_text: str = "まとめ") -> ParsedEvent | None:
    """
    events の中から trigger_text に一致するテキストメッセージを最初に見つけて返す。
    見つからなければ None。
    """
    for ev in events:
        if ev.message_type == "text" and (ev.message_text or "").strip() == trigger_text:
            return ev
    return None


# ---------------------------------------------------------------------------
# LINE Reply / Push API
# ---------------------------------------------------------------------------

async def reply_text(*, access_token: str, reply_token: str, text: str, timeout_s: float = 20.0) -> None:
    """
    LINE Reply API を使ってテキストメッセージを返信する。

    エラー時は RuntimeError を投げる（上位でログ出しと適切な HTTP レスポンスを返してください）。
    """
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    body = {
        "replyToken": reply_token,
        "messages": [{"type": "text", "text": _truncate_for_line(text)}],
    }
    async with httpx.AsyncClient(timeout=timeout_s) as client:
        r = await client.post(LINE_REPLY_API_URL, headers=headers, json=body)

    if r.status_code < 200 or r.status_code >= 300:
        raise RuntimeError(f"LINE Reply API error: {r.status_code} {r.text}")

    logger.info("LINE reply sent. reply_token=%s", reply_token[:16] + "...")


# ---------------------------------------------------------------------------
# メッセージ整形
# ---------------------------------------------------------------------------

def _truncate_for_line(text: str, max_chars: int = 4500) -> str:
    """
    LINE テキストメッセージの文字数上限に合わせて切り詰める。
    上限を超えた場合は末尾に注記を追加。
    """
    t = (text or "").strip()
    if len(t) <= max_chars:
        return t
    return t[: max_chars - 20].rstrip() + "\n\n（長文のため一部省略）"


def build_error_reply(*, title: str, detail: str | None = None) -> str:
    """
    LINE に返す短い日本語エラーメッセージを組み立てる。

    方針:
    - 内部例外の全文は出さない（APIキーや内部パスが混ざりうるため）
    - 運用で切り分けできる程度の短い detail だけ添える
    """
    msg = f"【エラー】{title}"
    if detail:
        d = detail.strip()[:200]
        msg += f"\n原因: {d}"
    msg += "\n（しばらく経ってから再度お試しください）"
    return msg
