interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      {label && (
        <span className="text-brand-red text-sm font-semibold tracking-widest uppercase">
          {label}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-brand-navy leading-tight">
        {title}
      </h2>
      <div className="w-10 h-0.5 bg-brand-red" />
      {subtitle && (
        <p className="text-gray-500 text-base mt-1 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
