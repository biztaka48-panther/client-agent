import type { Stat } from "@/types";

// ★クライアントから実際の数字を取得して差し替える（仮の数値）
export const stats: Stat[] = [
  { number: 500, suffix: "+", label: "点検実績（件）", icon: "🔍" },
  { number: 30, suffix: "年", label: "業界経験", icon: "📅" },
  { number: 99, suffix: "%", label: "顧客満足度", icon: "⭐" },
  { number: 24, suffix: "h", label: "緊急対応体制", icon: "🚒" },
];
