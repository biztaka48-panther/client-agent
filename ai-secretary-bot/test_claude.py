"""
Claude API 接続テスト（Step3）

目的:
- Claude API キーが正しく設定できているかを確認する
- サンプルログを使って、プロンプト→レスポンスパースまで動くか確認する

前提（環境変数）:
- CLAUDE_API_KEY
- （任意）CLAUDE_MODEL

実行:
  set CLAUDE_API_KEY=xxxxx
  python ai-secretary-bot/test_claude.py
"""

from __future__ import annotations

import os

import claude_client


def main() -> None:
    if not os.getenv("CLAUDE_API_KEY"):
        raise SystemExit("Missing env: CLAUDE_API_KEY")

    sample_logs = [
        {
            "timestamp": "2026-04-07 10:00:00",
            "group_id": "C9999999999999999999999999999999",
            "user_id": "U1111111111111111111111111111111",
            "user_name": "田中",
            "message_type": "text",
            "message_text": "来週の打ち合わせ、何時が良いですか？",
            "reply_token": "",
        },
        {
            "timestamp": "2026-04-07 10:05:00",
            "group_id": "C9999999999999999999999999999999",
            "user_id": "U2222222222222222222222222222222",
            "user_name": "佐藤",
            "message_type": "text",
            "message_text": "火曜の午後なら空いてます。",
            "reply_token": "",
        },
    ]

    r = claude_client.call_claude(
        logs=sample_logs,
        group_id="C9999999999999999999999999999999",
        extra_instruction="返信案は丁寧語で、候補日時を2つ提示してください。",
    )

    print("---- Claude result ----")
    print(r.text)


if __name__ == "__main__":
    main()

