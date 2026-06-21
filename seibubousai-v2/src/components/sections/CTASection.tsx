import Button from "@/components/ui/Button";

const TEL = "099-214-2701";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#96281B] via-[#C0392B] to-[#96281B] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, #F39C12 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl font-bold text-white sm:text-4xl">
          まずはお気軽にご相談ください
        </h2>
        <p className="mt-4 text-base text-white/90">
          消防設備・建築物の安全に関するご相談は、無料でお受けしています。
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`tel:${TEL}`}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-[#C0392B] shadow-lg transition-transform hover:-translate-y-0.5"
          >
            📞 {TEL}
          </a>
          <Button
            variant="outline"
            size="lg"
            href="/contact"
            className="border-white/70 text-white hover:bg-white/10"
          >
            ✉ 無料相談フォーム
          </Button>
        </div>
      </div>
    </section>
  );
}
