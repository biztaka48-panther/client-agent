export interface Reason {
  id: string;
  number: string;
  iconName: string;
  title: string;
  description: string;
}

export const reasons: Reason[] = [
  {
    id: "local",
    number: "01",
    iconName: "MapPin",
    title: "地域密着だから迅速対応",
    description:
      "地元企業ならではのフットワークで急なご相談やトラブルにも迅速に対応します。",
  },
  {
    id: "qualified",
    number: "02",
    iconName: "Shield",
    title: "有資格者による安心の点検",
    description:
      "経験豊富な有資格者が法令に基づいた適切な点検・報告を行います。",
  },
  {
    id: "onestop",
    number: "03",
    iconName: "Layers",
    title: "ワンストップ対応",
    description:
      "消防設備点検から改修工事、防災用品のご提案まで一括して対応可能です。",
  },
  {
    id: "track-record",
    number: "04",
    iconName: "Award",
    title: "豊富な実績",
    description:
      "さまざまな建物の点検・工事を手掛けてきた実績を活かし最適なご提案を行います。",
  },
];
