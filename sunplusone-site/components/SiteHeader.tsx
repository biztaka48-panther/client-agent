"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { useEffect, useState } from "react";
import { navMenu, type NavMenuEntry } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function navItemIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavHref({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (href.startsWith("tel:")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function SiteSearchTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("sunplusone:open-site-search"))}
      aria-label="サイト内検索を開く"
    >
      <Search className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
      <span className="text-sm text-ink-muted">サイト内検索</span>
    </button>
  );
}

function DesktopNavItem({ item, pathname }: { item: NavMenuEntry; pathname: string }) {
  const active = navItemIsActive(pathname, item.href);
  const hasChildren = item.children && item.children.length > 0;

  const triggerClass = [
    "relative flex items-center gap-1 rounded-t-lg px-3 py-2.5 text-sm font-bold transition",
    active ? "text-brand" : "text-ink/90 hover:bg-gold-soft/80 hover:text-brand",
  ].join(" ");

  const inner = (
    <>
      {active && (
        <span
          className="pointer-events-none absolute left-2 right-2 top-0 h-1 rounded-b-md bg-gold"
          aria-hidden
        />
      )}
      <span className="relative z-[1]">{item.label}</span>
      {hasChildren && (
        <ChevronDown className="relative z-[1] h-3.5 w-3.5 opacity-60 transition group-hover:rotate-180" aria-hidden />
      )}
    </>
  );

  if (!hasChildren) {
    return (
      <div className="group/nav flex flex-col items-center">
        <NavHref href={item.href} className={triggerClass}>
          {inner}
        </NavHref>
        <span
          className="mt-0.5 h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-gold"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="nav-item group relative flex flex-col items-center">
      <NavHref href={item.href} className={`group/nav ${triggerClass}`}>
        {inner}
      </NavHref>
      <span
        className="mt-0.5 h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-gold"
        aria-hidden
      />
      <div
        className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[min(100vw-2rem,22rem)] -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
        role="region"
        aria-label={`${item.label}の下層メニュー`}
      >
        <div className="max-h-[70vh] overflow-auto rounded-2xl border border-line bg-card py-2 shadow-xl ring-1 ring-gold/20">
          {item.children!.map((c) => (
            <NavHref
              key={c.href + c.label}
              href={c.href}
              className="block cursor-pointer border-b border-line/80 px-4 py-3 text-sm transition last:border-b-0 hover:bg-gold-soft"
            >
              <span className="font-semibold text-ink">{c.label}</span>
              {c.description && (
                <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{c.description}</span>
              )}
            </NavHref>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavBlock({
  item,
  reduced,
  index,
  pathname,
  onNavigate,
}: {
  item: NavMenuEntry;
  reduced: boolean;
  pathname: string;
  index: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const active = navItemIsActive(pathname, item.href);

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`rounded-xl border bg-surface/80 ${active ? "border-gold ring-1 ring-gold/40" : "border-line/80"}`}
    >
      <div className="flex items-stretch">
        <NavHref
          href={item.href}
          className="min-w-0 flex-1 cursor-pointer px-3 py-3 text-base font-semibold text-ink hover:bg-gold-soft/70"
          onClick={onNavigate}
        >
          {item.label}
        </NavHref>
        {hasChildren && (
          <button
            type="button"
            className="flex w-12 shrink-0 cursor-pointer items-center justify-center border-l border-line/80 text-ink-muted hover:bg-gold-soft/70"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            aria-label={`${item.label}の下層を開閉`}
          >
            <ChevronDown className={`h-5 w-5 transition ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <ul className="border-t border-line/80 bg-card px-2 py-2">
          {item.children!.map((c) => (
            <li key={c.href + c.label}>
              <NavHref
                href={c.href}
                className="block cursor-pointer rounded-lg px-3 py-2.5 text-sm hover:bg-gold-soft"
                onClick={onNavigate}
              >
                <span className="font-medium text-ink">{c.label}</span>
                {c.description && (
                  <span className="mt-0.5 block text-xs text-ink-muted">{c.description}</span>
                )}
              </NavHref>
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={reduced ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "border-gold/25 bg-card/98 shadow-sm backdrop-blur-md" : "border-brand/10 bg-card/95 backdrop-blur"
      }`}
    >
      {/* 上段：ロゴ ＋ サイト内検索（現行HP相当） */}
      <div className="border-b border-brand/10 bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 cursor-pointer items-center gap-2 rounded-xl font-semibold text-ink outline-none ring-gold/40 transition hover:opacity-95 focus-visible:ring-2"
          >
            <span className="rounded-lg bg-white p-1 shadow-sm ring-2 ring-gold/70">
              <BrandLogo className="h-7 w-auto max-w-[120px] sm:max-w-[180px] sm:h-9 md:h-10" />
            </span>
          </Link>
          <SiteSearchTrigger className="hidden cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 shadow-inner transition hover:border-gold hover:bg-gold-soft/50 md:flex lg:min-w-[220px] lg:px-4" />
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-line bg-surface p-2 text-ink hover:border-gold"
              onClick={() => window.dispatchEvent(new Event("sunplusone:open-site-search"))}
              aria-label="サイト内検索"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-ink ring-gold/30 hover:bg-gold-soft focus-visible:ring-2"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">メニュー</span>
            </button>
          </div>
        </div>
      </div>

      {/* 下段：グローバルナビ（ホーム〜会社案内） */}
      <div className="hidden border-b border-gold/25 bg-gradient-to-b from-card to-surface/90 lg:block">
        <nav
          className="mx-auto flex max-w-6xl flex-wrap items-end justify-center gap-x-0.5 gap-y-1 px-2 py-1"
          aria-label="メイン"
        >
          {navMenu.map((item) => (
            <DesktopNavItem key={item.href + item.label} item={item} pathname={pathname} />
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-line bg-card lg:hidden"
          >
            <ul className="flex max-h-[75vh] flex-col gap-2 overflow-auto px-3 py-3">
              {navMenu.map((item, i) => (
                <MobileNavBlock
                  key={item.href + item.label}
                  item={item}
                  reduced={reduced}
                  index={i}
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                />
              ))}
              <li className="rounded-xl border border-gold/40 bg-gold/15 p-3 text-center text-sm font-semibold text-brand">
                <Link href="/contact" className="underline decoration-gold/60" onClick={() => setOpen(false)}>
                  お問い合わせ・ご依頼はこちら
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
