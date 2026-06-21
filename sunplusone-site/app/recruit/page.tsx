import Link from "next/link";
import { PhotoGallery } from "@/components/PhotoGallery";
import { recruitFlowSteps, recruitNavLinks, recruitPitch, recruitTeaser, siteMeta } from "@/data/site";
import { btnDark, btnPrimary, btnSecondary } from "@/lib/ui";

const faqItems = [
  {
    q: "未経験でも応募できますか？（仮案）",
    a: "公式サイトでは教育制度や職場体験の記事が掲載されていました。実際の条件は採用担当へご確認ください。",
  },
  {
    q: "勤務地やシフトは選べますか？（仮案）",
    a: "事業所一覧とあわせて、配属・シフトの考え方を文章化すると応募が集まりやすくなります。",
  },
  {
    q: "資格は必要ですか？（仮案）",
    a: "警備業務の種類により必要資格が異なります。募集要項を別ページまたは PDF で整備するのがおすすめです。",
  },
] as const;

const anchorSections = [
  {
    id: "know",
    title: "仕事内容を知る",
    body: "業務紹介・職場の1日・動画など、旧サイトのコンテンツをここへ移行してください。未経験者向けの Q&A も同じブロックにまとめると分かりやすいです。",
  },
  {
    id: "staff",
    title: "スタッフ紹介",
    body: "先輩インタビュー・写真は掲載許諾を確認のうえ配置。スマホではカード横スクロールも検討できます。",
  },
  {
    id: "merit",
    title: "働くメリット",
    body: "待遇・休暇・雰囲気を箇条書き＋写真で見せると離脱が減ります（仮案）。",
  },
  {
    id: "training",
    title: "警備員教育制度",
    body: "研修フロー図・現任教育の記事（公式ブログにあった項目）へのリンクを配置。",
  },
] as const;

export default function RecruitPage() {
  return (
    <main id="main">
      <div className="border-b-2 border-gold/40 bg-gradient-to-r from-gold-soft via-card to-gold-soft/90">
        <div className="mx-auto max-w-6xl px-4 py-10 md:flex md:items-center md:justify-between md:gap-10 md:px-6 md:py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-hover">{recruitPitch.badge}</p>
            <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">採用情報</h1>
            <p className="mt-3 text-sm font-semibold text-brand md:text-base">{recruitPitch.sub}</p>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-muted md:text-base">{recruitTeaser.body}</p>
            <p className="mt-2 text-xs text-ink-muted">{recruitTeaser.sourceNote}</p>
          </div>
          <div className="mt-8 flex w-full shrink-0 flex-col gap-3 md:mt-0 md:max-w-xs">
            <a href={`tel:${siteMeta.tel}`} className={btnPrimary}>
              まずは電話（{siteMeta.tel}）
            </a>
            <Link href="/contact" className={btnSecondary}>
              採用のお問い合わせ（フォーム）
            </Link>
            <Link href="#flow" className={btnDark}>
              採用の流れを見る
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <section className="rounded-2xl border border-gold/35 bg-gold-soft/50 p-6 md:p-8" aria-labelledby="pitch-title">
          <h2 id="pitch-title" className="text-lg font-bold text-brand">
            採用で伝えたいこと（仮案・要社内確認）
          </h2>
          <ul className="mt-4 space-y-2 text-sm font-medium text-ink md:text-base">
            {recruitPitch.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-gold-hover" aria-hidden>
                  ●
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">{recruitPitch.disclaimer}</p>
        </section>

        <section id="flow" className="scroll-mt-32 mt-14">
          <h2 className="text-xl font-bold text-brand">採用の流れ（仮案）</h2>
          <p className="mt-2 text-sm text-ink-muted">実際の手続きに合わせて文言・工程数を差し替えてください。</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recruitFlowSteps.map((st) => (
              <li
                key={st.step}
                className="cursor-default rounded-2xl border border-line bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
              >
                <p className="text-xs font-bold text-gold-hover">{st.step}</p>
                <h3 className="mt-2 text-base font-bold text-ink">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-brand">コンテンツ一覧（旧サイト相当）</h2>
          <p className="mt-2 text-sm text-ink-muted">上段メニュー「採用情報」の下層と同じ項目へすぐ飛べます。</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {recruitNavLinks.map((s) => {
              const anchor = s.href.includes("#") ? s.href.split("#")[1] : "";
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="block h-full cursor-pointer rounded-2xl border border-line bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/55 hover:shadow-md"
                  >
                    <h3 className="text-lg font-bold text-brand">{s.label}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{s.description}</p>
                    {anchor && <p className="mt-3 text-xs font-mono text-ink-muted">#{anchor}</p>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="mt-14 space-y-10">
          {anchorSections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-32 rounded-2xl border border-line bg-card p-6 shadow-sm md:p-8">
              <h2 className="text-lg font-bold text-brand">{sec.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{sec.body}</p>
            </section>
          ))}
        </div>

        <section id="faq" className="scroll-mt-32 mt-14">
          <h2 className="text-xl font-bold text-brand">採用のFAQ（デモ）</h2>
          <div className="mt-6 space-y-3">
            {faqItems.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-line bg-card px-4 py-3 shadow-sm open:border-gold/40 open:bg-gold-soft/30"
              >
                <summary className="cursor-pointer list-none font-semibold text-ink outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex w-full items-center justify-between gap-2">
                    {f.q}
                    <span className="text-gold-hover transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <p className="mt-3 border-t border-line/80 pt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="parttime" className="scroll-mt-32 mt-14 rounded-2xl border-2 border-gold/45 bg-ink p-6 text-white md:p-8">
          <h2 className="text-xl font-bold text-gold-soft">アルバイト・パートのご案内（表記は公式に合わせて）</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            現行メニューに「アルバイト大募集!!」がありました。時給・勤務時間帯・曜日固定など、応募判断に必要な情報は一覧表にすると離脱が減ります（仮案）。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${siteMeta.tel}`} className={btnPrimary}>
              電話で聞く
            </a>
            <Link href="/contact" className={btnSecondary}>
              フォームで問い合わせ
            </Link>
          </div>
        </section>

        <PhotoGallery title="職場・現場のイメージ（デモ）" offset={4} limit={4} />

        <section className="mt-10 rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-lg font-bold text-ink">インスタグラム</h2>
          <p className="mt-2 text-sm text-ink-muted">
            現行フッターにリンクがありました。アカウントURL は貴社確認のうえ `data/site.ts` に定数化し、ここに配置してください（未設定）。
          </p>
          <a
            href={siteMeta.canonicalOrigin}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex cursor-pointer text-sm font-bold text-brand underline decoration-gold/50 underline-offset-2 hover:decoration-gold"
          >
            現行サイトからリンクを確認
          </a>
        </section>
      </div>
    </main>
  );
}
