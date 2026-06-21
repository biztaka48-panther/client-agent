import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  icon?: LucideIcon;
  href: string;
}
