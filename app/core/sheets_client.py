"""
Google Sheets 連携（読み取り）クライアント

責務:
- GAS が書き込んだ会話ログを Google Sheets API で取得する
- group_id でフィルタして最新 N 件を返す
- Claude に渡しやすい list[dict] 形式に整形する

前提（app/core/config.py の Settings）:
- google_service_account_json: サービスアカウントキー JSON を「文字列」で指定
- google_sheets_spreadsheet_id: スプレッドシートID
- google_sheets_range: 取得レンジ（例: Conversations!A:Z）

シート列（GAS 側が保存する順序）:
| timestamp | group_id | user_id | user_name | message_type | message_text | reply_token |
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass
from datetime import datetime
from typing import Any

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# 内部型
# ---------------------------------------------------------------------------

@dataclass
class SheetLogRow:
    """スプレッドシート1行ぶんのデータ。"""
    timestamp: str
    group_id: str
    user_id: str
    user_name: str
    message_type: str
    message_text: str
    reply_token: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "timestamp": self.timestamp,
            "group_id": self.group_id,
            "user_id": self.user_id,
            "user_name": self.user_name,
            "message_type": self.message_type,
            "message_text": self.message_text,
            "reply_token": self.reply_token,
        }


# ---------------------------------------------------------------------------
# ヘルパー
# ---------------------------------------------------------------------------

def _parse_service_account_info(raw: str) -> dict[str, Any]:
    """
    GOOGLE_SERVICE_ACCOUNT_JSON （文字列）を dict へ変換。
    よくある失敗（改行崩れ・余分な空白）にも対応。
    """
    try:
        return json.loads(raw.strip())
    except Exception as e:
        raise RuntimeError(
            "GOOGLE_SERVICE_ACCOUNT_JSON が有効な JSON ではありません。"
            "サービスアカウントキーの JSON ファイル全体を1つの環境変数に貼り付けてください。"
        ) from e


def _build_sheets_service(service_account_json: str):
    """サービスアカウントで Sheets API クライアントを生成。"""
    # Import here to avoid requiring google libs at module load time
    # (useful when running tests without Google credentials)
    try:
        from google.oauth2 import service_account as sa
        from googleapiclient.discovery import build
    except ImportError as e:
        raise RuntimeError(
            "Google API ライブラリが未インストールです。"
            "`pip install google-api-python-client google-auth` を実行してください。"
        ) from e

    info = _parse_service_account_info(service_account_json)
    scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    creds = sa.Credentials.from_service_account_info(info, scopes=scopes)
    return build("sheets", "v4", credentials=creds, cache_discovery=False)


def _safe_get(row: list[str], idx: int) -> str:
    """行が短くても落ちないよう、範囲外は空文字にする。"""
    return row[idx] if idx < len(row) else ""


def _parse_timestamp_for_sort(ts: str) -> datetime | None:
    """
    "YYYY-MM-DD HH:mm:ss" 形式のタイムスタンプを datetime へ変換。
    変換できない場合は None（最古扱いにして落とさない）。
    """
    if not ts:
        return None
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%S%z"):
        try:
            return datetime.strptime(ts, fmt)
        except ValueError:
            continue
    return None


# ---------------------------------------------------------------------------
# 公開関数
# ---------------------------------------------------------------------------

def fetch_recent_logs(
    *,
    group_id: str,
    service_account_json: str,
    spreadsheet_id: str,
    sheet_range: str = "Conversations!A:Z",
    limit: int = 100,
) -> list[dict[str, Any]]:
    """
    指定グループの最新ログ N 件を取得し list[dict] で返す。

    引数:
    - group_id: フィルタ対象の groupId（必須）
    - service_account_json: サービスアカウントキーの JSON 文字列
    - spreadsheet_id: スプレッドシートの ID
    - sheet_range: 取得するレンジ（デフォルト: Conversations!A:Z）
    - limit: 返す最大件数

    戻り値:
    - list[dict] 形式（SheetLogRow.to_dict() の結果）
    """
    if not group_id:
        raise ValueError("group_id は必須です")

    service = _build_sheets_service(service_account_json)

    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=spreadsheet_id, range=sheet_range)
        .execute()
    )

    values: list[list[str]] = result.get("values") or []
    if not values:
        logger.info("Sheets: no data found. spreadsheet_id=%s range=%s", spreadsheet_id, sheet_range)
        return []

    # 1行目がヘッダかどうかを「timestamp」含有で判定
    header = values[0]
    data_rows = values[1:] if header and "timestamp" in (header[0] or "").lower() else values

    rows: list[SheetLogRow] = []
    for r in data_rows:
        row = SheetLogRow(
            timestamp=_safe_get(r, 0),
            group_id=_safe_get(r, 1),
            user_id=_safe_get(r, 2),
            user_name=_safe_get(r, 3),
            message_type=_safe_get(r, 4),
            message_text=_safe_get(r, 5),
            reply_token=_safe_get(r, 6),
        )
        if row.group_id == group_id:
            rows.append(row)

    # タイムスタンプ昇順で並び替え → 最新 limit 件
    rows.sort(
        key=lambda x: (
            _parse_timestamp_for_sort(x.timestamp) is None,
            _parse_timestamp_for_sort(x.timestamp) or datetime.min,
        )
    )
    trimmed = rows[-limit:] if limit > 0 else rows

    logger.info(
        "Sheets: fetched %d rows for group_id=%s (limit=%d)", len(trimmed), group_id, limit
    )
    return [r.to_dict() for r in trimmed]
