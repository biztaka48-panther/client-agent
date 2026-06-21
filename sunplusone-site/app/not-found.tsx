import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-24 text-center md:px-6">
      <h1 className="text-3xl font-bold text-brand">ページが見つかりません</h1>
      <p className="mt-4 text-ink-muted">URL をご確認いただくか、トップへお戻りください。</p>
      <Link href="/" className="mt-8 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white">
        ホームへ
      </Link>
    </main>
  );
}
