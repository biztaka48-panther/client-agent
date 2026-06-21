import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "fire-equipment",
    icon: "🧯",
    title: "消防用設備点検",
    description:
      "自動火災報知設備・スプリンクラー・消火器など\n法定点検を確実に実施します。",
    href: "/fire-equipment",
    image: "/images/services/fire-equipment.jpg",
  },
  {
    id: "building",
    icon: "🏢",
    title: "建築物定期調査",
    description:
      "特殊建築物の定期報告（12条点検）を\nベテランスタッフが対応します。",
    href: "/building-inspection",
    image: "/images/services/building.jpg",
  },
  {
    id: "maintenance",
    icon: "🔧",
    title: "メンテナンス",
    description:
      "設備の経年劣化・故障に迅速対応。\n緊急時も安心のサポート体制。",
    href: "/business",
    image: "/images/services/maintenance.jpg",
  },
  {
    id: "generator",
    icon: "⚡",
    title: "負荷試験（非常用発電機）",
    description:
      "停電時に備えた非常用発電機の\n定期負荷試験を実施します。",
    href: "/business",
    image: "/images/services/generator.jpg",
  },
  {
    id: "sales",
    icon: "🛒",
    title: "防災関連品販売",
    description:
      "消火器・避難器具・防災グッズの\n販売・取付も承ります。",
    href: "/general",
    image: "/images/services/sales.jpg",
  },
];
