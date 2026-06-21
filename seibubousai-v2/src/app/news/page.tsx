import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { newsItems } from "@/data/news";

export const metadata: Metadata = {
  title: "お知らせ | 株式会社 西部防災 | 鹿児島",
  description: "株式会社 西部防災からのお知らせ・更新情報をご案内します。",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="News" title="お知らせ" />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {newsItems.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/news/${item.slug}`}
                  className="flex flex-col gap-2 py-6 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-6"
                >
                  <time className="font-[family-name:var(--font-inter)] text-sm text-slate-500">
                    {item.date}
                  </time>
                  {item.category && (
                    <span className="inline-block w-fit rounded border border-red-300 bg-red-50 px-2 py-0.5 text-xs text-red-600">
                      {item.category}
                    </span>
                  )}
                  <span className="text-slate-800 sm:flex-1">{item.title}</span>
                  <span className="hidden text-red-600 sm:inline">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
