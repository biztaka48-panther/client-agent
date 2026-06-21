import { anniversary, siteMeta } from "@/data/site";

export function AnniversaryBand() {
  return (
    <section className="border-t-4 border-gold bg-gradient-to-r from-brand via-brand to-brand-light text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-gold/25 px-3 py-1 text-xs font-semibold tracking-wide text-gold-soft ring-1 ring-gold/50">
            {anniversary.badge}
          </p>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">{anniversary.headline}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90">{anniversary.body}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/95 ring-1 ring-white/20 md:max-w-sm">
          <p className="font-semibold text-gold-soft">{siteMeta.nameShort} 公式</p>
          <p className="mt-2 text-xs text-white/80">{anniversary.officialNote}</p>
          <a
            className="mt-3 inline-block cursor-pointer text-sm font-medium text-gold-soft underline decoration-white/30 underline-offset-2 transition hover:decoration-white"
            href={siteMeta.canonicalOrigin}
            target="_blank"
            rel="noreferrer"
          >
            現行サイトを開く
          </a>
        </div>
      </div>
    </section>
  );
}
