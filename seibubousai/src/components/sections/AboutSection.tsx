import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const features = [
  "消防設備士・防火対象物点検資格者が在籍",
  "埼玉県全域に対応（さいたま市を中心に）",
  "点検から工事・報告書作成までワンストップ",
  "創業以来、地域の安全を守り続けています",
];

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* テキスト */}
          <AnimatedSection>
            <div>
              <span className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-3 block">
                ABOUT US
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy leading-tight mb-4">
                地域の安全を支える
                <br />
                防災の専門企業
              </h2>
              <div className="w-10 h-0.5 bg-brand-red mb-6" />
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                西部防災株式会社は、埼玉県さいたま市を拠点に消防設備点検・防災設備工事を手がける専門会社です。地元に根ざしたきめ細やかな対応と、有資格者による確かな技術で、マンション・ビル・商業施設・病院など多様な建物の安全管理をサポートしています。
              </p>
              <ul className="space-y-2 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={18} className="text-brand-red shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/about/"
                className="inline-flex items-center gap-2 border-2 border-brand-navy text-brand-navy font-bold px-6 py-3 rounded-md hover:bg-brand-navy hover:text-white transition-colors"
              >
                会社概要を詳しく見る
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>

          {/* 画像プレースホルダー */}
          <AnimatedSection delay={0.2}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-navy to-brand-navy-dark flex items-center justify-center shadow-lg">
              <span className="text-white/20 text-8xl font-black select-none">会社</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
