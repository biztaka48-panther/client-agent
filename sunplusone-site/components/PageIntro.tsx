type Props = { title: string; description?: string };

export function PageIntro({ title, description }: Props) {
  return (
    <div className="border-b-2 border-gold/30 bg-card px-4 py-10 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-brand md:text-4xl">{title}</h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-gold" aria-hidden />
        {description && <p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">{description}</p>}
      </div>
    </div>
  );
}
