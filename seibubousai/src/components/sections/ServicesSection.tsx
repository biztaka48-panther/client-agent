import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle label="SERVICES" title="サービス紹介" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.08}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
                {/* サービス画像プレースホルダー */}
                <div className="aspect-video bg-brand-navy-light relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-navy to-brand-navy-dark group-hover:scale-105 transition-transform duration-500">
                    <span className="text-white/30 text-6xl font-black select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                {/* テキスト */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-brand-navy text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1 text-brand-red font-bold text-sm mt-4 hover:gap-2 transition-all"
                  >
                    詳しく見る
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
