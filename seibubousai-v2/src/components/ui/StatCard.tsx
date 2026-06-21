"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Stat } from "@/types";

export default function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(stat.number * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.number]);

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white border border-slate-200 hover:border-red-300 px-6 py-8 text-center shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(192,57,43,0.12)]"
    >
      <div className="text-3xl mb-3" aria-hidden="true">
        {stat.icon}
      </div>
      <div className="font-[family-name:var(--font-inter)] text-4xl sm:text-5xl font-extrabold text-slate-900">
        {count}
        <span className="text-red-600">{stat.suffix}</span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
    </div>
  );
}
