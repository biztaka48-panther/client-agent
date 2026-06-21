import { PageIntro } from "@/components/PageIntro";
import { offices, siteMeta } from "@/data/site";

export default function OfficesPage() {
  return (
    <main id="main">
      <PageIntro
        title="事業所紹介"
        description="名称は公式サイトのメニューに基づきます。地図・駐車場・アクセス詳細は各所の旧下層ページから段階的に移行してください。"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-surface text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium md:px-6">事業所</th>
                <th className="px-4 py-3 font-medium md:px-6">メモ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {offices.map((o) => (
                <tr key={o.id} id={o.id} className="scroll-mt-32">
                  <td className="px-4 py-3 font-semibold text-ink md:px-6">{o.name}</td>
                  <td className="px-4 py-3 text-ink-muted md:px-6">{o.note ?? "住所・地図: 旧サイト該当ページから転記（要確認）"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          本社所在地（フッター表記と整合）: {siteMeta.address.postal} {siteMeta.address.lines[0]}
        </p>
      </div>
    </main>
  );
}
