import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { BackgroundNetwork } from "@/components/effects/background-network";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteSchema } from "@/components/seo/json-ld";
import { FloatingTools } from "@/components/widgets/floating-tools";
import { indexingEnabled } from "@/lib/seo";
import { siteConfig } from "@/data/portfolio";
import { siteUrlObject } from "@/lib/site-url";
import "./globals.css";
const inter = localFont({
  src: "../assets/fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  preload: true,
});
const poppins = localFont({
  src: [
    { path: "../assets/fonts/poppins-700.woff2", weight: "700" },
    { path: "../assets/fonts/poppins-800.woff2", weight: "800" },
    { path: "../assets/fonts/poppins-900.woff2", weight: "900" },
  ],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});
export const metadata: Metadata = {
  metadataBase: siteUrlObject,
  title: {
    default: `${siteConfig.name} | Web Developer & SEO Specialist`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: "/" }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: indexingEnabled,
    follow: true,
    googleBot: {
      index: indexingEnabled,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  colorScheme: "light dark",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full min-w-80 overflow-x-hidden bg-gray-50 font-body text-gray-900 dark:bg-[#0b1120] dark:text-gray-100">
        <SiteSchema />
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-lg bg-blue-700 px-4 py-3 font-bold text-white shadow-xl transition focus:translate-y-0"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          <BackgroundNetwork />
          <Header />
          <main
            id="main-content"
            tabIndex={-1}
            className="relative z-10 overflow-x-hidden"
          >
            {children}
          </main>
          <Footer />
          <FloatingTools />
        </ThemeProvider>
      </body>
    </html>
  );
}
