import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { services } from "@/data/site";
import { btnPrimary, btnSecondary, cardInteractive } from "@/lib/ui";

export default function ServicesIndexPage() {
  return (
    <main id="main">
      <PageIntro
        title="事業内容"
        description="公式サイトのメニュー区分に対応する一覧です。各業務の詳細文面・写真は旧下層ページからの転記・再撮影が必要な場合があります。上段メニューの「事業内容」にカーソルを置くと、各詳細へすぐ進めます。"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.slug}>
              <Link href={`/services/${s.slug}`} className={`${cardInteractive} block h-full`}>
                <h2 className="text-xl font-bold text-brand">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <span className="mt-5 inline-block cursor-pointer text-sm font-bold text-brand underline decoration-gold/50 underline-offset-2">
                  詳細ページへ
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border-2 border-gold/35 bg-gold-soft/40 p-6">
          <h2 className="text-lg font-bold text-brand">ご依頼はこちら</h2>
          <p className="mt-2 text-sm text-ink-muted">
            現行サイトの「ご依頼」フォーム相当の導線を、問い合わせページに集約する構成案です。
          </p>
          <Link href="/contact#request" className={`${btnPrimary} mt-4`}>
            お問い合わせフォームへ
          </Link>
          <Link href="/fees" className={`${btnSecondary} mt-3 inline-flex`}>
            警備料金のご案内
          </Link>
        </div>
      </div>
    </main>
  );
}
