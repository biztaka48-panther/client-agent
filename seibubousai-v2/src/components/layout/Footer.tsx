import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "業務内容", href: "/business" },
  { label: "消防用設備点検", href: "/fire-equipment" },
  { label: "建築物定期調査", href: "/building-inspection" },
  { label: "一般向け", href: "/general" },
  { label: "会社案内", href: "/company" },
  { label: "お知らせ", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0E14] border-t border-white/5 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white p-1">
                <Image
                  src="/images/logo.png"
                  alt="株式会社 西部防災 ロゴ"
                  width={44}
                  height={44}
                  className="h-full w-auto object-contain"
                />
              </span>
              <p className="text-xl font-bold text-white">株式会社 西部防災</p>
            </div>
            <p className="text-sm leading-relaxed">
              〒890-0054
              <br />
              鹿児島県鹿児島市荒田二丁目63番19号
              <br />
              TEL：099-214-2701
              <br />
              FAX：099-214-2702
              <br />
              MAIL：seibu.bousai@san.bbiq.jp
            </p>
            <p className="text-sm mt-3 text-slate-500">
              消防用設備保守点検・防火対象物点検・
              <br />
              建築設備定期点検・防災設備工事
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4">サイトマップ</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4">お問い合わせ</p>
            <a
              href="tel:099-214-2701"
              className="block text-lg font-bold text-white mb-2"
            >
              📞 099-214-2701
            </a>
            <Link
              href="/contact"
              className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm transition-colors"
            >
              無料相談はこちら
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} 株式会社 西部防災 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
