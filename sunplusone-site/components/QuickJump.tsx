"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { quickJumpEntries } from "@/data/site";

export function QuickJump() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [...quickJumpEntries];
    return quickJumpEntries.filter((e) => e.title.toLowerCase().includes(s) || e.group.toLowerCase().includes(s));
  }, [q]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("sunplusone:open-site-search", onOpen);
    return () => window.removeEventListener("sunplusone:open-site-search", onOpen);
  }, []);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px)+0.75rem)] left-3 z-50 flex max-w-[calc(100vw-1.5rem)] cursor-pointer items-center gap-2 rounded-full border-2 border-gold/40 bg-card/95 px-3 py-2 text-sm font-semibold text-ink shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold-soft sm:left-4 md:bottom-8 md:left-6 md:max-w-none md:px-4"
        aria-haspopup="dialog"
      >
        <Search className="h-4 w-4" aria-hidden />
        クイック検索
        <kbd className="hidden rounded border border-line bg-surface px-1.5 py-0.5 text-[10px] text-ink-muted sm:inline">
          Ctrl+K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/50 p-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="サイト内クイック検索"
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                <Search className="h-4 w-4 text-ink-muted" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="ページ名で絞り込み…"
                  className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm outline-none"
                />
                <button
                  type="button"
                  className="rounded-lg p-2 text-ink-muted hover:bg-surface"
                  onClick={() => setOpen(false)}
                  aria-label="閉じる"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="max-h-[50vh] overflow-auto py-2 text-sm">
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center text-ink-muted">該当なし</li>
                )}
                {filtered.map((item) => (
                  <li key={`${item.group}-${item.title}`}>
                    {item.href.startsWith("tel:") ? (
                      <a
                        href={item.href}
                        className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-gold-soft"
                        onClick={() => setOpen(false)}
                      >
                        <span className="font-medium text-ink">{item.title}</span>
                        <span className="shrink-0 text-xs text-ink-muted">{item.group}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-gold-soft"
                        onClick={() => setOpen(false)}
                      >
                        <span className="font-medium text-ink">{item.title}</span>
                        <span className="shrink-0 text-xs text-ink-muted">{item.group}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <p className="border-t border-line px-4 py-2 text-xs text-ink-muted">
                ショートカット: Windows は Ctrl+K、Mac は ⌘+K
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
