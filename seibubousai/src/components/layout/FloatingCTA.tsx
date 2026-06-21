"use client";

import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function FloatingCTA() {
  const lineUrl =
    process.env.NEXT_PUBLIC_LINE_URL ?? "https://line.me/R/ti/p/@XXXXXXX";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="grid grid-cols-3 h-16 shadow-2xl">
        <a
          href="tel:048XXXXXXX"
          className="flex flex-col items-center justify-center bg-brand-red-dark text-white gap-0.5 hover:bg-brand-red transition-colors"
        >
          <Phone size={20} />
          <span className="text-xs font-bold">電話する</span>
        </a>
        <Link
          href="/contact/"
          className="flex flex-col items-center justify-center bg-brand-navy text-white gap-0.5 hover:bg-brand-navy-dark transition-colors"
        >
          <Mail size={20} />
          <span className="text-xs font-bold">メール</span>
        </Link>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-green-500 text-white gap-0.5 hover:bg-green-600 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-xs font-bold">LINE相談</span>
        </a>
      </div>
    </div>
  );
}
