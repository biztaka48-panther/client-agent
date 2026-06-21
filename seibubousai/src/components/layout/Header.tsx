"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "トップ", href: "/" },
  { label: "サービス", href: "/services/" },
  { label: "施工事例", href: "/works/" },
  { label: "新着情報", href: "/news/" },
  { label: "会社概要", href: "/about/" },
  { label: "採用情報", href: "/recruit/" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 transition-colors duration-300"
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,1)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 2px 12px rgba(0,0,0,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ロゴ */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-brand-red font-black text-xl leading-none">
                西部防災
              </span>
              <span
                className={`font-semibold text-sm leading-none transition-colors duration-300 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                株式会社
              </span>
            </Link>

            {/* PC ナビゲーション */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-brand-red ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* PC 右側：電話 + CTAボタン */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:048XXXXXXX"
                className={`flex items-center gap-1.5 text-sm font-bold transition-colors duration-200 hover:text-brand-red ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                <Phone size={16} />
                048-XXX-XXXX
              </a>
              <Link
                href="/contact/"
                className="bg-brand-red text-white text-sm font-bold px-5 py-2.5 rounded-md hover:bg-brand-red-dark transition-colors"
              >
                お問い合わせ
              </Link>
            </div>

            {/* モバイル ハンバーガー */}
            <button
              className={`md:hidden p-2 rounded-md transition-colors hover:bg-white/20 ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setMenuOpen(true)}
              aria-label="メニューを開く"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
