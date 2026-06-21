import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "消防用設備点検 | 西部防災 | 鹿児島",
  description:
    "自動火災報知設備・スプリンクラー・消火器などの消防用設備点検。消防法に基づく機器点検・総合点検を有資格者が確実に実施します。",
};

const inspectionTypes = [
  {
    title: "自動火災報知設備",
    desc: "感知器・受信機などの作動を確認し、火災の早期発見体制を維持します。",
  },
  {
    title: "スプリンクラー設備",
    desc: "放水・配管・ポンプの状態を点検し、初期消火能力を確保します。",
  },
  {
    title: "消火器・屋内消火栓",
    desc: "設置状況・圧力・使用期限を確認し、いざという時に備えます。",
  },
  {
    title: "避難設備・誘導灯",
    desc: "避難経路・誘導灯の点灯状態を確認し、安全な避難を支えます。",
  },
];

export default function FireEquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fire Equipment"
        title="消防用設備点検"
        description={
          "消防法に基づき、機器点検（6か月ごと）と総合点検（1年ごと）を実施します。\n有資格者が確実に点検し、消防署への報告までサポートします。"
        }
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-[family-name:var(--font-serif)] text-2xl font-bold text-slate-900 sm:text-3xl">
            主な点検対象設備
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {inspectionTypes.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-lg font-bold text-slate-900">法的根拠（仮案）</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              消防法第17条の3の3に基づき、防火対象物の関係者は消防用設備等を
              定期的に点検し、その結果を消防長または消防署長に報告することが
              義務付けられています。点検は資格を持つ者が行う必要があります。
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
