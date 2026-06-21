import { PageIntro } from "@/components/PageIntro";

export default function CompanyPage() {
  return (
    <main id="main">
      <PageIntro
        title="会社案内"
        description="旧サイト「会社案内」配下のコンテンツをセクション分割して再配置する構成案です。"
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-6">
        <section id="track" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-brand">警備実績</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            事例一覧・ロゴ掲載許諾のあるクライアント名などを旧ページから転載。写真は再圧縮して `next/image` または静的配信へ。
          </p>
        </section>
        <section id="initiatives" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-brand">社内の取り組み</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            SDGs・安全衛生・地域清掃などの記事ブロックをコンポーネント化し、更新しやすい Markdown / CMS 連携を推奨。
          </p>
        </section>
        <section id="action-plan" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-brand">一般事業主行動計画</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            PDF があればそのままリンク、本文を HTML 化する場合はアクセシビリティ（見出し構造）を確認。
          </p>
        </section>
        <section id="faq-service" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-brand">サービスのFAQ</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Q/A を JSON または MDX に移し、`details/summary` または独自アコーディオンで実装。検索（Ctrl+K）にもヒットさせると便利です。
          </p>
        </section>
        <section id="badge" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-brand">警備業標識</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            標識画像は警察庁ガイドラインに沿った掲載に更新。旧画像の解像度・余白を再確認。
          </p>
        </section>
      </div>
    </main>
  );
}
