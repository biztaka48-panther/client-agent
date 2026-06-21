import Link from "next/link";
import { Phone } from "lucide-react";
import { recruitPitch, siteMeta } from "@/data/site";

const btnBase =
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:text-sm";

export function RecruitAlertBar() {
  return (
    <aside className="border-b border-gold-hover/40 bg-gradient-to-r from-gold via-gold-soft to-gold shadow-inner">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:px-6">
        <div>
          <p className="inline-flex rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-bold text-ink">{recruitPitch.badge}</p>
          <p className="mt-1 text-sm font-bold text-ink sm:text-base">{recruitPitch.sub}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink/80">{recruitPitch.disclaimer}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <a
            href={`tel:${siteMeta.tel}`}
            className={`${btnBase} bg-card text-ink ring-1 ring-gold-hover/40 hover:bg-gold-soft`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            電話で相談（{siteMeta.tel}）
          </a>
          <Link
            href="/recruit#flow"
            className={`${btnBase} bg-ink text-gold-soft ring-1 ring-ink/20 hover:bg-brand hover:text-white`}
          >
            採用の流れを見る
          </Link>
        </div>
      </div>
    </aside>
  );
}
