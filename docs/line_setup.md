# LINEログ収集Bot セットアップ手順（GAS + ローカル検証）

このドキュメントは「グループLINEの会話をGoogle Sheetsへ自動記録する」ための、LINE Developers 側の設定と、GAS / ngrok を使った検証手順をまとめたものです（仮手順）。

---

## 1. LINE Developers コンソールでの設定

### 1-1. Messaging API チャネル作成
- LINE Developers で **Provider** を作成（既存でもOK）
- **Messaging API** のチャネルを作成

### 1-2. 必要な値を控える
チャネルの以下を控えます（後で GAS のスクリプトプロパティに入れます）。
- **Channel secret**
- **Channel access token（長期トークン推奨）**

### 1-3. Webhook を有効化
- Messaging API 設定で **Use webhook = Enabled**
- **Webhook URL** を設定（後述のGASまたはローカルURL）
- **Webhook verification**（検証ボタン）で 200 が返ることを確認

> 注意: グループで動かす場合は、作成したLINE公式アカウント（Bot）をグループに招待してください。

---

## 2. GAS（Google Apps Script）でログ保存する

### 2-1. スプレッドシートを用意
- Google Sheets を作成
- スプレッドシートID（URL内の長いID）を控える
- シート名は既定で `Conversations` を使います（変更したい場合は `SHEET_NAME` を設定）

### 2-2. GAS プロジェクト作成
- Google Drive で新規 → **Google Apps Script**
- `line-logger-bot/Code.gs` の内容を貼り付け

### 2-3. スクリプトプロパティを設定
GAS エディタで **プロジェクトの設定** → **スクリプト プロパティ** に以下を追加します。

- `LINE_CHANNEL_SECRET`: LINEの Channel secret
- `LINE_CHANNEL_ACCESS_TOKEN`: LINEの Channel access token
- `SPREADSHEET_ID`: 保存先スプレッドシートID
- `SHEET_NAME`:（任意）シート名。未設定なら `Conversations`

### 2-4. Webアプリとしてデプロイ
- デプロイ → **新しいデプロイ**
- 種類: **ウェブアプリ**
- 実行するユーザー: **自分**
- アクセスできるユーザー: **全員**
- デプロイ後に表示される **Webアプリ URL** を控える

### 2-5. LINE側の Webhook URL に設定
LINE Developers の Webhook URL に、上で控えた Webアプリ URL を設定します。

---

## 3. ngrok を使ったローカル開発（署名検証やpayload確認）

GAS では環境によって「ヘッダ（X-Line-Signature）が取得できない」ことがあるため、
まずはローカルで署名検証・payload確認ができるようにします。

### 3-1. ローカルサーバー起動（FastAPI）
PowerShell例:

```bash
set LINE_CHANNEL_SECRET=xxxxx
uvicorn line_handler:app --reload --port 8001 --app-dir ai-secretary-bot
```

### 3-2. ngrok で公開
別ターミナルで:

```bash
ngrok http 8001
```

ngrok が出す URL（例: `https://xxxx.ngrok-free.app`）に対して、
Webhook URL を次のように設定します。
- `https://xxxx.ngrok-free.app/callback`

### 3-3. LINE Developers で Webhook の検証
Webhook verification で成功することを確認します。

---

## 4. 動作確認（疑似Webhook送信）

LINEを実際に叩かずに、署名付きのWebhookをローカルへ送るテストです。

```bash
set LINE_CHANNEL_SECRET=xxxxx
python ai-secretary-bot/test_webhook.py
```

成功すると:
- 送信スクリプト側で `status: 200`
- サーバー側ログに events の内容が出力

---

## 補足（よくある詰まりポイント）
- **Botをグループに入れていない**: グループでメッセージが届きません
- **Webhook URL のパス違い**: `/callback` の付け忘れ等
- **Channel secret の不一致**: 署名検証で 401 になります
- **GASで署名ヘッダが取れない**: 環境依存のため、いったん ngrok+ローカルで検証するのが安全です

