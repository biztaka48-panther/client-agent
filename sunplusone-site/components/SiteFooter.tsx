import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { companyLinks, navPrimary, siteMeta } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="rounded-lg bg-white p-2 ring-2 ring-gold/50 w-fit">
            <BrandLogo className="h-8 w-auto max-w-[200px]" />
          </div>
          <p className="mt-4 text-lg font-semibold">{siteMeta.name}</p>
          <p className="mt-2 text-sm text-white/80">{siteMeta.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {siteMeta.address.postal}
            <br />
            {siteMeta.address.lines.join(" ")}
          </p>
          <p className="mt-3 text-sm">
            TEL:{" "}
            <a
              className="cursor-pointer underline decoration-white/40 transition hover:text-gold hover:decoration-gold"
              href={`tel:${siteMeta.tel}`}
            >
              {siteMeta.tel}
            </a>
            <span className="mx-2 text-white/40">/</span>
            FAX: {siteMeta.fax}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold-soft">サイトマップ</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {navPrimary.map((n) => (
              <li key={n.href}>
                <Link className="cursor-pointer transition hover:text-gold" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold-soft">会社案内リンク</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {companyLinks.map((c) => (
              <li key={c.href}>
                <Link className="cursor-pointer transition hover:text-gold" href={c.href}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 md:px-6">
        <p>{siteMeta.copyright}</p>
        <p className="mt-2 max-w-3xl mx-auto leading-relaxed">
          本パッケージは公開情報をもとにしたリニューアル提案・デモです。掲載内容の最終確定・法令表記は貴社側のご確認をお願いします。{" "}
          <Link className="underline decoration-white/40 hover:decoration-white" href="/migration">
            旧URL→新パス移行マップ
          </Link>
        </p>
      </div>
    </footer>
  );
}
