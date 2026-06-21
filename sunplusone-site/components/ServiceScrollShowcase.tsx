import Image from "next/image";
import Link from "next/link";
import { demoPhotos } from "@/data/demoPhotos";
import { services } from "@/data/site";

/**
 * 旧HPの「横スライド＋業務説明」とは別体験：
 * 横スクロール＋スナップで止まる“フィルムストリップ”型（カルーセル矢印・自動送りなし）
 */
export function ServiceScrollShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand via-brand to-ink py-14 text-white md:py-20" aria-labelledby="svc-showcase-title">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p id="svc-showcase-title" className="text-xs font-bold tracking-[0.25em] text-gold">
              BUSINESS LINEUP
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight md:text-4xl">業務内容を、場面でつかむ</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
              写真と短文を<strong className="text-gold">横へスワイプ</strong>（トラックパッドの横スクロール可）してご覧ください。
              旧サイトの自動スライドとは違い、閲覧のペースは訪問者に任せる構成です（スナップで止まります）。
            </p>
          </div>
          <p className="shrink-0 rounded-full border border-gold/40 bg-white/10 px-4 py-2 text-xs font-semibold text-gold-soft backdrop-blur-sm">
            ← 横スクロールで次の業務へ →
          </p>
        </div>
      </div>

      <div
        className="relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-4 pt-2 touch-pan-x [scrollbar-width:thin] [scrollbar-color:rgba(255,215,0,0.5)_transparent] md:gap-6 md:px-8 lg:px-[max(1rem,calc((100vw-72rem)/2+1rem))]"
        tabIndex={0}
        role="region"
        aria-roledescription="横スクロールの業務紹介"
      >
        {services.map((s, i) => {
          const photo = demoPhotos[i % demoPhotos.length];
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="relative h-[min(52vh,380px)] w-[min(86vw,420px)] shrink-0 snap-center overflow-hidden rounded-[2.2rem] shadow-2xl ring-2 ring-gold/35 transition duration-300 hover:-translate-y-1 hover:ring-gold hover:shadow-[0_20px_60px_rgba(0,64,152,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Image src={photo.src} alt="" fill className="object-cover" sizes="(max-width:768px) 86vw, 420px" aria-hidden />
              <span className="sr-only">{photo.alt}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-brand/20" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold">SERVICE {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-xl font-bold leading-snug md:text-2xl">{s.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/85">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-gold">
                  詳しく見る
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          );
        })}
        <div className="w-4 shrink-0 snap-none md:w-8" aria-hidden />
      </div>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 text-center md:px-6">
        <Link
          href="/services"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gold/50 bg-white/10 px-5 py-2.5 text-sm font-bold text-gold-soft backdrop-blur-sm transition hover:bg-gold hover:text-ink"
        >
          事業内容一覧ページへ
        </Link>
      </div>
    </section>
  );
}
