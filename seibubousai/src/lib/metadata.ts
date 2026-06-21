import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://seibubousai.com"),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "西部防災株式会社",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const pageMetadata = {
  top: {
    title: "消防設備点検・防災設備工事は西部防災株式会社｜埼玉県さいたま市",
    description:
      "消防設備点検・建築設備点検・防火設備点検・非常用発電機負荷試験・消防設備工事は西部防災株式会社へ。埼玉県さいたま市を中心に地域密着で対応します。",
  },
  services: {
    title: "サービス一覧｜消防設備点検・工事・建築設備点検｜西部防災株式会社",
    description:
      "消防設備点検・建築設備点検・防火設備点検・非常用発電機負荷試験・消防設備工事・防災用品販売のサービス詳細。",
  },
  works: {
    title: "施工事例｜西部防災株式会社",
    description:
      "マンション・商業施設・病院など、さまざまな建物の消防設備点検・工事の施工事例をご紹介。",
  },
  news: {
    title: "新着情報｜西部防災株式会社",
    description:
      "西部防災株式会社からのお知らせ・施工事例・防災コラムをお届けします。",
  },
  about: {
    title: "会社概要｜西部防災株式会社",
    description:
      "西部防災株式会社の会社概要、代表挨拶、アクセスマップ。埼玉県さいたま市の消防設備点検・工事の専門会社。",
  },
  recruit: {
    title: "採用情報｜消防設備士・設備管理スタッフ募集｜西部防災株式会社",
    description:
      "未経験者歓迎。消防設備点検スタッフ・施工スタッフを募集中。消防設備士の資格取得をサポートします。",
  },
  contact: {
    title: "お問い合わせ｜西部防災株式会社",
    description:
      "消防設備点検・防災設備工事のご相談・お見積り依頼はこちら。",
  },
};
