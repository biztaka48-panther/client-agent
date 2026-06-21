import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "phone";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: LucideIcon;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

const variantClasses = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark active:bg-brand-red-dark",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-navy-dark active:bg-brand-navy-dark",
  outline:
    "bg-transparent text-brand-red border border-brand-red hover:bg-brand-red hover:text-white",
  phone:
    "bg-brand-red text-white hover:bg-brand-red-dark active:bg-brand-red-dark",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  fullWidth = false,
  icon: Icon,
  type = "button",
  disabled = false,
  className = "",
  target,
  rel,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-bold rounded-md transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && <Icon size={size === "lg" ? 22 : size === "sm" ? 16 : 18} />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
