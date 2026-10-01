import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Ahsanul Portfolio",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#0b1120",
    theme_color: "#2563eb",
    lang: "en",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
