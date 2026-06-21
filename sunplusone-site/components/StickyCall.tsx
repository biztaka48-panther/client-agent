"use client";

import { Briefcase, Phone } from "lucide-react";
import Link from "next/link";
import { siteMeta } from "@/data/site";

export function StickyCall() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold-hover/50 bg-ink text-white md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/15">
        <a
          href={`tel:${siteMeta.tel}`}
          className="flex cursor-pointer flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold transition hover:bg-gold hover:text-ink sm:flex-row sm:gap-1 sm:text-xs"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          電話
        </a>
        <Link
          href="/recruit"
          className="flex cursor-pointer flex-col items-center justify-center gap-0.5 bg-gold py-2.5 text-[11px] font-bold text-ink transition hover:bg-gold-hover sm:flex-row sm:gap-1 sm:text-xs"
        >
          <Briefcase className="h-4 w-4 shrink-0" aria-hidden />
          採用
        </Link>
        <Link
          href="/contact"
          className="flex cursor-pointer flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold transition hover:bg-gold hover:text-ink sm:flex-row sm:gap-1 sm:text-xs"
        >
          依頼
        </Link>
      </div>
    </div>
  );
}
