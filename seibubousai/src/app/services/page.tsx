import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/ui/PageHero";
import ContactCTASection from "@/components/sections/ContactCTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "消防設備点検・防災設備工事",
  provider: { "@type": "LocalBusiness", name: "西部防災株式会社" },
  areaServed: "埼玉県",
  description:
    "消防設備点検・建築設備点検・防火設備点検・非常用発電機負荷試験・消防設備工事・防災用品販売",
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <PageHero
        title="サービス紹介"
        subtitle="消防設備点検から防災設備工事まで、建物の安全管理をワンストップでサポートします。"
        breadcrumbs={[{ label: "サービス紹介" }]}
      />

      {/* サービス一覧 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              label="SERVICES"
              title="提供サービス一覧"
              subtitle="埼玉県さいたま市を中心に、あらゆる建物の防災ニーズにお応えします。"
            />
          </AnimatedSection>

          <div className="space-y-20">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={0.1}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* 画像（左右交互） */}
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-brand-navy to-brand-navy-dark flex items-center justify-center shadow-lg">
                      <span className="text-white/20 text-7xl font-black select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  {/* テキスト */}
                  <div className={i % 2 === 1 ? "md:order-1" : ""}>
                    <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">
                      SERVICE {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mt-2 mb-4">
                      {service.title}
                    </h2>
                    <div className="w-10 h-0.5 bg-brand-red mb-4" />
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.longDescription}
                    </p>
                    <a
                      href="/contact/"
                      className="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-6 py-3 rounded-md hover:bg-brand-red-dark transition-colors"
                    >
                      このサービスについて相談する
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 対応エリア */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <span className="font-bold text-brand-navy text-lg">対応エリア</span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                <strong className="text-brand-navy">埼玉県全域</strong>に対応しています。さいたま市・川口市・越谷市・川越市・所沢市・草加市など、まずはお気軽にご相談ください。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
