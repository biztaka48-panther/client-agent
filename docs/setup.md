# セットアップ手順（AI秘書Bot：Sheets + Claude + LINE）

このドキュメントは、`ai-secretary-bot/main.py`（秘書Bot）を動かすための準備手順です。

---

## 1. Claude APIキーの取得方法（Anthropic）

1) Anthropic のコンソールで API Key を発行します  
2) 環境変数 `CLAUDE_API_KEY` に設定します  

モデルは環境変数 `CLAUDE_MODEL` で指定できます。仕様では `claude-sonnet-4-20250514` を想定しています。

---

## 2. Google Sheets API の有効化（v4）

### 2-1. Google Cloud プロジェクト作成
- Google Cloud Console でプロジェクトを作成（既存でもOK）

### 2-2. Sheets API を有効化
- APIs & Services → Library → **Google Sheets API** を有効化

---

## 3. サービスアカウントの作成（OAuth2 / Service Account）

1) IAM & Admin → Service Accounts → **Create service account**  
2) Keys → **Add key** → **Create new key** → JSON を選択  
3) ダウンロードした JSON を控えます（秘密情報です）

### 重要: スプレッドシートの共有設定
保存先のスプレッドシートを開き、サービスアカウントの **client_email** を「閲覧者」以上で共有します。
共有しないと、APIは `403` などで失敗します。

---

## 4. credentials.json の配置方法（推奨: 環境変数）

このプロジェクトでは **ファイルとして置くのではなく**、サービスアカウントJSONを
環境変数 `GOOGLE_SERVICE_ACCOUNT_JSON` に「文字列」として設定する方式を採用しています。

理由:
- Render 等のデプロイ先で扱いやすい
- 誤ってリポジトリにコミットしづらい

設定する環境変数:
- `GOOGLE_SERVICE_ACCOUNT_JSON`: サービスアカウントJSON全文
- `GOOGLE_SHEETS_SPREADSHEET_ID`: スプレッドシートID
- `GOOGLE_SHEETS_RANGE`: 例 `Conversations!A:Z`（未設定ならこの値）

---

## 5. LINE Reply API のための設定

LINE Developers の Messaging API チャネルで以下を控え、環境変数に設定します。
- `LINE_SECRETARY_CHANNEL_SECRET`
- `LINE_SECRETARY_CHANNEL_ACCESS_TOKEN`

Webhook URL は、秘書Bot用エンドポイントに向けます:
- `POST /webhook/secretary`

ローカル検証では ngrok 等で公開して、次のように設定します:
- `https://xxxx.ngrok-free.app/webhook/secretary`

---

## 6. ローカル起動（PowerShell）

```bash
set LINE_SECRETARY_CHANNEL_SECRET=xxxxx
set LINE_SECRETARY_CHANNEL_ACCESS_TOKEN=xxxxx
set GOOGLE_SERVICE_ACCOUNT_JSON={...}
set GOOGLE_SHEETS_SPREADSHEET_ID=xxxxx
set CLAUDE_API_KEY=xxxxx
uvicorn main:app --reload --port 8002 --app-dir ai-secretary-bot
```

---

## 7. Claude接続テスト

```bash
set CLAUDE_API_KEY=xxxxx
python ai-secretary-bot/test_claude.py
```

