"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TEL = "099-214-2701";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* PC: 右下固定 縦並び */}
      <div
        className={`hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-3 transition-all duration-300 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <a
          href={`tel:${TEL}`}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 text-white font-semibold shadow-[0_0_20px_rgba(192,57,43,0.6)] hover:shadow-[0_0_35px_rgba(192,57,43,0.9)] hover:-translate-y-1 transition-all duration-200 animate-pulse"
        >
          <span>📞</span>
          <span>電話する</span>
        </a>
        <Link
          href="/contact"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-red-700 font-semibold border border-red-200 shadow-lg hover:-translate-y-1 hover:border-red-400 transition-all duration-200"
        >
          <span>✉</span>
          <span>無料相談</span>
        </Link>
      </div>

      {/* SP: 画面下部フルワイド 横並び */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 gap-px bg-white/10 transition-all duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={`tel:${TEL}`}
          className="flex items-center justify-center gap-2 py-4 bg-red-600 text-white font-semibold"
        >
          📞 電話
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 py-4 bg-white text-red-700 font-semibold"
        >
          ✉ 相談
        </Link>
      </div>
    </>
  );
}
