export interface ServiceData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  href: string;
}

export const services: ServiceData[] = [
  {
    id: "inspection-fire",
    title: "消防設備点検",
    description:
      "消防法に基づく定期点検を実施し、設備の正常な機能維持をサポートします。",
    longDescription:
      "消防設備士が消防法令に基づいた機器点検・総合点検を実施します。スプリンクラー・自動火災報知設備・消火器など、建物に設置された消防設備の適正な維持管理をサポート。点検後は消防署への報告書作成まで対応します。",
    image: "/images/services/inspection-fire.jpg",
    href: "/services/",
  },
  {
    id: "inspection-building",
    title: "建築設備点検",
    description:
      "建物利用者の安全確保のため、建築設備の状態を適切に確認します。",
    longDescription:
      "換気設備・排煙設備・非常用照明装置など、建物の建築設備を定期的に点検します。建築基準法に基づく定期報告制度に対応し、安全で快適な建物環境の維持をお手伝いします。",
    image: "/images/services/inspection-building.jpg",
    href: "/services/",
  },
  {
    id: "inspection-fireproof",
    title: "防火設備点検",
    description:
      "防火シャッターや防火扉など、防火設備の機能確認を行います。",
    longDescription:
      "防火シャッター・防火扉・耐火クロス・スクリーン等の防火設備について、建築基準法の定期報告制度に基づき専門資格者が点検を実施します。火災時の延焼防止機能が正常に動作するかを確認します。",
    image: "/images/services/inspection-fireproof.jpg",
    href: "/services/",
  },
  {
    id: "generator-test",
    title: "非常用発電機負荷試験",
    description:
      "災害時や停電時に備え、非常用発電機の性能を適切に確認します。",
    longDescription:
      "消防法の改正により義務化された非常用発電機の負荷試験・予防的な保全措置を実施します。実負荷試験・模擬負荷試験どちらにも対応し、消防署への報告書作成も行います。",
    image: "/images/services/generator-test.jpg",
    href: "/services/",
  },
  {
    id: "fire-equipment",
    title: "消防設備工事",
    description: "新設・改修・更新工事まで幅広く対応します。",
    longDescription:
      "建物の新築・増改築時の消防設備新設工事から、既存設備の改修・更新まで対応します。自動火災報知設備・スプリンクラー・消火器・誘導灯など、各種消防設備の施工を行います。",
    image: "/images/services/fire-equipment.jpg",
    href: "/services/",
  },
  {
    id: "disaster-goods",
    title: "防災用品販売",
    description:
      "施設や事業所の防災対策に必要な用品をご提案します。",
    longDescription:
      "消火器・避難器具・救急用品・防災備蓄品など、建物・事業所に必要な防災用品を販売・設置します。法令に基づいた適切な種類・数量をご提案し、設置後のメンテナンスも承ります。",
    image: "/images/services/disaster-goods.jpg",
    href: "/services/",
  },
];
