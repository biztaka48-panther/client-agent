/**
 * 株式会社サンプラスワン — サイト用データ（移行・CMS接続のたたき台）
 * 出典: 公式サイト https://sunplusone.com/ の公開文言（2026年時点の取得内容に基づく）
 * 未掲載の住所等は「要確認」とし、本リポジトリは提案／デモ用途です。
 */

export const siteMeta = {
  name: "株式会社サンプラスワン",
  nameShort: "サンプラスワン",
  tagline: "暮らしに安心をプラス",
  description:
    "交通誘導・施設・駐車場警備など。鹿児島の警備会社サンプラスワンです。",
  canonicalOrigin: "https://sunplusone.com",
  tel: "099-257-1553",
  fax: "099-257-5830",
  address: {
    postal: "〒890-0051",
    lines: ["鹿児島県鹿児島市与次郎2丁目3-41"],
  },
  copyright: "Copyright © 2016 サンプラスワン All Rights Reserved.",
} as const;

export const heroCopy = {
  title: "交通誘導・施設・駐車場警備",
  subtitle: "鹿児島の警備会社 サンプラスワン",
  lead:
    "サンプラスワンは交通誘導警備シェア鹿児島県No.1。確かな実績と豊富な経験をもとに、お客様、地域の皆様に安全で快適な環境を創造し、提供いたします。",
  sourceNote: "上記リード文・訴求は公式サイト掲載内容の転記です。",
} as const;

export const anniversary = {
  badge: "設立30周年",
  headline: "これまでの歩みに感謝を込めて",
  body:
    "地域の安全を支えてきた実績を礎に、次の10年へ。デジタル面でも見やすく、問い合わせしやすい体験へアップデートする提案案です。",
  /** 公式トップの新着に「設立30周年のご挨拶と感謝の御礼」（2026.03.06.）が掲載されていました */
  officialNote: "30周年の詳細年次・社史は、貴社公式資料・旧サイト下層ページの移行時に確定してください。",
} as const;

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  href?: string;
  kind: "news" | "blog";
};

/** 公式トップに掲載されていた新着・ブログ見出し（転記） */
export const newsItems: NewsItem[] = [
  {
    id: "n-20260306",
    date: "2026.03.06.",
    title: "設立30周年のご挨拶と感謝の御礼",
    kind: "news",
  },
  {
    id: "b-20250919",
    date: "2025.09.19.",
    title: "blog「職場体験の様子をご紹介します！」",
    kind: "blog",
  },
  {
    id: "b-20250804",
    date: "2025.08.04.",
    title: "blog「サンプラスワンの熱中症対策」",
    kind: "blog",
  },
  {
    id: "b-20250429",
    date: "2025.04.29.",
    title: "blog「総務部特製カレー」",
    kind: "blog",
  },
  {
    id: "b-20250415",
    date: "2025.04.15.",
    title: "blog「現任教育を実施しました」",
    kind: "blog",
  },
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "traffic",
    title: "交通誘導警備業務",
    summary: "工事現場・イベント等の交通誘導。県内シェアの訴求は公式サイト表記に準拠。",
    bullets: ["誘導計画に沿った安全管理", "地域特性に合わせた運用（仮案）"],
  },
  {
    slug: "facility",
    title: "施設警備業務",
    summary: "商業施設・公共施設等の常駐・巡回警備。",
    bullets: ["入退館管理・巡回", "異常時の初動（仮案）"],
  },
  {
    slug: "machine",
    title: "機械警備業務",
    summary: "センサー・監視システムと連携した遠隔監視・駆け付け。",
    bullets: ["機械と人のハイブリッド運用（仮案）"],
  },
  {
    slug: "event",
    title: "イベント警備業務",
    summary: "コンサート・祭礼・スポーツ大会等の雑踏・誘導警備。",
    bullets: ["来場者動線の整理", "関係各所との連携（仮案）"],
  },
  {
    slug: "train",
    title: "列車見張り業務",
    summary: "線路・車両周辺の安全確保に関わる見張り業務。",
    bullets: ["現場手順に沿った運用（仮案）"],
  },
  {
    slug: "parking",
    title: "駐車場警備",
    summary: "駐車場内の誘導・混雑緩和・トラブル防止。",
    bullets: ["夜間・休日対応の可否はお問い合わせで要確認"],
  },
];

export type Office = {
  id: string;
  name: string;
  note?: string;
};

/** メニュー掲載名に基づく事業所一覧（所在地の細部は各公式下層ページで要確認） */
export const offices: Office[] = [
  { id: "hq", name: "本社", note: "鹿児島市与次郎2丁目3-41（フッター表記と一致）" },
  { id: "kitakyushu", name: "北九州支店" },
  { id: "satsumasendai", name: "薩摩川内営業所" },
  { id: "kirishima", name: "霧島営業所" },
  { id: "izumi", name: "出水営業所" },
  { id: "miyakonojo", name: "都城営業所" },
  { id: "kumage", name: "熊毛出張所" },
  { id: "minamisatsuma", name: "南さつま営業所" },
  { id: "satsumacho", name: "さつま町出張所" },
  { id: "chuo-base", name: "中央事業所ベース" },
];

export const recruitTeaser = {
  heading: "一緒に働きましょう！",
  body: `私たちの仕事や働き方、スタッフの紹介を通じて、社内の雰囲気とやりがいをご紹介します。
誰かを守る仕事に興味がある。自分らしく働きたい。年齢に関係なく成長を続けたい。
ひとつでも当てはまる方は、ぜひご応募ください！`,
  sourceNote: "上記は公式サイト掲載の募集コピーを転記しています。",
} as const;

