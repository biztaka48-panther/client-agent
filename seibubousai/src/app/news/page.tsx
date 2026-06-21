import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { newsList } from "@/data/news";

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.news.title,
  description: pageMetadata.news.description,
};

const categoryColors: Record<string, string> = {
  info: "bg-brand-navy text-white",
  works: "bg-brand-red text-white",
  column: "bg-gray-500 text-white",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="新着情報"
        subtitle="お知らせ・施工事例・防災に関するコラムをお届けします。"
        breadcrumbs={[{ label: "新着情報" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle label="NEWS" title="新着情報一覧" />
          </AnimatedSection>

          <AnimatedSection>
            <ul className="space-y-6">
              {newsList.map((item) => (
                <li
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-gray-400 text-sm">{item.date}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${categoryColors[item.category]}`}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>
                  <h2 className="font-bold text-brand-navy text-lg mb-2 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.excerpt}
                  </p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
