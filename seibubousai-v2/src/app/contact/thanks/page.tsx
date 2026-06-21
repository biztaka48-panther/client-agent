import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "送信完了 | 株式会社 西部防災",
  description: "お問い合わせありがとうございます。",
};

export default function ThanksPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white px-4 pt-24 pb-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="text-5xl" aria-hidden="true">
          ✅
        </div>
        <h1 className="mt-6 font-[family-name:var(--font-serif)] text-3xl font-bold text-slate-900">
          お問い合わせ
          <br className="sm:hidden" />
          ありがとうございます
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          内容を確認の上、担当者より折り返しご連絡いたします。
          <br />
          お急ぎの場合は、お電話にてお問い合わせください。
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary" size="lg" glow href="/">
            トップへ戻る
          </Button>
          <a
            href="tel:099-214-2701"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-700"
          >
            📞 099-214-2701
          </a>
        </div>
      </div>
    </section>
  );
}
