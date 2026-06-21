import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import RecruitForm from "@/components/forms/RecruitForm";
import { recruits, timelineItems, benefits } from "@/data/recruits";
import { CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.recruit.title,
  description: pageMetadata.recruit.description,
};

export default function RecruitPage() {
  return (
    <>
      <PageHero
        title="採用情報"
        subtitle="未経験者歓迎。消防設備士の資格取得もサポートします。"
        breadcrumbs={[{ label: "採用情報" }]}
      />

      {/* 採用メッセージ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-brand-navy-light rounded-2xl p-8 md:p-12 text-center mb-16">
              <span className="text-brand-red font-bold text-sm tracking-widest uppercase">
                RECRUIT MESSAGE
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-brand-navy mt-3 mb-4">
                地域の安全を守る仕事を、
                <br className="md:hidden" />
                一緒にしませんか？
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                未経験者大歓迎です。入社後は先輩スタッフが丁寧に指導します。消防設備士などの資格取得も会社がサポートします。地域に根ざした専門職として、やりがいを感じながら働けます。
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                {["未経験者歓迎", "資格取得サポート", "社用車貸与", "社会保険完備"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white border border-brand-red text-brand-red text-sm font-bold px-4 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 募集職種カード */}
          <AnimatedSection>
            <SectionTitle label="POSITIONS" title="募集職種" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {recruits.map((recruit, i) => (
              <AnimatedSection key={recruit.id} delay={i * 0.1}>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 h-full">
                  <div className="inline-block bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {recruit.positionLabel}
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { label: "雇用形態", value: recruit.employmentType },
                        { label: "給与", value: recruit.salary },
                        { label: "勤務地", value: recruit.location },
                        { label: "仕事内容", value: recruit.workContent },
                        { label: "応募資格", value: recruit.requirements },
                        { label: "歓迎条件", value: recruit.welcome },
                      ].map((row) => (
                        <tr key={row.label}>
                          <th className="text-left py-2.5 pr-4 font-bold text-brand-navy text-xs w-20 align-top">
                            {row.label}
                          </th>
                          <td className="py-2.5 text-gray-600">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 1日の流れ */}
          <AnimatedSection>
            <SectionTitle label="A DAY IN THE LIFE" title="1日の流れ" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="relative max-w-lg mx-auto mb-20">
              <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-brand-navy-light" />
              {timelineItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 mb-6 relative">
                  <div className="w-16 text-right shrink-0">
                    <span className="text-brand-red font-bold text-sm">{item.time}</span>
                  </div>
                  <div className="relative z-10">
                    <Clock size={18} className="text-brand-navy bg-white border-2 border-brand-navy rounded-full p-0.5" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg px-4 py-3 shadow-sm flex-1 text-sm text-gray-700">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* 福利厚生 */}
          <AnimatedSection>
            <SectionTitle label="BENEFITS" title="福利厚生" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-20">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                  <CheckCircle size={18} className="text-brand-red shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* 応募フォーム */}
          <AnimatedSection>
            <SectionTitle label="APPLY" title="応募フォーム" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-2xl mx-auto">
              <RecruitForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
