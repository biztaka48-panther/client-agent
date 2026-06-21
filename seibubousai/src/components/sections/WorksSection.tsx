import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { works } from "@/data/works";

const categoryColors: Record<string, string> = {
  inspection: "bg-brand-navy text-white",
  construction: "bg-brand-red text-white",
  other: "bg-gray-500 text-white",
};

export default function WorksSection() {
  const featured = works.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle label="WORKS" title="施工実績" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((work, i) => (
            <AnimatedSection key={work.id} delay={i * 0.1}>
              <div className="rounded-xl overflow-hidden shadow-md group h-full flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
                {/* 画像プレースホルダー */}
                <div className="aspect-[4/3] bg-brand-navy-light relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-dark to-brand-navy group-hover:scale-105 transition-transform duration-500 flex items-end p-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${categoryColors[work.category]}`}
                    >
                      {work.categoryLabel}
                    </span>
                  </div>
                </div>
                {/* テキスト */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 mb-1">{work.buildingType} ／ {work.location}</p>
                  <h3 className="font-bold text-brand-navy text-base leading-snug mb-2">
                    {work.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {work.description.slice(0, 60)}…
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="text-center mt-10">
            <Link
              href="/works/"
              className="inline-flex items-center gap-2 border-2 border-brand-navy text-brand-navy font-bold px-8 py-3 rounded-md hover:bg-brand-navy hover:text-white transition-colors"
            >
              施工事例をもっと見る
              <ArrowRight size={18} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
