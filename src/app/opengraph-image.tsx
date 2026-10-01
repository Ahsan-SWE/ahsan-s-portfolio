import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/portfolio";

export const alt = `${siteConfig.name} — Front-End Developer, SEO Specialist and ORM Professional`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 78% 20%, rgba(124,58,237,.42), transparent 34%), linear-gradient(135deg, #07111f 0%, #111c34 62%, #162d56 100%)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "980px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#60a5fa",
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 3,
            marginBottom: 28,
          }}
        >
          PROFESSIONAL PORTFOLIO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            color: "#cbd5e1",
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            marginTop: 30,
          }}
        >
          Front-End Developer · SEO Specialist · ORM Professional
        </div>
        <div
          style={{
            color: "#93c5fd",
            display: "flex",
            fontSize: 24,
            marginTop: 34,
          }}
        >
          Uttara, Dhaka, Bangladesh
        </div>
      </div>
    </div>,
    size,
  );
}
