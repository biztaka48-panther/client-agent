import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Badge from "@/components/ui/Badge";
import CTASection from "@/components/sections/CTASection";
import { company, history, qualifications } from "@/data/company";

export const metadata: Metadata = {
  title: "会社案内 | 株式会社 西部防災 | 鹿児島",
  description:
    "株式会社 西部防災の会社案内。鹿児島市荒田を拠点に、消防用設備点検・防火対象物点検・建築設備定期点検を行う防災のプロフェッショナル集団です。",
};

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company"
        title="会社案内"
        description="鹿児島の安全を守る、防災のプロフェッショナル集団です。"
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-[family-name:var(--font-serif)] text-2xl font-bold text-slate-900">
            会社概要
          </h2>
          <dl className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            {[
              { k: "会社名", v: company.name },
              { k: "代表者", v: company.ceo },
              { k: "設立", v: company.founded },
              { k: "資本金", v: company.capital },
              {
                k: "所在地",
                v: `${company.postalCode} ${company.address}`,
              },
              { k: "電話番号", v: company.tel },
              { k: "FAX", v: company.fax },
              { k: "メール", v: company.email },
              { k: "許可", v: company.license },
              { k: "取引銀行", v: company.banks },
              { k: "加盟団体", v: company.affiliation },
              {
                k: "事業内容",
                v: "消防用設備保守点検・防火対象物点検・防災管理点検・建築設備定期点検・各種防災設備工事・防災機器販売",
              },
            ].map((row) => (
              <div
                key={row.k}
                className="flex flex-col gap-1 border-b border-slate-200 bg-white px-6 py-4 last:border-0 sm:flex-row sm:gap-6"
              >
                <dt className="w-32 shrink-0 text-sm font-semibold text-slate-500">
                  {row.k}
                </dt>
                <dd className="text-sm text-slate-800">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-[family-name:var(--font-serif)] text-2xl font-bold text-slate-900">
            沿革
          </h2>
          <ol className="relative border-l border-red-200 pl-8">
            {history.map((h, i) => (
              <li key={i} className="mb-8 last:mb-0">
                <span className="absolute -left-[7px] mt-1 h-3.5 w-3.5 rounded-full bg-red-600" />
                <p className="font-[family-name:var(--font-inter)] text-sm font-bold text-red-600">
                  {h.year}
                </p>
                <p className="mt-1 text-slate-800">{h.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-[family-name:var(--font-serif)] text-2xl font-bold text-slate-900">
            有資格・認定
          </h2>
          <div className="flex flex-wrap gap-3">
            {qualifications.map((q) => (
              <Badge key={q} label={q} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-[family-name:var(--font-serif)] text-2xl font-bold text-slate-900">
            アクセス
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            {company.postalCode} {company.address}
          </p>
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              src={company.mapEmbedUrl}
              title="西部防災 所在地"
              width="100%"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
