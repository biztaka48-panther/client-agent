import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { newsItems } from "@/data/news";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/business",
    "/fire-equipment",
    "/building-inspection",
    "/general",
    "/company",
    "/contact",
    "/news",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsItems.map((item) => ({
    url: `${siteConfig.url}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries];
}
