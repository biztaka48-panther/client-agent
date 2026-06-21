from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    env: str = "local"
    log_level: str = "INFO"
    public_base_url: str | None = None

    # LINE (Log bot)
    line_log_channel_secret: str | None = None
    line_log_channel_access_token: str | None = None

    # LINE (Secretary bot)
    line_secretary_channel_secret: str | None = None
    line_secretary_channel_access_token: str | None = None

    # Google Sheets
    google_sheets_spreadsheet_id: str | None = None
    google_sheets_range: str = "Conversations!A:Z"
    google_service_account_json: str | None = None

    # Claude (Anthropic)
    claude_api_key: str | None = None
    claude_model: str = "claude-sonnet-4-20250514"

    # Secretary Bot 動作設定
    summary_limit: int = 100                        # Sheets から取得する最大件数
    summary_extra_instruction: str | None = None    # Claude への追加指示（任意）


settings = Settings()
