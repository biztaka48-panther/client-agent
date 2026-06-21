export type WorkCategory = "inspection" | "construction" | "other";

export interface Work {
  id: string;
  title: string;
  category: WorkCategory;
  categoryLabel: string;
  buildingType: string;
  location: string;
  description: string;
  image: string;
}
