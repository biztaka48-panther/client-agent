import Image from "next/image";
import { demoPhotos } from "@/data/demoPhotos";

type Props = {
  title?: string;
  /** 一覧の何枚目から表示するか（ホームと採用で差し替え） */
  offset?: number;
  limit?: number;
};

export function PhotoGallery({ title = "フォトギャラリー（デモ）", offset = 0, limit }: Props) {
  const list = typeof limit === "number" ? demoPhotos.slice(offset, offset + limit) : demoPhotos.slice(offset);

  return (
    <section className="border-y border-brand/10 bg-gradient-to-b from-card to-surface py-14" aria-label={title}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand md:text-3xl">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">
              掲載は Unsplash のストックです。本番公開前に、自社撮影・被写体許諾済みの写真へ差し替えるのが安全です。
            </p>
          </div>
          <p className="text-xs font-semibold text-gold-hover">紺 × 黄のツートンに合わせた余白とコントラスト</p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <figure
              key={p.src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand/5 shadow-md ring-2 ring-brand/10"
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand/90 to-transparent px-3 py-3 text-xs leading-snug text-white">
                {p.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
