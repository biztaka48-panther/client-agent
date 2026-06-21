import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "プライバシーポリシー｜西部防災株式会社",
  description: "西部防災株式会社のプライバシーポリシーについてご説明します。",
};

const sections = [
  {
    title: "個人情報の収集について",
    content:
      "当社は、お問い合わせフォームや採用応募フォームを通じて、お名前・メールアドレス・電話番号等の個人情報をお預かりする場合があります。",
  },
  {
    title: "個人情報の利用目的",
    content:
      "収集した個人情報は、お問い合わせへの回答・採用選考・サービスのご提供を目的として使用します。それ以外の目的には使用しません。",
  },
  {
    title: "個人情報の第三者提供",
    content:
      "当社は、法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。",
  },
  {
    title: "個人情報の管理",
    content:
      "当社は、個人情報の漏洩・紛失・改ざん等を防ぐため、適切なセキュリティ対策を講じます。",
  },
  {
    title: "個人情報の開示・訂正・削除",
    content:
      "お客様ご自身の個人情報の開示・訂正・削除をご希望の場合は、お問い合わせフォームよりご連絡ください。合理的な範囲で速やかに対応いたします。",
  },
  {
    title: "Cookie（クッキー）の使用について",
    content:
      "当サイトでは、サービス向上のためCookieを使用する場合があります。ブラウザの設定によりCookieの使用を無効にすることができます。",
  },
  {
    title: "プライバシーポリシーの変更",
    content:
      "当社は、必要に応じてプライバシーポリシーを変更することがあります。変更後のポリシーは本ページに掲載します。",
  },
  {
    title: "お問い合わせ窓口",
    content:
      "個人情報に関するお問い合わせは、当社お問い合わせフォームよりご連絡ください。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="プライバシーポリシー"
        breadcrumbs={[{ label: "プライバシーポリシー" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 border-l-4 border-brand-red pl-4">
              西部防災株式会社（以下「当社」）は、お客様の個人情報の保護を重要と考え、以下のとおりプライバシーポリシーを定めます。
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div>
                  <h2 className="text-lg font-bold text-brand-navy mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed pl-8">
                    {section.content}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <p className="text-gray-400 text-xs mt-12 text-right">
              制定日：○○年○月○日　　西部防災株式会社
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
