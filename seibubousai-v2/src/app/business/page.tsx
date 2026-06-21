import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import CTASection from "@/components/sections/CTASection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "業務内容 | 株式会社 西部防災 | 鹿児島",
  description:
    "消防用設備点検・建築物定期調査・メンテナンス・非常用発電機の負荷試験・防災関連品販売まで。西部防災の業務内容をご紹介します。",
};

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business"
        title="業務内容"
        description={
          "消防・防災に関する幅広いサービスをワンストップで提供します。\n施設の安全管理をトータルでサポートいたします。"
        }
      />

      <section className="bg-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
