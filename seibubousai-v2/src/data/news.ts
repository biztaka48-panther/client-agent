import type { NewsItem } from "@/types";

// ★お知らせは将来的にMarkdown連携予定。現状は仮案データ。
export const newsItems: NewsItem[] = [
  {
    slug: "sample-3",
    title: "年末年始の営業についてのお知らせ",
    date: "2026-06-15",
    category: "お知らせ",
    excerpt: "年末年始の休業期間についてご案内いたします。",
    body: "平素より格別のご愛顧を賜り、誠にありがとうございます。\n年末年始の休業期間についてご案内いたします。\n\n緊急のご用件につきましては、お電話にて承ります。\n（※掲載内容は仮案です）",
  },
  {
    slug: "sample-2",
    title: "建築物定期調査のご依頼受付を開始しました",
    date: "2026-05-28",
    category: "サービス",
    excerpt: "建築基準法第12条に基づく定期調査の受付を開始しました。",
    body: "建築物定期調査（建築基準法第12条点検）のご依頼受付を開始いたしました。\n特殊建築物をお持ちのオーナー様・管理会社様はお気軽にご相談ください。\n\n（※掲載内容は仮案です）",
  },
  {
    slug: "sample-1",
    title: "ホームページをリニューアルしました",
    date: "2026-05-01",
    category: "お知らせ",
    excerpt: "より見やすく、お問い合わせしやすいサイトにリニューアルしました。",
    body: "この度、ホームページを全面リニューアルいたしました。\nサービス内容や実績をより分かりやすくご覧いただけます。\n\n（※掲載内容は仮案です）",
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}
