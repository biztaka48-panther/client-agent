"""
AI秘書Bot用ユーティリティ

ここは「どの層（Sheets/Claude/LINE）でも使える小さな部品」を集めます。
初心者が追いやすいよう、関数は小さめ・責務は明確にしています。
"""

from __future__ import annotations

import base64
import hashlib
import hmac
from datetime import datetime, timezone
from typing import Any, Dict, Optional


def to_iso8601_from_ms(timestamp_ms: int) -> str:
    """
    LINEの timestamp（ミリ秒）を ISO8601（UTC）へ変換。

    なぜ必要か:
    - ログやSheetsでは、人が読める形式の方が追いやすい
    """

    dt = datetime.fromtimestamp(timestamp_ms / 1000, tz=timezone.utc)
    return dt.isoformat()


def verify_line_signature(channel_secret: str, body: bytes, x_line_signature: str) -> bool:
    """
    LINE Webhook 署名検証。

    - computed = Base64( HMAC_SHA256(secret, bodyBytes) )
    - computed と X-Line-Signature が一致すれば OK
    """

    mac = hmac.new(channel_secret.encode("utf-8"), body, hashlib.sha256).digest()
    computed = base64.b64encode(mac).decode("utf-8")
    return computed == (x_line_signature or "").strip()


def format_reply_message(text: str, *, max_chars: int = 4500) -> str:
    """
    Claudeの出力を「LINEで送りやすい形」に整形する。

    目的:
    - 余計な空白を整理
    - 文字数が極端に長い場合に、送信失敗を避けるために切り詰める

    注意:
    - LINEのテキスト上限は運用・API仕様で変わる可能性があるため、
      ここでは安全側に倒して max_chars を 4500 にしています。
    """

    if not text:
        return "（返信案の生成に失敗しました。もう一度「まとめ」と送ってください）"

    t = text.strip()
    if len(t) <= max_chars:
        return t

    # 長すぎる場合は末尾を落とし、切り詰めたことが分かるように追記
    return t[: max_chars - 20].rstrip() + "\n\n（長文のため一部省略）"


def build_error_message(*, title: str, detail: Optional[str] = None) -> str:
    """
    ユーザー（LINE上）に返す「短く安全な」エラーメッセージを作る。

    方針:
    - 内部例外の全文はそのまま出さない（キーやURL等が混ざる可能性）
    - ただし運用で切り分けできるよう、短い detail は添える
    """

    msg = f"【エラー】{title}"
    if detail:
        d = detail.strip()
        # 長い詳細は切る（情報漏えい・読みにくさ対策）
        if len(d) > 200:
            d = d[:200] + "…"
        msg += f"\n原因: {d}"
    msg += "\n（時間をおいて再度お試しください）"
    return msg


def safe_json(obj: Any) -> Dict[str, Any]:
    """
    ログ用に「落ちない」JSON化を助ける。
    - 返り値は dict に寄せる（どうしても無理なら {"value": "..."}）
    """

    if isinstance(obj, dict):
        return obj
    return {"value": str(obj)}

