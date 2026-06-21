"use client";

import { motion } from "framer-motion";
import LavaCanvas from "@/components/ui/LavaCanvas";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const hero = {
  eyebrow: "鹿児島の安心を、守り続けて",
  headline: "消防・防災の\nプロフェッショナル",
  subheadline: "建築物の安全を守る総合防災サービス",
  description:
    "消防用設備の設置から点検・メンテナンス、建築物定期調査まで。\n鹿児島の企業・施設を、法令遵守とともに守ります。",
  cta1: { label: "無料相談はこちら", href: "/contact" },
  cta2: { label: "サービス一覧を見る", href: "/business" },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <LavaCanvas />

      <div className="absolute inset-0 z-[1] bg-black/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#0A0E14] to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-[2] mx-auto max-w-4xl px-4 py-24 text-center"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-medium tracking-widest text-red-400 sm:text-base"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="whitespace-pre-line font-[family-name:var(--font-serif)] text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg font-medium text-slate-200 sm:text-xl"
        >
          {hero.subheadline}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-slate-400 sm:text-base"
        >
          {hero.description}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="primary" size="lg" glow href={hero.cta1.href}>
            {hero.cta1.label}
          </Button>
          <Button variant="outline" size="lg" href={hero.cta2.href}>
            {hero.cta2.label}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl text-white/70"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
