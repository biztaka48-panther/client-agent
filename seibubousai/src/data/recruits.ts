import type { Recruit } from "@/types/recruit";

export const recruits: Recruit[] = [
  {
    id: "recruit-inspection",
    position: "inspection",
    positionLabel: "消防設備点検スタッフ",
    employmentType: "正社員・パート（応相談）",
    salary: "月給22万円〜（経験・資格による）／パート：時給1,200円〜",
    location: "埼玉県さいたま市（社用車にて各現場へ）",
    workContent:
      "マンション・ビル・施設などの消防設備（自動火災報知設備・消火器・誘導灯など）の定期点検・試験・報告書作成業務。",
    requirements: "普通自動車免許（AT限定可）/ 学歴不問",
    welcome:
      "消防設備士の資格保有者・経験者は優遇します。未経験者も資格取得サポートあり。",
  },
  {
    id: "recruit-construction",
    position: "construction",
    positionLabel: "消防設備施工スタッフ",
    employmentType: "正社員",
    salary: "月給25万円〜（経験・資格による）",
    location: "埼玉県さいたま市（社用車にて各現場へ）",
    workContent:
      "消防設備（自動火災報知設備・スプリンクラー・誘導灯など）の新設・改修・更新工事の施工。",
    requirements: "普通自動車免許必須 / 学歴不問",
    welcome:
      "消防設備士（甲種）保有者・電気工事経験者は優遇します。未経験からでもスタートできます。",
  },
];

export const timelineItems = [
  { time: "08:30", content: "出社・朝礼・当日スケジュール確認" },
  { time: "09:00", content: "現場へ移動（社用車）" },
  { time: "10:00", content: "消防設備点検作業" },
  { time: "12:00", content: "昼食（現場近くで）" },
  { time: "13:00", content: "午後の点検作業" },
  { time: "17:00", content: "帰社・報告書作成" },
  { time: "18:00", content: "退社" },
];

export const benefits = [
  "社会保険完備（健康保険・厚生年金・雇用保険・労災）",
  "資格取得支援制度（消防設備士・防火対象物点検資格者等）",
  "資格手当あり",
  "社用車貸与（通勤使用可・応相談）",
  "制服・工具支給",
  "有給休暇（入社半年後より付与）",
  "年末年始・夏季休暇あり",
  "未経験・第二新卒歓迎",
];
