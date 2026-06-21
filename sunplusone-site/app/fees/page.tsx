import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { siteMeta } from "@/data/site";
import { btnPrimary, btnSecondary, linkInline } from "@/lib/ui";

export default function FeesPage() {
  return (
    <main id="main">
      <PageIntro
        title="警備料金"
        description="現行サイトの料金表・PDF はここからリンクまたは埋め込みで再配置する想定です。金額の正確性は必ず貴社資料で照合してください。"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="rounded-2xl border border-line bg-card p-6 shadow-sm md:p-10">
          <h2 className="text-lg font-bold text-brand">移行チェックリスト（仮）</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            <li>旧「警備料金」ページの HTML / PDF / 画像を取得</li>
            <li>消費税率・有効期限の表記ゆれを法務・経理で確認</li>
            <li>見積依頼フォームと料金ページの相互リンクを維持</li>
            <li>印刷用スタイルがあれば `print` メディア向け CSS を追加</li>
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${siteMeta.tel}`} className={btnPrimary}>
              電話で料金を確認
            </a>
            <Link href="/contact" className={btnSecondary}>
              見積・ご依頼フォーム
            </Link>
            <a
              href={siteMeta.canonicalOrigin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer select-none items-center justify-center rounded-xl border-2 border-dashed border-brand/35 bg-card px-5 py-3 text-sm font-bold text-brand shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold-soft/50 hover:shadow-md active:translate-y-0"
            >
              現行サイトの料金ページを開く
            </a>
          </div>
          <p className="mt-8 text-sm text-ink-muted">
            採用関連のご案内は{" "}
            <Link href="/recruit" className={linkInline}>
              採用情報
            </Link>
            からどうぞ。
          </p>
        </div>
      </div>
    </main>
  );
}
