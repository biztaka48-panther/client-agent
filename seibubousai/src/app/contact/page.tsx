import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/forms/ContactForm";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
};

const contactMethods = [
  {
    icon: Phone,
    label: "お電話",
    value: "048-XXX-XXXX",
    sub: "受付時間：平日 9:00〜18:00",
    href: "tel:048XXXXXXX",
    color: "bg-brand-red",
  },
  {
    icon: Mail,
    label: "メール",
    value: "info@seibubousai.com",
    sub: "24時間受付・翌営業日以内にご返信",
    href: "mailto:info@seibubousai.com",
    color: "bg-brand-navy",
  },
  {
    icon: MessageCircle,
    label: "LINE",
    value: "LINE公式アカウント",
    sub: "気軽にメッセージを送れます",
    href: process.env.NEXT_PUBLIC_LINE_URL ?? "https://line.me/R/ti/p/@XXXXXXX",
    color: "bg-green-500",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="お問い合わせ"
        subtitle="消防設備点検・工事のご相談はお気軽にどうぞ。まずは相談だけでも歓迎です。"
        breadcrumbs={[{ label: "お問い合わせ" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 3つの連絡手段 */}
          <AnimatedSection>
            <SectionTitle label="CONTACT" title="お気軽にご連絡ください" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <AnimatedSection key={method.label} delay={i * 0.1}>
                  <a
                    href={method.href}
                    target={method.label === "LINE" ? "_blank" : undefined}
                    rel={method.label === "LINE" ? "noopener noreferrer" : undefined}
                    className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 text-center group"
                  >
                    <div className={`w-14 h-14 rounded-full ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <p className="font-bold text-brand-navy text-base mb-1">{method.label}</p>
                    <p className="font-bold text-gray-700 text-sm mb-2">{method.value}</p>
                    <div className="flex items-center justify-center gap-1 text-gray-400 text-xs">
                      <Clock size={12} />
                      {method.sub}
                    </div>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>

          {/* お問い合わせフォーム */}
          <AnimatedSection>
            <SectionTitle label="FORM" title="お問い合わせフォーム" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
