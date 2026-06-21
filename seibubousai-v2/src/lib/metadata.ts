export const siteConfig = {
  name: "株式会社 西部防災",
  url: "https://seibubousai.com",
  description:
    "鹿児島の消防用設備点検・建築物定期調査・防災設備メンテナンスは西部防災へ。消防設備の設置から定期点検まで、安心と信頼のプロフェッショナル集団です。",
  keywords: [
    "消防設備点検",
    "建築物定期調査",
    "防災",
    "鹿児島",
    "消防用設備",
    "メンテナンス",
    "負荷試験",
    "非常用発電機",
  ],
  tel: "099-214-2701",
  fax: "099-214-2702",
  email: "seibu.bousai@san.bbiq.jp",
};

// JSON-LD（構造化データ / LocalBusiness）
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.tel,
  faxNumber: siteConfig.fax,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    postalCode: "890-0054",
    addressRegion: "鹿児島県",
    addressLocality: "鹿児島市",
    streetAddress: "荒田二丁目63番19号",
    addressCountry: "JP",
  },
  areaServed: "鹿児島県",
  description: "消防用設備点検・建築物定期調査・防災設備メンテナンス",
};
