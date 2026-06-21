"use client";

import { Briefcase, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { siteMeta } from "@/data/site";

/**
 * 旧HPの「左端の黄色い四角タブ」と差別化：
 * 右下に「泡」状のグラス調ボタンを重ね、依頼／採用／電話を分離して目に入るようにする
 */
export function FloatingActionDock() {
  const bubble =
    "flex cursor-pointer items-center justify-center shadow-xl backdrop-blur-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <div
      className="pointer-events-none fixed bottom-0 right-0 z-[45] flex flex-col items-end gap-2.5 p-3 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-4 md:right-5 md:gap-3 md:p-4 md:pb-4"
      aria-label="クイックアクション"
    >
      <div className="pointer-events-auto flex flex-col items-end gap-2.5 md:gap-3">
        <a
          href={`tel:${siteMeta.tel}`}
          className={`${bubble} h-12 w-12 rounded-full border border-white/40 bg-brand/85 text-gold-soft hover:scale-105 hover:bg-brand md:h-14 md:w-14`}
          aria-label={`電話する ${siteMeta.tel}`}
        >
          <Phone className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
        </a>
        <Link
          href="/recruit"
          className={`${bubble} h-14 w-14 rounded-[40%] border-2 border-gold/60 bg-white/25 text-ink hover:scale-105 hover:border-gold hover:bg-gold/90 md:h-16 md:w-16`}
          aria-label="採用情報"
        >
          <Briefcase className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
        </Link>
        <Link
          href="/contact"
          className={`${bubble} group relative min-h-[3.5rem] max-w-[11rem] rounded-[2rem] rounded-br-3xl rounded-tl-3xl border-2 border-gold bg-gradient-to-br from-gold via-gold to-gold-hover px-4 py-3 text-left text-ink shadow-[0_12px_40px_rgba(255,215,0,0.35)] hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(255,215,0,0.45)] md:max-w-[13rem] md:px-5`}
        >
          <span className="flex items-start gap-2">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand md:h-6 md:w-6" aria-hidden />
            <span className="text-[11px] font-extrabold leading-snug md:text-xs">
              警備のご依頼
              <br />
              お問い合わせ
            </span>
          </span>
          <span className="mt-1 block text-[10px] font-bold text-brand/80 group-hover:text-brand">フォームへ →</span>
        </Link>
      </div>
    </div>
  );
}