/** 採用強化用の仮文案（掲載前に人事・法務で要確認） */
export const recruitPitch = {
  badge: "積極採用中（仮案）",
  sub: "現場スタッフの確保が業界全体の課題です。まずは話からでも大丈夫です。",
  bullets: [
    "未経験スタート歓迎（研修・教育制度あり）※詳細は採用ページで要確認",
    "シフト・勤務形態の相談窓口を分かりやすく（仮案）",
    "資格取得・ステップアップの道筋を見える化（仮案）",
  ],
  disclaimer:
    "人手不足の表現・待遇数値は法令・労務と照合のうえ貴社文案に差し替えてください。ここはデモ用のたたき台です。",
} as const;

export const recruitNavLinks = [
  { label: "仕事内容を知る", href: "/recruit#know", description: "業務紹介・動画など（旧サイト相当）" },
  { label: "スタッフ紹介", href: "/recruit#staff", description: "先輩の声（移行要）" },
  { label: "働くメリット", href: "/recruit#merit", description: "待遇・雰囲気" },
  { label: "採用の流れ", href: "/recruit#flow", description: "応募から配属まで" },
  { label: "アルバイト大募集!!", href: "/recruit#parttime", description: "公式メニュー表記に準拠" },
  { label: "警備員教育制度", href: "/recruit#training", description: "研修・現任教育" },
  { label: "採用のFAQ", href: "/recruit#faq", description: "よくある質問" },
] as const;

export const recruitFlowSteps = [
  { step: "01", title: "応募・お問い合わせ", body: "電話・フォーム・説明会など、貴社ルールに合わせて記載（仮案）。" },
  { step: "02", title: "面接・見学", body: "現場見学や職場体験がある場合はここで訴求（仮案）。" },
  { step: "03", title: "採用決定・手続き", body: "必要書類・健康診断などを一覧化（仮案）。" },
  { step: "04", title: "研修・配属", body: "教育制度ページと相互リンク（仮案）。" },
] as const;

export const companyLinks = [
  { label: "警備実績", href: "/company#track" },
  { label: "社内の取り組み", href: "/company#initiatives" },
  { label: "一般事業主行動計画", href: "/company#action-plan" },
  { label: "サービスのFAQ", href: "/company#faq-service" },
  { label: "警備業標識", href: "/company#badge" },
] as const;

export type NavChild = { label: string; href: string; description?: string };

export type NavMenuEntry = {
  label: string;
  href: string;
  /** 下層リンク（旧サイトのメニュー階層に近い導線） */
  children?: readonly NavChild[];
};

/**
 * メインナビ（公式サイト相当：ホバーで下層）
 * 順序: ホーム → お知らせ → 事業内容 → 警備料金 → 事業所紹介 → 採用情報 → 会社案内
 * ※「お問い合わせ」は左固定ボタン・フッター等へ（グロナビ7項目は現行HPに準拠）
 */
export const navMenu: readonly NavMenuEntry[] = [
  { label: "ホーム", href: "/" },
  {
    label: "お知らせ",
    href: "/news",
    children: [
      { label: "新着一覧", href: "/news", description: "お知らせ・ブログ見出し" },
      { label: "移行マップ（制作用）", href: "/migration", description: "旧URL→新パス" },
    ],
  },
  {
    label: "事業内容",
    href: "/services",
    children: [
      ...services.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
        description: s.summary.length > 40 ? `${s.summary.slice(0, 40)}…` : s.summary,
      })),
      { label: "事業内容トップへ", href: "/services", description: "一覧・比較しやすい導線" },
      { label: "ご依頼・見積", href: "/contact#request", description: "お問い合わせフォーム" },
    ],
  },
  {
    label: "警備料金",
    href: "/fees",
    children: [
      { label: "料金のご案内", href: "/fees", description: "PDF・表は旧サイトから転載" },
      { label: "見積の相談", href: "/contact#request", description: "現場条件に合わせて" },
      { label: "電話で問い合わせ", href: `tel:${siteMeta.tel}`, description: siteMeta.tel },
    ],
  },
  {
    label: "事業所紹介",
    href: "/offices",
    children: offices.map((o) => ({
      label: o.name,
      href: `/offices#${o.id}`,
      description: o.note?.slice(0, 28),
    })),
  },
  {
    label: "採用情報",
    href: "/recruit",
    children: [
      ...recruitNavLinks.map((r) => ({ label: r.label, href: r.href, description: r.description })),
      { label: "採用トップ", href: "/recruit", description: "メッセージ・強み" },
    ],
  },
  {
    label: "会社案内",
    href: "/company",
    children: [
      ...companyLinks.map((c) => ({ label: c.label, href: c.href })),
      { label: "会社案内トップ", href: "/company", description: "概要・セクション一覧" },
    ],
  },
] as const;

/** フッター等で使うフラットな主要リンク（お問い合わせを末尾に） */
export const navPrimary = [
  ...navMenu.map((item) => ({ href: item.href, label: item.label })),
  { href: "/contact", label: "お問い合わせ" },
] as const;

export const quickJumpEntries = [
  ...navMenu.flatMap((item) => [
    { title: item.label, href: item.href, group: "主要" },
    ...(item.children?.map((c) => ({ title: `${item.label}: ${c.label}`, href: c.href, group: "下層" })) ?? []),
  ]),
  { title: "お問い合わせ", href: "/contact", group: "主要" },
  { title: "ご依頼フォーム", href: "/contact#request", group: "お問い合わせ" },
  { title: "アクセス（本社）", href: "/contact#access", group: "お問い合わせ" },
  { title: `電話（${siteMeta.tel}）`, href: `tel:${siteMeta.tel}`, group: "お問い合わせ" },
  { title: "ご依頼・見積", href: "/contact#request", group: "依頼" },
];
