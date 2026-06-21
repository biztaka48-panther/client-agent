"""
Claude API（Anthropic）クライアント

目的:
- Google Sheets から取得した会話ログを Claude に渡し、
  「状況整理（何が起きているか）」と「返信案（送信文案）」を生成する。

前提（環境変数）:
- CLAUDE_API_KEY: Anthropic API Key
- CLAUDE_MODEL: 使用モデル（例: claude-3-5-sonnet-latest）

注意:
- ここでは「返信案の生成」まで行い、実際のLINE送信（reply API）は別ファイル（main側）で行います。
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

import httpx


ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
ANTHROPIC_VERSION = "2023-06-01"


@dataclass
class ClaudeResult:
    """
    Claude から返ってきた内容（アプリで使いやすい形）。
    """

    text: str
    raw: Dict[str, Any]


def _get_env_required(key: str) -> str:
    val = os.getenv(key)
    if not val:
        raise RuntimeError(f"Missing env: {key}")
    return val


def build_secretary_system_prompt() -> str:
    """
    「AI秘書」としての役割を固定する system プロンプト。
    初心者にも扱いやすいよう、出力フォーマットも指定します。
    """

    return """あなたは日本語で対応する「AI秘書」です。
与えられた会話ログ（グループLINEの履歴）を読み、状況を整理し、次に送るべき返信案を作ってください。

## 重要
- 事実と推測を混ぜない。推測する場合は「推測」と明記する。
- 個人情報の取り扱いに注意し、不要に具体的な個人情報を出力しない。
- 返信案は、相手に失礼がなく、短く、要点が伝わる日本語にする。

## 出力形式（必ずこの見出しを使う）
【状況まとめ】
- （箇条書きで3〜7点）

【論点・未確認事項】
- （箇条書きで0〜5点）

【返信案】
（そのまま送れる文章を1〜3パターン）
"""


def build_secretary_user_prompt(
    *,
    group_id: str,
    logs: List[Dict[str, Any]],
    extra_instruction: Optional[str] = None,
) -> str:
    """
    Claude に渡す user プロンプトを作ります。
    - logs は JSON で渡し、モデルが機械的に読みやすいようにします。
    """

    payload = {
        "group_id": group_id,
        "logs": logs,
        "note": "logs は timestamp順に並んだ、直近の会話履歴です。",
    }

    instruction = extra_instruction.strip() if extra_instruction else ""
    instruction_block = f"\n\n追加指示:\n{instruction}\n" if instruction else ""

    return (
        "以下はグループLINEの会話ログです。"
        "この内容を読んで、状況まとめ・論点・返信案を作ってください。"
        f"{instruction_block}\n"
        "会話ログ(JSON):\n"
        + json.dumps(payload, ensure_ascii=False, indent=2)
    )


def call_claude(
    *,
    logs: List[Dict[str, Any]],
    group_id: str,
    extra_instruction: Optional[str] = None,
    model: Optional[str] = None,
    max_tokens: int = 800,
    timeout_s: float = 30.0,
) -> ClaudeResult:
    """
    Claude Messages API を呼び出して、テキスト結果を返します。

    エラー設計:
    - APIキー未設定は即エラー（環境設定ミス）
    - HTTPエラーは例外（上位でログしてユーザー表示に変換する想定）
    """

    api_key = _get_env_required("CLAUDE_API_KEY")
    # 仕様に合わせてデフォルトは sonnet-4 系に寄せる（環境変数で上書き可能）
    model = model or os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")

    system_prompt = build_secretary_system_prompt()
    user_prompt = build_secretary_user_prompt(group_id=group_id, logs=logs, extra_instruction=extra_instruction)

    headers = {
        "x-api-key": api_key,
        "anthropic-version": ANTHROPIC_VERSION,
        "content-type": "application/json",
    }

    body = {
        "model": model,
        "max_tokens": max_tokens,
        "system": system_prompt,
        "messages": [
            {
                "role": "user",
                "content": user_prompt,
            }
        ],
    }

    try:
        with httpx.Client(timeout=timeout_s) as client:
            r = client.post(ANTHROPIC_API_URL, headers=headers, json=body)
    except httpx.TimeoutException as e:
        raise RuntimeError("Claude API timeout") from e
    except httpx.HTTPError as e:
        raise RuntimeError(f"Claude API network error: {e}") from e

    # エラー時は「何が起きたか」が分かるよう本文も含めて例外にします（鍵情報は含まれない）
    if r.status_code < 200 or r.status_code >= 300:
        raise RuntimeError(f"Claude API error: {r.status_code} {r.text}")

    try:
        raw = r.json()
    except Exception as e:
        raise RuntimeError(f"Claude API returned non-JSON: {r.text[:500]}") from e

    # Claude の messages API は content が配列（textブロックなど）で返ります。
    # ここでは text ブロックを連結して返します。
    parts = raw.get("content") or []
    if not isinstance(parts, list):
        raise RuntimeError(f"Claude API response has unexpected content type: {type(parts)}")

    texts: List[str] = []
    for p in parts:
        if isinstance(p, dict) and p.get("type") == "text":
            texts.append((p.get("text") or "").strip())

    text = "\n".join([t for t in texts if t]).strip()
    if not text:
        # 返ってきたが空、というケースもあり得るので、上位で扱いやすいエラーにする
        raise RuntimeError("Claude API returned empty text content")

    return ClaudeResult(text=text, raw=raw)

