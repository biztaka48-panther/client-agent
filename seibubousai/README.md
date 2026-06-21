# 西部防災株式会社 ホームページ

## 技術スタック

| 項目 | 内容 |
|---|---|
| Framework | Next.js 16 (App Router / Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Form | React Hook Form + Zod |
| Hosting | Netlify |

## ローカル開発

```bash
npm install
npm run dev
# → http://localhost:3000
```

## ビルド・デプロイ

```bash
npm run build
# → out/ フォルダに静的ファイルが生成される
```

Netlify へは GitHub 連携で自動デプロイ。  
Build command: `npm run build` / Publish dir: `out`

## 環境変数

`.env.example` をコピーして `.env.local` を作成してください。

```bash
cp .env.example .env.local
```

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_LINE_URL` | LINE公式アカウントURL（FloatingCTA / お問い合わせページ） |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API（iframe埋め込みの場合は不要） |

## ページ構成

| URL | ページ |
|---|---|
| `/` | TOPページ |
| `/services/` | サービス紹介 |
| `/works/` | 施工事例（カテゴリフィルター付き） |
| `/news/` | 新着情報 |
| `/about/` | 会社概要（Googleマップ） |
| `/recruit/` | 採用情報（タイムライン・応募フォーム） |
| `/contact/` | お問い合わせ（フォーム） |
| `/privacy/` | プライバシーポリシー |

## 本番公開前に差し替える項目

- [ ] 電話番号（`048-XXX-XXXX` → 実際の番号）
- [ ] 住所（`○○区○○ X-XX-XX` → 実際の住所）
- [ ] 代表者名（`○○○○` → 実際の氏名）
- [ ] 設立年月
- [ ] GoogleマップのURL（会社住所で検索されるよう更新）
- [ ] LINE公式アカウントURL（`.env.local` に設定）
- [ ] OGP画像（`public/og-image.jpg` 1200×630px）
- [ ] ファビコン（`public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`）
- [ ] 各サービス・施工事例の実写真（`public/images/` 以下）
- [ ] プライバシーポリシー制定日
- [ ] sitemap.xml（公開日に合わせて更新）

## Netlify Forms

デプロイ後、Netlify 管理画面の **Forms** タブで以下を確認してください。

- `contact`（お問い合わせフォーム）
- `recruit`（採用応募フォーム）

通知メールの設定は Forms > Notifications から行います。
