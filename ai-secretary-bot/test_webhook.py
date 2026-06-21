"""
LINE Webhook のローカル動作確認用スクリプト

目的:
- ローカルで起動した `line_handler.py` に対して、LINE Webhook っぽい JSON を送る
- 送信時に X-Line-Signature を正しく付ける（署名検証が通ることを確認）

前提:
1) 先にサーバーを起動しておく
   uvicorn line_handler:app --reload --port 8001 --app-dir ai-secretary-bot

2) 環境変数を設定しておく（サーバーと同じシークレット）
   set LINE_CHANNEL_SECRET=xxxxx

実行:
  python ai-secretary-bot/test_webhook.py
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import time
from typing import Any, Dict

import httpx


def make_signature(channel_secret: str, body_bytes: bytes) -> str:
    """
    LINE仕様に合わせて署名を生成します。
    - Base64( HMAC_SHA256(secret, bodyBytes) )
    """

    mac = hmac.new(channel_secret.encode("utf-8"), body_bytes, hashlib.sha256).digest()
    return base64.b64encode(mac).decode("utf-8")


def build_sample_payload() -> Dict[str, Any]:
    """
    LINE Webhook の最低限の形（events配列）を作ります。
    本番のLINEから来る payload はもっと情報が多いですが、検証にはこれで十分です。
    """

    now_ms = int(time.time() * 1000)
    return {
        "destination": "Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "events": [
            {
                "type": "message",
                "timestamp": now_ms,
                "source": {
                    "type": "group",
                    "groupId": "C9999999999999999999999999999999",
                    "userId": "U1111111111111111111111111111111",
                },
                "replyToken": "00000000000000000000000000000000",
                "message": {
                    "id": "1",
                    "type": "text",
                    "text": "テスト送信です",
                },
            }
        ],
    }


def main() -> None:
    secret = os.getenv("LINE_CHANNEL_SECRET")
    if not secret:
        raise SystemExit("Missing env: LINE_CHANNEL_SECRET (serverと同じ値を設定してください)")

    url = os.getenv("LINE_TEST_URL", "http://127.0.0.1:8001/callback")

    payload = build_sample_payload()
    body_bytes = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    sig = make_signature(secret, body_bytes)

    headers = {
        "Content-Type": "application/json",
        "X-Line-Signature": sig,
    }

    with httpx.Client(timeout=10) as client:
        r = client.post(url, content=body_bytes, headers=headers)
        print("status:", r.status_code)
        print("body:", r.text)


if __name__ == "__main__":
    main()

