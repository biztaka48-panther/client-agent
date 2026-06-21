"""
Claude API（Anthropic）クライアント

責務:
- Google Sheets から取得した会話ログを Claude に渡し
  「状況整理（何が起きているか）」と「返信案（送信文案）」を生成する
- モデル名・最大トークン数は設定で切り替え可能にする

前提（app/core/config.py の Settings）:
- claude_api_key: Anthropic API Key
- claude_model: 使用モデル（例: claude-sonnet-4-20250514）
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass
from typing import Any

import httpx

logger = logging.getLogger(__name__)

ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
ANTHROPIC_VERSION = "2023-06-01"


# ---------------------------------------------------------------------------
# 結果型
# ---------------------------------------------------------------------------

@dataclass
class ClaudeResult:
    """Claude から返ってきた内容。"""
    text: str
    raw: dict[str, Any]


# ---------------------------------------------------------------------------
# プロンプト構築
# ---------------------------------------------------------------------------

def build_secretary_system_prompt() -> str:
    """
    「AI秘書」としての役割を固定する system プロンプト。
    出力フォーマットを指定して、LINEで使いやすい構造化テキストを得る。
    """
    return """あなたは日本語で対応する「AI秘書」です。
与えられた会話ログ（グループLINEの履歴）を読み、状況を整理し、次に送るべき返信案を作ってください。

## 重要ルール
- 事実と推測を明確に区別し、推測の場合は「推測」と明記する
- 個人情報は不必要に詳細化しない
- 返信案は相手に失礼がなく、簡潔で要点が伝わる日本語にする
- 必ず以下の見出し構造で出力すること

## 出力形式
【状況まとめ】
- （箇条書き 3〜7点）

【論点・未確認事項】
- （箇条書き 0〜5点。なければ「特になし」）

【返信案】
（そのまま送れる文章を 1〜3パターン。パターンが複数の場合は番号をつける）
"""


def build_secretary_user_prompt(
    *,
    group_id: str,
    logs: list[dict[str, Any]],
    extra_instruction: str | None = None,
) -> str:
    """Claude に渡す user プロンプトを組み立てる。"""
    payload = {
        "group_id": group_id,
        "logs": logs,
        "note": "logs は timestamp 昇順に並んだ直近の会話履歴です",
    }
    instruction_block = (
        f"\n\n追加指示:\n{extra_instruction.strip()}\n" if extra_instruction else ""
    )
    return (
        "以下はグループLINEの会話ログです。"
        "内容を読んで、状況まとめ・論点・返信案を出力してください。"
        f"{instruction_block}\n"
        "会話ログ (JSON):\n"
        + json.dumps(payload, ensure_ascii=False, indent=2)
    )


# ---------------------------------------------------------------------------
# API 呼び出し
# ---------------------------------------------------------------------------

def call_claude(
    *,
    logs: list[dict[str, Any]],
    group_id: str,
    api_key: str,
    model: str = "claude-sonnet-4-20250514",
    extra_instruction: str | None = None,
    max_tokens: int = 1000,
    timeout_s: float = 30.0,
) -> ClaudeResult:
    """
    Claude Messages API を呼び出してテキスト結果を返す。

    引数:
    - api_key: Anthropic API キー（Settings から渡す）
    - model: Claude モデル名（Settings から渡す）
    - logs: sheets_client.fetch_recent_logs() の戻り値
    - group_id: ログのグループ識別子
    - extra_instruction: 追加の指示文（環境変数 SUMMARY_EXTRA_INSTRUCTION 等で注入可能）

    エラー設計:
    - API キー未設定 / HTTP エラー / 空レスポンスは RuntimeError
    - 上位で try/except してユーザー向けエラーメッセージに変換すること
    """
    system_prompt = build_secretary_system_prompt()
    user_prompt = build_secretary_user_prompt(
        group_id=group_id, logs=logs, extra_instruction=extra_instruction
    )

    headers = {
        "x-api-key": api_key,
        "anthropic-version": ANTHROPIC_VERSION,
        "content-type": "application/json",
    }
    body = {
        "model": model,
        "max_tokens": max_tokens,
        "system": system_prompt,
        "messages": [{"role": "user", "content": user_prompt}],
    }

    logger.info("Calling Claude. model=%s logs_count=%d", model, len(logs))

    try:
        with httpx.Client(timeout=timeout_s) as client:
            r = client.post(ANTHROPIC_API_URL, headers=headers, json=body)
    except httpx.TimeoutException as e:
        raise RuntimeError("Claude API タイムアウト") from e
    except httpx.HTTPError as e:
        raise RuntimeError(f"Claude API ネットワークエラー: {e}") from e

    if r.status_code < 200 or r.status_code >= 300:
        raise RuntimeError(f"Claude API エラー: {r.status_code} {r.text}")

    try:
        raw = r.json()
    except Exception as e:
        raise RuntimeError(f"Claude API が JSON 以外を返しました: {r.text[:500]}") from e

    # content は配列（TextBlock など）で返ってくるので text を結合
    parts = raw.get("content") or []
    texts: list[str] = [
        p.get("text", "").strip()
        for p in parts
        if isinstance(p, dict) and p.get("type") == "text"
    ]
    text = "\n".join(t for t in texts if t).strip()

    if not text:
        raise RuntimeError("Claude API が空のレスポンスを返しました")

    logger.info("Claude response received. chars=%d", len(text))
    return ClaudeResult(text=text, raw=raw)
