import { Quote } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-navy-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle label="TESTIMONIALS" title="お客様の声" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((item, i) => (
            <AnimatedSection key={item.id} delay={i * 0.1}>
              <div className="bg-white rounded-xl p-6 border-l-4 border-brand-red shadow-sm h-full flex flex-col">
                <Quote size={28} className="text-brand-red mb-4 shrink-0" />
                <p className="text-gray-700 leading-relaxed flex-1 text-sm md:text-base">
                  {item.message}
                </p>
                <p className="text-gray-400 text-sm mt-4 font-medium">
                  ─ {item.role}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
