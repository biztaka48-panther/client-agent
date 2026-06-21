"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { Phone, ChevronDown } from "lucide-react";

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 背景：グラデーション（画像未設置のため仮） */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-dark via-brand-navy to-slate-700" />

      {/* 濃紺オーバーレイ */}
      <div className="absolute inset-0 bg-brand-navy/50" />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <motion.span
            custom={0}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="inline-block text-brand-red font-bold text-sm md:text-base mb-4 tracking-wider border border-brand-red px-3 py-1 rounded"
          >
            消防設備点検・防災設備工事のプロフェッショナル
          </motion.span>

          <motion.h1
            custom={1}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            安心と安全を守る、
            <br />
            地域密着の
            <br className="md:hidden" />
            防災パートナー。
          </motion.h1>

          <motion.p
            custom={2}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-white/80 text-base md:text-lg mb-8 leading-relaxed"
          >
            消防設備点検から防災設備工事まで。
            <br />
            建物の安全管理をワンストップでサポートします。
          </motion.p>

          <motion.div
            custom={3}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 bg-brand-red text-white font-bold px-8 py-4 rounded-md text-lg hover:bg-brand-red-dark transition-colors"
            >
              無料相談はこちら
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-md text-lg hover:bg-white hover:text-brand-navy transition-colors"
            >
              お見積り依頼
            </Link>
          </motion.div>

          {/* 電話番号（モバイル） */}
          <motion.div
            custom={4}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 md:hidden"
          >
            <a
              href="tel:048XXXXXXX"
              className="inline-flex items-center gap-2 text-white font-bold text-xl"
            >
              <Phone size={22} className="text-brand-red" />
              048-XXX-XXXX
            </a>
          </motion.div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown
          size={32}
          className="text-white/60 animate-bounce"
        />
      </div>
    </section>
  );
}
