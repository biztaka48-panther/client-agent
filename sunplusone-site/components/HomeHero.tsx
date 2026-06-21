import Image from "next/image";
import Link from "next/link";
import { demoPhotos } from "@/data/demoPhotos";
import { heroCopy, siteMeta } from "@/data/site";
import { BrandLogo } from "@/components/BrandLogo";
import { btnDark, btnPrimary, btnSecondary } from "@/lib/ui";

const thumbs = demoPhotos.slice(0, 4);

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b-4 border-gold shadow-sm" aria-label="メインビジュアル">
      <div className="grid min-h-[300px] lg:min-h-[380px] lg:grid-cols-2">
        <div className="relative flex flex-col justify-center bg-brand px-6 py-10 text-white lg:px-12">
          <div className="absolute inset-y-6 right-0 hidden w-1 rounded-full bg-gold/90 lg:block" aria-hidden />
          <div className="w-fit max-w-full rounded-xl bg-white p-3 shadow-xl ring-2 ring-gold">
            <BrandLogo priority className="h-12 w-auto max-w-[min(100%,260px)] md:h-16" />
          </div>
          <p className="mt-6 text-sm font-bold tracking-wide text-gold">{siteMeta.tagline}</p>
          <h2 className="mt-2 text-2xl font-bold leading-snug md:text-4xl">{heroCopy.title}</h2>
          <p className="mt-2 text-base font-semibold text-gold-soft md:text-xl">{heroCopy.subtitle}</p>
        </div>

        <div className="relative flex flex-col justify-center bg-gold px-6 py-10 text-brand lg:px-12">
          <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-ink md:text-base">{heroCopy.lead}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink/80">{heroCopy.sourceNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className={btnPrimary}>
              ご依頼・お問い合わせ
            </Link>
            <Link href="/services" className={btnSecondary}>
              事業内容
            </Link>
            <Link href="/recruit" className={btnDark}>
              採用情報
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {thumbs.map((p) => (
              <figure
                key={p.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl ring-2 ring-brand/20 shadow-md"
              >
                <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
              </figure>
            ))}
          </div>
          <p className="mt-3 text-[10px] leading-snug text-ink/70">
            上段4枚はデモ用ストック写真です。本番は許諾済みの現場・職場写真へ差し替えてください。
          </p>
        </div>
      </div>
    </section>
  );
}
