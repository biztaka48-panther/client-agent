# ai-hearing-pro

朝井慈久 AI活用代行サービス — ヒアリングシート＆提案ジェネレーター

## 概要

クライアントが困っていることを入力・選択するだけで、AIが最適なシステム・アプリの提案書を自動生成するWebアプリです。

## 使い方

1. `index.html` をブラウザで開く（またはNetlifyにデプロイ）
2. 「無料でヒアリングを始める」をクリック
3. 基本情報を入力
4. AIとのチャット形式で7問に回答
5. Anthropic APIキーを入力
6. 提案書が自動生成される
7. PDFとして保存 or テキストコピー

## APIキーについて

- [Anthropic Console](https://console.anthropic.com/) でAPIキーを取得してください
- キーはセッション中のみ `sessionStorage` に保持されます（ブラウザを閉じると消去）

## デプロイ（Netlify）

1. [Netlify](https://app.netlify.com/) にログイン
2. `ai-hearing-pro` フォルダをドラッグ＆ドロップ
3. 自動でデプロイ完了

## ファイル構成

```
ai-hearing-pro/
├── index.html     メインファイル（全機能を1ファイルに集約）
├── netlify.toml   デプロイ設定
└── README.md      この説明書
```

## 注意事項

- 本ツールは朝井慈久 AI活用代行サービスの内部利用を目的としています
- フロントエンドから直接APIを呼び出す構成のため、APIキーの取り扱いにご注意ください
- 本番運用時はNetlify Functionsを使ったサーバーサイド呼び出しへの移行を推奨します
