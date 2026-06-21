export type NewsCategory = "info" | "works" | "column";

export interface News {
  id: string;
  title: string;
  category: NewsCategory;
  categoryLabel: string;
  date: string;
  excerpt: string;
}
