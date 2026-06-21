import { MapPin, Shield, Layers, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { reasons } from "@/data/reasons";

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Shield,
  Layers,
  Award,
};

export default function ReasonsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            label="WHY CHOOSE US"
            title="西部防災が選ばれる理由"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, i) => {
            const Icon = iconMap[reason.iconName];
            return (
              <AnimatedSection key={reason.id} delay={i * 0.1}>
                <div className="bg-white rounded-xl shadow-md p-6 h-full hover:border-b-4 hover:border-brand-red transition-all duration-200 group">
                  {/* 装飾番号 */}
                  <div className="text-4xl font-black text-brand-red/10 group-hover:text-brand-red/20 mb-4 transition-colors select-none">
                    {reason.number}
                  </div>
                  {/* アイコン */}
                  <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center mb-4">
                    {Icon && <Icon size={22} className="text-white" />}
                  </div>
                  <h3 className="font-bold text-brand-navy text-lg mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
