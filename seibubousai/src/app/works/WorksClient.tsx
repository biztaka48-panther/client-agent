"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import ContactCTASection from "@/components/sections/ContactCTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { works } from "@/data/works";
import type { WorkCategory } from "@/types/work";

type FilterCategory = "all" | WorkCategory;

const filters: { label: string; value: FilterCategory }[] = [
  { label: "すべて", value: "all" },
  { label: "点検", value: "inspection" },
  { label: "工事", value: "construction" },
  { label: "その他", value: "other" },
];

const categoryColors: Record<string, string> = {
  inspection: "bg-brand-navy text-white",
  construction: "bg-brand-red text-white",
  other: "bg-gray-500 text-white",
};

export default function WorksClient() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const filtered =
    activeCategory === "all"
      ? works
      : works.filter((w) => w.category === activeCategory);

  return (
    <>
      <PageHero
        title="施工事例"
        subtitle="マンション・商業施設・病院など、さまざまな建物での施工実績をご紹介します。"
        breadcrumbs={[{ label: "施工事例" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle label="WORKS" title="施工実績一覧" />
          </AnimatedSection>

          {/* カテゴリフィルター */}
          <AnimatedSection>
            <div className="flex gap-3 justify-center flex-wrap mb-10">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveCategory(f.value)}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                    activeCategory === f.value
                      ? "bg-brand-red text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* 事例グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((work, i) => (
              <AnimatedSection key={work.id} delay={i * 0.07}>
                <div className="rounded-xl overflow-hidden shadow-md group h-full flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[4/3] bg-brand-navy-light relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-dark to-brand-navy group-hover:scale-105 transition-transform duration-500 flex items-end p-4">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${categoryColors[work.category]}`}
                      >
                        {work.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-gray-400 mb-1">
                      {work.buildingType} ／ {work.location}
                    </p>
                    <h3 className="font-bold text-brand-navy text-base leading-snug mb-3">
                      {work.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {work.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-16">
              該当する事例がありません。
            </p>
          )}
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
