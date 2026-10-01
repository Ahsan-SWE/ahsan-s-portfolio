import type { Metadata } from "next";
import { siteConfig } from "@/data/portfolio";
import { siteUrl } from "@/lib/site-url";

export const indexingEnabled =
  process.env.INDEXING_ENABLED !== "false" &&
  process.env.VERCEL_ENV !== "preview";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${siteUrl}${path === "/" ? "" : path}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path === "/" ? "" : path}`,
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
