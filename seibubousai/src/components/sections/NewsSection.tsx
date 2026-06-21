import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { newsList } from "@/data/news";

const categoryColors: Record<string, string> = {
  info: "bg-brand-navy text-white",
  works: "bg-brand-red text-white",
  column: "bg-gray-500 text-white",
};

export default function NewsSection() {
  const latest = newsList.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle label="NEWS" title="新着情報" />
        </AnimatedSection>

        <AnimatedSection>
          <ul className="divide-y divide-gray-100 border-t border-gray-100">
            {latest.map((item) => (
              <li key={item.id}>
                <Link
                  href="/news/"
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-5 group hover:bg-gray-50 px-2 rounded transition-colors"
                >
                  <span className="text-gray-400 text-sm shrink-0 w-24">
                    {item.date}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 w-fit ${categoryColors[item.category]}`}
                  >
                    {item.categoryLabel}
                  </span>
                  <span className="text-gray-700 text-sm font-medium group-hover:text-brand-red transition-colors flex-1">
                    {item.title}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover:text-brand-red group-hover:translate-x-1 transition-all shrink-0 hidden sm:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center mt-8">
            <Link
              href="/news/"
              className="inline-flex items-center gap-2 text-brand-red font-bold hover:underline"
            >
              一覧を見る
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
