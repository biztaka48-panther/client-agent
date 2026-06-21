# クライアント対応自動化システム（プロトタイプ）

LINE公式アカウント2つ（ログ収集Bot／秘書Bot）を使い、会話ログをGoogle Sheetsへ記録しつつ、Claude APIで返信案を生成する想定のFastAPIサーバー土台です（仮実装）。

## できていること（現時点）
- `GET /health` の疎通
- LINE webhook 受信口の雛形（署名検証・イベント処理は未実装）
  - `POST /webhooks/line/log`
  - `POST /webhooks/line/secretary`

## ディレクトリ構成
```
client-agent/
  app/
    core/
      config.py
      logging.py
    routers/
      health.py
      line_webhooks.py
    main.py
  .env.example
  requirements.txt
  render.yaml
```

## ローカル起動
PowerShell例:

```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

起動後:
- `http://127.0.0.1:8000/health`

## 環境変数
`.env.example` を参照してください。RenderではダッシュボードのEnvironmentでSecretとして設定する想定です。

## 次に実装するもの（案）
- LINE署名検証（`X-Line-Signature`）
- イベントパース（テキスト/画像/スタンプ等の最小対応）
- Google Sheets への追記（スプレッドシート/レンジ指定）
- Claude API へ「会話全文脈」を渡して返信案生成
