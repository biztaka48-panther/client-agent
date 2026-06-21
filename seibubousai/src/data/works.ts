import type { Work } from "@/types/work";

export const works: Work[] = [
  {
    id: "work-01",
    title: "マンション共用部 消防設備定期点検",
    category: "inspection",
    categoryLabel: "点検",
    buildingType: "マンション",
    location: "埼玉県さいたま市南区",
    description:
      "築20年の分譲マンション（15階建て・120戸）の消防設備総合点検を実施。自動火災報知設備・誘導灯・消火器など全設備を点検し、報告書を作成。不具合箇所の修繕提案も行いました。",
    image: "/images/works/work-01.jpg",
  },
  {
    id: "work-02",
    title: "商業施設 非常用発電機負荷試験",
    category: "inspection",
    categoryLabel: "点検",
    buildingType: "商業施設",
    location: "埼玉県川口市",
    description:
      "延床面積8,000㎡の商業施設にて、消防法改正に対応した非常用発電機の実負荷試験を実施。30%以上の負荷で運転確認を行い、消防署への報告書も作成しました。",
    image: "/images/works/work-02.jpg",
  },
  {
    id: "work-03",
    title: "病院 自動火災報知設備 更新工事",
    category: "construction",
    categoryLabel: "工事",
    buildingType: "病院",
    location: "埼玉県さいたま市大宮区",
    description:
      "老朽化した自動火災報知設備の全面更新工事を実施。患者様への影響を最小限にするため夜間・休日対応で施工。最新設備への更新により安全性と信頼性が向上しました。",
    image: "/images/works/work-03.jpg",
  },
  {
    id: "work-04",
    title: "介護施設 消防設備工事・点検",
    category: "construction",
    categoryLabel: "工事",
    buildingType: "介護施設",
    location: "埼玉県越谷市",
    description:
      "新設介護施設への消防設備一式の設置工事を担当。スプリンクラー設備・自動火災報知設備・誘導灯など、施設に必要な全設備を設計から施工まで一括対応しました。",
    image: "/images/works/work-01.jpg",
  },
  {
    id: "work-05",
    title: "賃貸アパート 防火設備定期点検",
    category: "inspection",
    categoryLabel: "点検",
    buildingType: "賃貸アパート",
    location: "埼玉県川越市",
    description:
      "木造2棟（各8戸）の賃貸アパートにて防火設備点検を実施。防火扉の閉鎖動作確認・感知器の作動試験等を行い、入居者の安全を確保しました。",
    image: "/images/works/work-02.jpg",
  },
  {
    id: "work-06",
    title: "学校 消防設備点検・改修",
    category: "other",
    categoryLabel: "その他",
    buildingType: "学校",
    location: "埼玉県さいたま市浦和区",
    description:
      "市立小学校の消防設備定期点検と、老朽化した消火器の一斉交換を実施。安全な学習環境の確保に貢献しました。",
    image: "/images/works/work-03.jpg",
  },
];
