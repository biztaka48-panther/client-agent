import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const serviceLinks = [
  { label: "消防設備点検", href: "/services/" },
  { label: "建築設備点検", href: "/services/" },
  { label: "防火設備点検", href: "/services/" },
  { label: "非常用発電機負荷試験", href: "/services/" },
  { label: "消防設備工事", href: "/services/" },
  { label: "防災用品販売", href: "/services/" },
];

const companyLinks = [
  { label: "会社概要", href: "/about/" },
  { label: "施工事例", href: "/works/" },
  { label: "新着情報", href: "/news/" },
  { label: "採用情報", href: "/recruit/" },
  { label: "プライバシーポリシー", href: "/privacy/" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 会社情報 */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-brand-red font-black text-2xl">西部防災</span>
              <span className="text-white font-semibold text-sm ml-1">株式会社</span>
            </div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-red" />
                <span>埼玉県さいたま市○○区○○ X-XX-XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-brand-red" />
                <a href="tel:048XXXXXXX" className="hover:text-white transition-colors">
                  048-XXX-XXXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-brand-red" />
                <a
                  href="mailto:info@seibubousai.com"
                  className="hover:text-white transition-colors"
                >
                  info@seibubousai.com
                </a>
              </li>
            </ul>
          </div>

          {/* サービス */}
          <div>
            <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-brand-red">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-brand-red">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* お問い合わせCTA */}
          <div>
            <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-brand-red">
              Contact
            </h3>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              消防設備点検・工事のご相談はお気軽にお問い合わせください。
            </p>
            <Link
              href="/contact/"
              className="block text-center bg-brand-red text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-brand-red-dark transition-colors mb-3"
            >
              お問い合わせ
            </Link>
            <a
              href="tel:048XXXXXXX"
              className="block text-center bg-white/10 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-white/20 transition-colors"
            >
              048-XXX-XXXX
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/40">
          © {new Date().getFullYear()} 西部防災株式会社 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
