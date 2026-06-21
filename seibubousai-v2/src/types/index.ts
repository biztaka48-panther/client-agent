import type { ReactNode } from "react";

export interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export type ButtonVariant = "primary" | "outline" | "ghost" | "floating";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  pulse?: boolean;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Stat {
  number: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category?: string;
  excerpt?: string;
  body?: string;
}
