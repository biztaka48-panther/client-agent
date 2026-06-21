import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { services } from "@/data/site";
import { btnDark, btnPrimary, btnSecondary, linkInline } from "@/lib/ui";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) return { title: "Not found" };
  return { title: s.title };
}

export default function ServiceDetailPage({ params }: Props) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) notFound();

  return (
    <main id="main">
      <PageIntro title={s.title} description={s.summary} />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="max-w-3xl text-ink">
          <h2 className="text-lg font-bold text-brand">提供イメージ（仮案）</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed md:text-base">
            {s.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            旧サイトの該当カテゴリ本文・画像・PDF を本セクションへ段階的に移行してください。URL対応は{" "}
            <Link href="/migration" className={linkInline}>
              移行マップ
            </Link>
            に追記すると安全です。
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/services" className={`${btnSecondary} text-sm`}>
            ← 事業内容一覧
          </Link>
          <Link href="/contact" className={btnPrimary}>
            この業務で相談する
          </Link>
          <Link href="/recruit" className={btnDark}>
            警備の仕事に興味がある方
          </Link>
        </div>
      </div>
    </main>
  );
}
