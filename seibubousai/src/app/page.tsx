import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/metadata";
import HeroSection from "@/components/sections/HeroSection";
import ReasonsSection from "@/components/sections/ReasonsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorksSection from "@/components/sections/WorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsSection from "@/components/sections/NewsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactCTASection from "@/components/sections/ContactCTASection";

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.top.title,
  description: pageMetadata.top.description,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "西部防災株式会社",
  url: "https://seibubousai.com",
  telephone: "048-XXX-XXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "○○区○○X-XX-XX",
    addressLocality: "さいたま市",
    addressRegion: "埼玉県",
    postalCode: "33X-XXXX",
    addressCountry: "JP",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  description:
    "消防設備点検・建築設備点検・防火設備点検・非常用発電機負荷試験・消防設備工事は西部防災株式会社へ",
  areaServed: "埼玉県",
  serviceType: [
    "消防設備点検",
    "建築設備点検",
    "防火設備点検",
    "非常用発電機負荷試験",
    "消防設備工事",
    "防災用品販売",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ReasonsSection />
      <ServicesSection />
      <WorksSection />
      <TestimonialsSection />
      <NewsSection />
      <AboutSection />
      <ContactCTASection />
    </>
  );
}
