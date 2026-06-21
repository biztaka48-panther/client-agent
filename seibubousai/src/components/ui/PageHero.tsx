import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-brand-navy py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{title}</h1>
        {subtitle && (
          <p className="text-white/70 text-sm md:text-base mb-4">{subtitle}</p>
        )}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="パンくずリスト">
            <ol className="flex items-center gap-1 flex-wrap">
              <li>
                <Link href="/" className="text-white/50 text-sm hover:text-white transition-colors">
                  トップ
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1">
                  <ChevronRight size={14} className="text-white/30" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80 text-sm">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
