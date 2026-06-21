import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "一般・家庭向け | 西部防災 | 鹿児島",
  description:
    "家庭用消火器・住宅用火災警報器・防災グッズの販売や取付に対応。ご家庭や小規模事業者の防災対策をサポートします。",
};

const items = [
  {
    icon: "🧯",
    title: "家庭用消火器",
    desc: "ご家庭に最適な消火器のご提案・販売・古い消火器の回収まで対応します。",
  },
  {
    icon: "🔔",
    title: "住宅用火災警報器",
    desc: "設置義務のある火災警報器の選定・取付・交換を承ります。",
  },
  {
    icon: "🎒",
    title: "防災グッズ",
    desc: "非常持ち出し袋・備蓄品など、災害への備えをサポートします。",
  },
];

export default function GeneralPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Home"
        title="一般・家庭向けサービス"
        description={
          "ご家庭や小規模事業者向けの防災用品も取り扱っています。\nお気軽にご相談ください。"
        }
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="text-4xl" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
