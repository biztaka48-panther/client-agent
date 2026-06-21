import Link from "next/link";
import { newsItems } from "@/data/news";

const latestNews = newsItems.slice(0, 3);

export default function NewsSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.2em] text-red-600">
              News
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-bold text-slate-900 sm:text-4xl">
              お知らせ
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm text-red-600 hover:text-red-500 transition-colors"
          >
            すべて見る →
          </Link>
        </div>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {latestNews.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/news/${item.slug}`}
                className="flex flex-col gap-1 py-5 transition-colors hover:bg-slate-100 sm:flex-row sm:items-center sm:gap-6"
              >
                <time className="font-[family-name:var(--font-inter)] text-sm text-slate-500">
                  {item.date}
                </time>
                {item.category && (
                  <span className="inline-block w-fit rounded border border-red-300 bg-red-50 px-2 py-0.5 text-xs text-red-600">
                    {item.category}
                  </span>
                )}
                <span className="text-sm text-slate-700 sm:flex-1">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
