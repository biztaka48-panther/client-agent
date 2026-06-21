import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "お問い合わせ | 株式会社 西部防災 | 鹿児島",
  description:
    "消防用設備点検・建築物定期調査のご相談・お見積りは西部防災へ。お電話またはお問い合わせフォームよりお気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="お問い合わせ"
        description={
          "ご相談・お見積りは無料です。\nお電話またはフォームよりお気軽にお問い合わせください。"
        }
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">
                お電話でのご相談
              </h2>
              <a
                href={`tel:${company.tel}`}
                className="mt-3 block font-[family-name:var(--font-inter)] text-3xl font-extrabold text-slate-900"
              >
                {company.tel}
              </a>
              <p className="mt-2 text-sm text-slate-600">FAX：{company.fax}</p>
              <p className="mt-1 text-sm text-slate-500">
                営業時間：平日 9:00〜18:00（仮案）
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">所在地</h2>
              <p className="mt-3 text-sm text-slate-600">
                {company.postalCode} {company.address}
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  src={company.mapEmbedUrl}
                  title="西部防災 所在地"
                  width="100%"
                  height="220"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-slate-900">
              フォームでのお問い合わせ
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
