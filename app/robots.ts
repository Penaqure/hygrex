import type { MetadataRoute } from "next";
import { getCompany } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { url } = await getCompany();
  return { rules: { userAgent: "*", allow: "/", disallow: "/admin" }, sitemap: `${url}/sitemap.xml` };
}
