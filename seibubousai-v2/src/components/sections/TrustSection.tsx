"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { qualifications } from "@/data/company";

const badges = qualifications;

const points = [
  {
    icon: "🛡️",
    title: "確かな有資格者体制",
    desc: "国家資格を持つスタッフが、法令に基づいた点検・調査を確実に行います。",
  },
  {
    icon: "📍",
    title: "鹿児島に根ざした対応力",
    desc: "地域密着だからこそ可能な、スピーディーで柔軟なサポート体制です。",
  },
  {
    icon: "🤝",
    title: "報告書作成までワンストップ",
    desc: "点検から行政への提出書類サポートまで、一貫して対応いたします。",
  },
];

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, #E67E22 0%, transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.2em] text-red-600">
            Why Us
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-bold text-slate-900 sm:text-4xl">
            なぜ西部防災か
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="text-4xl" aria-hidden="true">
                {p.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {badges.map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
