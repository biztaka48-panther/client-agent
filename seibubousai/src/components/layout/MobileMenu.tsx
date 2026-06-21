"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const navItems = [
  { label: "トップ", href: "/" },
  { label: "サービス", href: "/services/" },
  { label: "施工事例", href: "/works/" },
  { label: "新着情報", href: "/news/" },
  { label: "会社概要", href: "/about/" },
  { label: "採用情報", href: "/recruit/" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl md:hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="font-bold text-brand-navy text-lg">メニュー</span>
              <button
                onClick={onClose}
                aria-label="メニューを閉じる"
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X size={22} className="text-gray-700" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block px-6 py-4 text-gray-700 font-medium border-b border-gray-50 hover:bg-brand-red-light hover:text-brand-red transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-6">
              <Link
                href="/contact/"
                onClick={onClose}
                className="block w-full text-center bg-brand-red text-white font-bold py-3 rounded-md hover:bg-brand-red-dark transition-colors"
              >
                お問い合わせ
              </Link>
              <a
                href="tel:048XXXXXXX"
                className="block w-full text-center mt-3 bg-brand-navy text-white font-bold py-3 rounded-md hover:bg-brand-navy-dark transition-colors"
              >
                048-XXX-XXXX
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
