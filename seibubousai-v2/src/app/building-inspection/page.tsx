import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "建築物定期調査 | 西部防災 | 鹿児島",
  description:
    "特殊建築物の定期報告（建築基準法第12条点検）に対応。ベテランの調査員が建築物・設備の安全性を調査し、行政への報告をサポートします。",
};

const targets = [
  "劇場・映画館・集会場",
  "病院・診療所・福祉施設",
  "ホテル・旅館",
  "百貨店・物販店舗",
  "飲食店・遊技場",
  "共同住宅（一定規模以上）",
];

export default function BuildingInspectionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Building Inspection"
        title="建築物定期調査"
        description={
          "建築基準法第12条に基づく特殊建築物の定期報告に対応します。\n建物の損傷・劣化などを調査し、利用者の安全を守ります。"
        }
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-bold text-slate-900">
              定期報告制度とは（仮案）
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              不特定多数の人が利用する特殊建築物などは、建築基準法により
              定期的に有資格者が調査・検査を行い、その結果を特定行政庁へ
              報告することが義務付けられています。事故や災害を未然に防ぐための
              重要な制度です。
            </p>
          </div>

          <h2 className="mb-6 mt-12 text-center font-[family-name:var(--font-serif)] text-2xl font-bold text-slate-900 sm:text-3xl">
            主な調査対象建築物
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {targets.map((t) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
              >
                <span className="text-red-600" aria-hidden="true">
                  🏢
                </span>
                <span className="text-sm text-slate-700">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
