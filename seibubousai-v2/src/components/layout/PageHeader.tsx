interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#0A0E14] pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "radial-gradient(ellipse at top, #C0392B 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        {eyebrow && (
          <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-slate-400 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
