"""
Google Sheets 連携（読み取り）クライアント

目的:
- GASが書き込んだ会話ログを Google Sheets API で取得する
- グループIDでフィルタし、最新N件（デフォルト100件）を返す
- Claude に渡しやすい JSON（list[dict]）へ整形する

前提（環境変数）:
- GOOGLE_SERVICE_ACCOUNT_JSON: サービスアカウントキーJSONを「文字列」で入れる
  - Render等では 1つの環境変数として入れるのが管理しやすいです
- GOOGLE_SHEETS_SPREADSHEET_ID: スプレッドシートID
- GOOGLE_SHEETS_RANGE: 取得レンジ（例: Conversations!A:Z）

シート列（GAS側で保存している列順）:
| timestamp | group_id | user_id | user_name | message_type | message_text | reply_token |
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Dict, List, Optional

from google.oauth2 import service_account
from googleapiclient.discovery import build


# Sheets API の読み取りに必要なスコープ（readonly）
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]


@dataclass
class SheetLogRow:
    """
    シート1行ぶんを扱うための型。
    - 取得時は文字列が中心になるため、timestamp は str で保持します。
    """

    timestamp: str
    group_id: str
    user_id: str
    user_name: str
    message_type: str
    message_text: str
    reply_token: str

    def to_dict(self) -> Dict[str, Any]:
        """
        Claudeに渡す用のJSON（dict）に変換。
        """

        return {
            "timestamp": self.timestamp,
            "group_id": self.group_id,
            "user_id": self.user_id,
            "user_name": self.user_name,
            "message_type": self.message_type,
            "message_text": self.message_text,
            "reply_token": self.reply_token,
        }


def _get_env_required(key: str) -> str:
    """
    必須の環境変数を取得する。
    未設定だと「どこが足りないか」を即座に分かるように例外にします。
    """

    val = os.getenv(key)
    if not val:
        raise RuntimeError(f"Missing env: {key}")
    return val


def _parse_service_account_info(raw: str) -> Dict[str, Any]:
    """
    GOOGLE_SERVICE_ACCOUNT_JSON を dict に変換する。

    よくある失敗:
    - JSONをそのまま貼ったつもりが、改行や引用符が崩れている
    - 先頭/末尾に余計な空白が入っている
    """

    try:
        return json.loads(raw.strip())
    except Exception as e:
        raise RuntimeError(
            "GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON. "
            "Paste the full service account key JSON as a single env var."
        ) from e


def _build_sheets_service():
    """
    サービスアカウントで Sheets API クライアントを作る。
    """

    info = _parse_service_account_info(_get_env_required("GOOGLE_SERVICE_ACCOUNT_JSON"))
    creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
    # discovery は API 呼び出し時に必要になるため build して返す
    return build("sheets", "v4", credentials=creds, cache_discovery=False)


def _safe_get(row: List[str], idx: int) -> str:
    """
    行が短い場合でも落ちないように、足りない列は空文字にする。
    """

    return row[idx] if idx < len(row) else ""


def _parse_timestamp_for_sort(ts: str) -> Optional[datetime]:
    """
    GAS側の timestamp は "YYYY-MM-DD HH:mm:ss" 形式を想定。
    - ここではソート用に datetime へ変換できる場合だけ変換。
    - 変換できなければ None を返し、文字列のまま扱う（落ちない優先）。
    """

    if not ts:
        return None
    try:
        return datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")
    except Exception:
        return None


def fetch_recent_logs(
    *,
    group_id: str,
    limit: int = 100,
    spreadsheet_id: Optional[str] = None,
    sheet_range: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    指定グループの最新ログ N件 を取得し、JSON(list[dict])で返します。

    引数:
    - group_id: フィルタ対象の groupId（空の場合は全件対象になってしまうため、原則必須想定）
    - limit: 返す件数（最新からN件）
    - spreadsheet_id/sheet_range: 未指定なら環境変数から取得
    """

    if not group_id:
        raise ValueError("group_id is required")

    spreadsheet_id = spreadsheet_id or _get_env_required("GOOGLE_SHEETS_SPREADSHEET_ID")
    sheet_range = sheet_range or os.getenv("GOOGLE_SHEETS_RANGE", "Conversations!A:Z")

    service = _build_sheets_service()

    # values.get でレンジの値を取得（先頭行がヘッダの想定）
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=spreadsheet_id, range=sheet_range)
        .execute()
    )

    values: List[List[str]] = result.get("values") or []
    if not values:
        return []

    # 1行目がヘッダの想定（timestamp, group_id, ...）
    # 想定と違っても「落とさない」を優先して、ヘッダっぽければ除外します。
    header = values[0]
    data_rows = values[1:] if header and "timestamp" in (header[0] or "").lower() else values

    rows: List[SheetLogRow] = []
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

    # タイムスタンプで昇順に並べ替え → 末尾からlimit件
    # 解析できないtimestampは「最古扱い」に寄せる（Noneを先頭に）
    rows.sort(key=lambda x: (_parse_timestamp_for_sort(x.timestamp) is None, _parse_timestamp_for_sort(x.timestamp) or datetime.min))

    trimmed = rows[-limit:] if limit > 0 else rows
    return [r.to_dict() for r in trimmed]

