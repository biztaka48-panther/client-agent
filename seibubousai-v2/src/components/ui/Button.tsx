import Link from "next/link";
import type { ButtonProps } from "@/types";

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses = {
  primary:
    "bg-red-700 hover:bg-red-600 text-white transition-all duration-300 hover:-translate-y-0.5",
  outline:
    "border border-red-600/60 text-white hover:bg-red-600/10 hover:border-red-500 transition-all duration-300",
  ghost:
    "text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300",
  floating:
    "bg-red-600 text-white rounded-full shadow-[0_0_30px_rgba(192,57,43,0.7)] hover:-translate-y-1 transition-all duration-200",
};

const glowClasses =
  "shadow-[0_0_20px_rgba(192,57,43,0.5)] hover:shadow-[0_0_40px_rgba(192,57,43,0.8)]";

export default function Button({
  variant = "primary",
  size = "md",
  glow = false,
  pulse = false,
  children,
  href,
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium cursor-pointer select-none",
    sizeClasses[size],
    variantClasses[variant],
    glow ? glowClasses : "",
    pulse ? "animate-pulse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
