import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { indexingEnabled } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(indexingEnabled
        ? { allow: "/", disallow: ["/api/", "/admin"] }
        : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
