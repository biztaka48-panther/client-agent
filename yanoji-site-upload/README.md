# お酒と食彩 家のじ - HP 管理ガイド

## 🚀 Netlify へのデプロイ

1. https://netlify.com にログイン
2. 「Add new site → Deploy manually」
3. **このフォルダ（yanoji-site-upload）をまるごと**ドラッグ＆ドロップ
4. 数秒で公開（仮URL: `xxxx.netlify.app`）

## 🌐 独自ドメイン（yanoji.com）

詳細手順は **`NETLIFY-DOMAIN-SETUP.txt`** を参照。

- Netlify でドメイン購入 or 既存ドメインを接続
- `netlify.toml` / `_redirects` で www → 非www・HTTPS へ統一済み
- ドメイン名を変える場合は `js/site-config.js` の `siteUrl` も合わせて変更

## 📸 Instagram 自動連携（Behold.io）

1. https://behold.so でアカウント作成
2. 「Create Feed」→ **@yanoji2777** の Instagram でログイン
3. 表示された **Feed ID** をコピー
4. **`js/site-config.js`** の `beholdFeedId` に貼り付け
5. Netlify に再デプロイ

反映箇所:
- **本日の旬**（FV直下）… 最新6件グリッド
- **今の旬**（#season）… 最新1件

Instagram に投稿するだけで HP が自動更新されます（APIトークン不要）。

## 📸 写真の入れ替え

- ヒーロー: `assets/images/hero/`（hero1.jpg など）
- 旬・料理: `assets/images/season/` など、index.html の src を更新

## 📅 予約

食べログ外部リンク + 電話（099-239-2777）の2択です。
