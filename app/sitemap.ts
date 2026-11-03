import type { MetadataRoute } from "next";
import { company, equipment } from "@/lib/data";

export const dynamic = "force-static";

const pages = ["/about", "/fleet", "/crane-finder", "/how-it-works", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: company.url, priority: 1 },
    ...pages.map((p) => ({ url: `${company.url}${p}/`, priority: 0.7 })),
    ...equipment.map((e) => ({ url: `${company.url}/fleet/${e.slug}/`, priority: 0.8 })),
  ];
}
