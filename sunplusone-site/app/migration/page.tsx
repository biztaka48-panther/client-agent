import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { offices, services, siteMeta } from "@/data/site";

const rows = [
  { old: "（例）/", neu: "/", note: "トップ" },
  { old: "（例）/category/news/", neu: "/news", note: "お知らせ一覧。旧パーマリンクは要調査" },
  { old: "（例）事業内容配下", neu: "/services", note: "各業務は /services/[slug]" },
  { old: "（例）警備料金", neu: "/fees", note: "PDF 直リンクがあれば public/ へ" },
  { old: "（例）採用情報/*", neu: "/recruit#...", note: "下層はセクション化または個別ページ化" },
  { old: "（例）事業所紹介/*", neu: "/offices", note: "各所詳細は /offices/[id] などへ拡張可" },
  { old: "（例）会社案内/*", neu: "/company#...", note: "アンカーは PageIntro 後の各 id" },
  { old: "（例）お問い合わせ", neu: "/contact", note: "フォーム送信先を本番で設定" },
] as const;

export default function MigrationPage() {
  return (
    <main id="main">
      <PageIntro
        title="旧サイト → 新サイト 移行マップ（作業用）"
        description={`旧URL は WordPress 等のスラッグに依存します。本表の「旧」列はプレースホルダです。実移行時に ${siteMeta.canonicalOrigin} から実測して埋めてください。`}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
          <table className="min-w-[640px] w-full border-collapse text-left text-sm">
            <thead className="bg-surface text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium md:px-6">旧URL（仮・要記入）</th>
                <th className="px-4 py-3 font-medium md:px-6">新パス（本プロジェクト）</th>
                <th className="px-4 py-3 font-medium md:px-6">メモ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.neu}>
                  <td className="px-4 py-3 text-ink md:px-6">{r.old}</td>
                  <td className="px-4 py-3 font-mono text-xs text-brand md:px-6">{r.neu}</td>
                  <td className="px-4 py-3 text-ink-muted md:px-6">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-xl font-bold text-brand">事業内容スラッグ対応表</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          {services.map((s) => (
            <li key={s.slug}>
              <Link className="font-semibold text-brand" href={`/services/${s.slug}`}>
                /services/{s.slug}
              </Link>{" "}
              — {s.title}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-bold text-brand">事業所 id（データ層）</h2>
        <ul className="mt-4 grid gap-2 text-sm text-ink-muted sm:grid-cols-2">
          {offices.map((o) => (
            <li key={o.id}>
              <code className="rounded bg-surface px-1.5 py-0.5">{o.id}</code> — {o.name}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-ink-muted">
          リポジトリ直下の <code className="rounded bg-surface px-1">docs/MIGRATION.md</code> にも同趣旨のメモを置いています。CMS
          へ移す場合は <code className="rounded bg-surface px-1">data/site.ts</code> を JSON 出力のソースにすると差し替えが容易です。
        </p>
      </div>
    </main>
  );
}
