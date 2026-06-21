import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { newsItems, getNewsBySlug } from "@/data/news";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "お知らせ | 株式会社 西部防災" };
  return {
    title: `${item.title} | 株式会社 西部防災`,
    description: item.excerpt ?? item.title,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader eyebrow="News" title={item.title} />

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <time className="font-[family-name:var(--font-inter)] text-sm text-slate-500">
              {item.date}
            </time>
            {item.category && (
              <span className="rounded border border-red-300 bg-red-50 px-2 py-0.5 text-xs text-red-600">
                {item.category}
              </span>
            )}
          </div>

          <div className="whitespace-pre-line text-base leading-relaxed text-slate-700">
            {item.body}
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-500"
            >
              ← お知らせ一覧へ戻る
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
