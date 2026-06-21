import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/ui/PageHero";
import ContactCTASection from "@/components/sections/ContactCTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
};

const companyInfo = [
  { label: "会社名", value: "西部防災株式会社" },
  { label: "所在地", value: "埼玉県さいたま市○○区○○ X-XX-XX" },
  { label: "電話番号", value: "048-XXX-XXXX" },
  { label: "FAX", value: "048-XXX-XXXX" },
  { label: "メール", value: "info@seibubousai.com" },
  { label: "設立", value: "○○年○月" },
  { label: "代表者", value: "○○○○" },
  {
    label: "事業内容",
    value:
      "消防設備点検・建築設備点検・防火設備点検・非常用発電機負荷試験・消防設備工事・防災用品販売",
  },
  {
    label: "対応エリア",
    value: "埼玉県全域（さいたま市・川口市・越谷市・川越市ほか）",
  },
  { label: "保有資格", value: "消防設備士・防火対象物点検資格者 等" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="会社概要"
        subtitle="西部防災株式会社の会社情報・代表挨拶・アクセスマップをご紹介します。"
        breadcrumbs={[{ label: "会社概要" }]}
      />

      {/* 代表挨拶 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle label="MESSAGE" title="代表挨拶" align="left" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              <div className="md:col-span-1">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-dark flex items-center justify-center shadow-lg">
                  <span className="text-white/20 text-6xl font-black select-none">代表</span>
                </div>
                <p className="text-center text-brand-navy font-bold mt-4">
                  代表取締役　○○○○
                </p>
              </div>
              <div className="md:col-span-2 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  弊社は、埼玉県さいたま市を拠点として、消防設備点検・防災設備工事を専門に手がけてまいりました。
                </p>
                <p>
                  建物に設置された消防設備は、万が一の火災時に人命を守るための重要な設備です。その設備が確実に機能するよう、法令に基づいた適切な点検と維持管理を行うことが私たちの使命です。
                </p>
                <p>
                  地元・埼玉の企業として、地域の皆さまの安全・安心を守るために、迅速かつ丁寧な対応を心がけています。マンション・ビル・商業施設・病院・学校など、あらゆる建物の防災ニーズにお応えします。
                </p>
                <p>
                  「まず相談だけ」でも歓迎です。お気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 会社情報テーブル */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle label="COMPANY INFO" title="会社情報" align="left" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  {companyInfo.map((row) => (
                    <tr key={row.label}>
                      <th className="text-left px-6 py-4 text-sm font-bold text-brand-navy bg-brand-navy-light w-32 md:w-40 align-top">
                        {row.label}
                      </th>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Googleマップ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle label="ACCESS" title="アクセス" align="left" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-xl overflow-hidden shadow-md mb-6">
              <iframe
                src="https://maps.google.com/maps?q=さいたま市&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="西部防災株式会社 アクセスマップ"
              />
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600 leading-relaxed">
              <p className="font-bold text-brand-navy mb-2">アクセス方法（仮案）</p>
              <p>最寄り駅より徒歩○分。お車でお越しの際は○○ICより約○分です。駐車場あり。</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
