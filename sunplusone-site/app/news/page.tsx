import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { newsItems } from "@/data/site";

export default function NewsPage() {
  return (
    <main id="main">
      <PageIntro
        title="お知らせ・ブログ"
        description="以下は公式トップに掲載されていた見出しの転記です。本文・個別URLは旧サイトからの取り込みが必要です。"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
          {newsItems.map((n) => (
            <li key={n.id} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
              <time className="w-32 shrink-0 text-sm text-ink-muted">{n.date}</time>
              <div className="flex-1">
                <p className="font-medium text-ink">{n.title}</p>
                <p className="mt-1 text-xs text-ink-muted">
                  種別: {n.kind === "blog" ? "ブログ（仮ラベル）" : "お知らせ（仮ラベル）"} — 旧サイトの該当記事へリダイレクト設定を推奨
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          運用時は WordPress の投稿ID・パーマリンク構造を{" "}
          <Link href="/migration" className="font-medium text-brand underline">
            移行マップ
          </Link>{" "}
          に追記し、301 リダイレクトをサーバー側で設定してください。
        </p>
      </div>
    </main>
  );
}
