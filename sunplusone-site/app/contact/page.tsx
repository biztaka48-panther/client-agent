import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { siteMeta } from "@/data/site";

export default function ContactPage() {
  return (
    <main id="main">
      <PageIntro
        title="お問い合わせ・ご依頼"
        description="本ページは静的なマークアップ例です。本番ではフォーム送信先（メール／CRM）とスパム対策を接続してください。"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <section id="request" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-bold text-brand">ご依頼フォーム（仮）</h2>
            <ContactForm />
          </section>

          <section id="access" className="scroll-mt-28 space-y-6">
            <div className="rounded-2xl border border-line bg-card p-6 shadow-sm md:p-8">
              <h2 className="text-lg font-bold text-brand">本社（フッター表記と一致）</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {siteMeta.address.postal}
                <br />
                {siteMeta.address.lines[0]}
              </p>
              <p className="mt-3 text-sm">
                TEL:{" "}
                <a className="font-semibold text-brand underline" href={`tel:${siteMeta.tel}`}>
                  {siteMeta.tel}
                </a>
              </p>
              <p className="text-sm">FAX: {siteMeta.fax}</p>
            </div>
            <div className="rounded-2xl border border-dashed border-brand/30 bg-brand/5 p-6">
              <h3 className="text-sm font-bold text-brand">地図埋め込み（仮）</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Google Maps の iframe または静的地図画像をここに配置。プライバシーポリシーへの言及を忘れずに。
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
