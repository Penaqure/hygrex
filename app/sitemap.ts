import type { MetadataRoute } from "next";
import { getCompany, getPublishedFleet } from "@/lib/store";

export const dynamic = "force-dynamic";

const pages = ["/about", "/fleet", "/crane-finder", "/how-it-works", "/faq", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ url }, fleet] = await Promise.all([getCompany(), getPublishedFleet()]);
  return [
    { url, priority: 1 },
    ...pages.map((p) => ({ url: `${url}${p}`, priority: 0.7 })),
    ...fleet.map((e) => ({ url: `${url}/fleet/${e.slug}`, priority: 0.8 })),
  ];
}
