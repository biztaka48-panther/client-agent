import Link from "next/link";
import { Phone, Mail, ClipboardList } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const tags = [
  "まずは相談だけしたい",
  "点検内容を見直したい",
  "費用感を知りたい",
];

export default function ContactCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-red to-red-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            消防設備点検・工事のご相談はお気軽に
          </h2>
          <p className="text-white/80 text-base mb-6">
            まずは相談だけでも歓迎です。お気軽にお問い合わせください。
          </p>

          {/* タグ */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:048XXXXXXX"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-red font-bold px-8 py-4 rounded-md text-lg hover:bg-gray-100 transition-colors"
            >
              <Phone size={22} />
              電話で相談する
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-md text-lg hover:bg-white hover:text-brand-red transition-colors"
            >
              <Mail size={22} />
              メールで相談する
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-bold px-8 py-4 rounded-md text-lg hover:bg-brand-navy-dark transition-colors"
            >
              <ClipboardList size={22} />
              無料見積り依頼
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
