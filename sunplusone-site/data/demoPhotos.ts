/**
 * デモ用のストック写真（Unsplash）
 * 本番では現場写真・許諾済みポートレートへ差し替えてください。
 */
export type DemoPhoto = {
  src: string;
  alt: string;
};

export const demoPhotos: readonly DemoPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad188?auto=format&fit=crop&w=1400&q=80",
    alt: "ビル街の風景（施設・都市警備のイメージ／デモ）",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    alt: "建築物と空（安全・見守りのイメージ／デモ）",
  },
  {
    src: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=1400&q=80",
    alt: "工事・現場のイメージ（交通誘導の連想／デモ）",
  },
  {
    src: "https://images.unsplash.com/photo-1521791136064-7986c292c6f0?auto=format&fit=crop&w=1400&q=80",
    alt: "チームで協力する様子（職場の雰囲気／デモ）",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    alt: "オフィスで打ち合わせ（運営・管理のイメージ／デモ）",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
    alt: "チームワーク（採用・仲間のイメージ／デモ）",
  },
  {
    src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=80",
    alt: "都市の夜景（夜間警備の連想／デモ）",
  },
  {
    src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01e7?auto=format&fit=crop&w=1400&q=80",
    alt: "屋外で働く人々（現場スタッフのイメージ／デモ）",
  },
] as const;
