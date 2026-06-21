"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "業務内容", href: "/business" },
  { label: "消防設備点検", href: "/fire-equipment" },
  { label: "建築物定期調査", href: "/building-inspection" },
  { label: "会社案内", href: "/company" },
  { label: "お知らせ", href: "/news" },
];

const TEL = "099-214-2701";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 白背景（スクロール後 or メニュー展開時）か、透明（ヒーロー上）か
  const light = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        light
          ? "bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white p-1 shadow-sm ring-1 ring-slate-200 lg:h-11 lg:w-11">
              <Image
                src="/images/logo.png"
                alt="株式会社 西部防災 ロゴ"
                width={44}
                height={44}
                className="h-full w-auto object-contain"
                priority
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span
                className={`text-lg lg:text-xl font-bold tracking-tight font-[family-name:var(--font-serif)] transition-colors ${
                  light ? "text-slate-900" : "text-white"
                }`}
              >
                株式会社 西部防災
              </span>
              <span
                className={`hidden text-[10px] tracking-widest sm:block transition-colors ${
                  light ? "text-slate-500" : "text-slate-300"
                }`}
              >
                SEIBU BOUSAI
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  light
                    ? "text-slate-600 hover:text-red-600"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${TEL}`}
              className={`hidden sm:flex items-center gap-2 font-semibold transition-colors ${
                light ? "text-slate-900" : "text-white"
              }`}
            >
              <span className="text-red-600">📞</span>
              <span className="tracking-wide">{TEL}</span>
            </a>

            <button
              type="button"
              aria-label="メニューを開く"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2"
            >
              <span
                className={`block w-6 h-0.5 mb-1.5 transition-colors ${
                  light ? "bg-slate-900" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 mb-1.5 transition-colors ${
                  light ? "bg-slate-900" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-colors ${
                  light ? "bg-slate-900" : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-slate-700 hover:text-red-600 border-b border-slate-100"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${TEL}`}
            className="block py-3 text-red-600 font-semibold"
          >
            📞 {TEL}
          </a>
        </nav>
      )}
    </header>
  );
}
