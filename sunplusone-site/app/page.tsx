"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnniversaryBand } from "@/components/AnniversaryBand";
import { HomeHero } from "@/components/HomeHero";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RecruitAlertBar } from "@/components/RecruitAlertBar";
import { ServiceScrollShowcase } from "@/components/ServiceScrollShowcase";
import { newsItems, recruitPitch, recruitTeaser, siteMeta } from "@/data/site";
import { btnDark, btnPrimary, btnSecondary } from "@/lib/ui";

export default function HomePage() {
  return (
    <>
      <AnniversaryBand />
      <RecruitAlertBar />
      <main id="main">
        <HomeHero />
        <ServiceScrollShowcase />
        <PhotoGallery />
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border-2 border-brand/15 bg-card p-6 shadow-sm ring-1 ring-gold/25"
            >
              <h2 className="text-lg font-bold text-brand">新着情報</h2>
              <ul className="mt-4 divide-y divide-line text-sm">
                {newsItems.slice(0, 5).map((n) => (
                  <li key={n.id} className="flex gap-3 py-3 first:pt-0">
                    <time className="w-28 shrink-0 text-ink-muted">{n.date}</time>
                    <span className="font-medium text-ink">
                      {n.title}
                      {n.kind === "blog" && (
                        <span className="ml-2 rounded bg-gold-soft px-1.5 py-0.5 text-[10px] text-ink-muted">blog</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink-muted">
                個別記事URLの移行は旧CMS構造に合わせて{" "}
                <Link
                  className="cursor-pointer font-semibold text-brand underline decoration-gold/60 hover:decoration-gold"
                  href="/migration"
                >
                  移行マップ
                </Link>{" "}
                を参照してください。
              </p>
              <Link
                href="/news"
                className="mt-4 inline-flex cursor-pointer text-sm font-bold text-brand underline decoration-gold/50 underline-offset-2 transition hover:decoration-gold"
              >
                お知らせ一覧へ
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-brand/15 py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,215,0,0.2)_0%,transparent_45%,rgba(0,64,152,0.08)_100%)]" aria-hidden />
          <div className="pointer-events-none absolute -right-16 top-8 h-48 w-48 rounded-full bg-gold/30 blur-2xl" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-bold text-brand">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                  </span>
                  {recruitPitch.badge}
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{recruitTeaser.heading}</h2>
                <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink-muted md:text-lg">{recruitTeaser.body}</p>
                <p className="mt-2 text-xs text-ink-muted">{recruitTeaser.sourceNote}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-1">
                  {recruitPitch.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 rounded-2xl border border-gold/35 bg-card/90 px-4 py-3 text-sm font-semibold text-ink shadow-sm backdrop-blur-sm"
                    >
                      <span className="text-gold-hover" aria-hidden>
                        ✓
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-ink-muted">{recruitPitch.disclaimer}</p>
              </div>
              <div className="flex w-full max-w-md flex-col gap-4 lg:max-w-sm">
                <div className="rounded-[1.75rem] border-2 border-dashed border-brand/25 bg-gradient-to-b from-gold-soft/80 to-card p-6 shadow-inner">
                  <p className="text-center text-xs font-bold text-brand">まずはここから</p>
                  <Link href="/recruit#flow" className={`${btnPrimary} mt-4 w-full justify-center text-base`}>
                    採用の流れを見る
                  </Link>
                  <a href={`tel:${siteMeta.tel}`} className={`${btnSecondary} mt-3 w-full justify-center`}>
                    電話で相談（{siteMeta.tel}）
                  </a>
                  <Link href="/recruit" className={`${btnDark} mt-3 w-full justify-center`}>
                    採用情報トップへ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
