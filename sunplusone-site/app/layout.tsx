import type { Metadata } from "next";
import { ClientChrome } from "@/components/ClientChrome";
import { InstagramFeedHomeOnly } from "@/components/InstagramFeed/InstagramFeedHomeOnly";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteMeta } from "@/data/site";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3010";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteMeta.nameShort} | ${siteMeta.description}`,
    template: `%s | ${siteMeta.nameShort}`,
  },
  description: siteMeta.description,
  keywords: ["警備", "鹿児島", "交通誘導", "施設警備", "駐車場警備", "サンプラスワン"],
  openGraph: {
    title: `${siteMeta.nameShort} | ${siteMeta.description}`,
    description: siteMeta.description,
    url: siteUrl,
    siteName: siteMeta.nameShort,
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: siteMeta.name }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SecurityService",
  name: siteMeta.name,
  url: siteUrl,
  telephone: siteMeta.tel,
  faxNumber: siteMeta.fax,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteMeta.address.lines[0],
    addressLocality: "鹿児島市",
    addressRegion: "鹿児島県",
    addressCountry: "JP",
  },
  areaServed: { "@type": "AdministrativeArea", name: "鹿児島県" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased pb-16 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg"
        >
          本文へスキップ
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        {children}
        <InstagramFeedHomeOnly />
        <SiteFooter />
        <ClientChrome />
      </body>
    </html>
  );
}
