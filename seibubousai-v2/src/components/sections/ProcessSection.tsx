"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    no: "01",
    icon: "📞",
    title: "お問い合わせ",
    desc: "電話またはメールフォームにてご連絡ください。内容を確認の上、担当者よりご連絡いたします。",
  },
  {
    no: "02",
    icon: "🔍",
    title: "現地調査・お見積り",
    desc: "施設・設備の状況を確認し、無料でお見積りいたします。",
  },
  {
    no: "03",
    icon: "🛠️",
    title: "点検・工事の実施",
    desc: "法令に基づき、確実・丁寧に対応いたします。",
  },
  {
    no: "04",
    icon: "📄",
    title: "報告書のご提出",
    desc: "点検後は報告書を作成。行政への提出書類もサポートします。",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.2em] text-red-600">
            Flow
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-bold text-slate-900 sm:text-4xl">
            ご依頼の流れ
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.no}
              variants={fadeInUp}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="font-[family-name:var(--font-inter)] text-5xl font-extrabold text-red-200">
                {step.no}
              </span>
              <div className="mt-2 text-3xl" aria-hidden="true">
                {step.icon}
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
