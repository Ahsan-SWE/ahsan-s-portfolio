import Image from "next/image";
import Link from "next/link";
import {
  FaCheck,
  FaChevronRight,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { navigation, siteConfig } from "@/data/portfolio";

const footerServices = [
  { label: "React & Next.js Dev", href: "/services/frontend-development" },
  { label: "SEO & ORM", href: "/services/seo-and-orm" },
  { label: "WordPress CMS", href: "/services/wordpress-development" },
  { label: "Web Optimization", href: "/services/performance-optimization" },
  { label: "AI Content Strategy", href: "/services/ai-content-strategy" },
] as const;

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 border-t border-gray-200/80 bg-white/[0.65] pb-8 pt-16 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] backdrop-blur-2xl dark:border-gray-800/80 dark:bg-slate-800/[0.65]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label="Go to home"
              className="mb-4 inline-block transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={siteConfig.logo}
                alt="Ahsanul Haque Chowdhury"
                width={240}
                height={94}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Building premium digital presence through Frontend Development,
              SEO, and CMS management. Dedicated to writing clean code and
              boosting web performance.
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 transition hover:-translate-y-1 hover:bg-blue-500 hover:text-white"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition hover:-translate-y-1 hover:bg-gray-900 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <FaGithub />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Send email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition hover:-translate-y-1 hover:bg-red-500 hover:text-white"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 inline-block border-b border-gray-200 pb-2 text-lg font-bold dark:border-gray-700 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation
                .filter((item) => item.label !== "Services")
                .map((item) => (
                  <li key={item.targetId}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-600 transition hover:text-blue-500 dark:text-gray-400"
                    >
                      <FaChevronRight aria-hidden="true" className="text-xs" />
                      {item.label === "About" ? "About Me" : item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 inline-block border-b border-gray-200 pb-2 text-lg font-bold dark:border-gray-700 dark:text-white">
              My Services
            </h3>
            <ul className="space-y-3">
              {footerServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300"
                  >
                    <FaCheck
                      aria-hidden="true"
                      className="text-xs text-blue-700 dark:text-blue-300"
                    />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 inline-block border-b border-gray-200 pb-2 text-lg font-bold dark:border-gray-700 dark:text-white">
              Contact Info
            </h3>
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt
                    aria-hidden="true"
                    className="mt-1 text-blue-700 dark:text-blue-300"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Uttara, Dhaka-1230,
                    <br />
                    Dhaka, Bangladesh
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt
                    aria-hidden="true"
                    className="text-blue-700 dark:text-blue-300"
                  />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-sm text-gray-600 transition hover:text-blue-500 dark:text-gray-400"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope
                    aria-hidden="true"
                    className="shrink-0 text-blue-700 dark:text-blue-300"
                  />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all text-sm text-gray-600 transition hover:text-blue-500 dark:text-gray-400"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="flex w-full items-center justify-end border-t border-gray-300/80 pt-6 text-right dark:border-white/30">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            <Link href="/privacy" className="mr-5 underline underline-offset-4">
              Privacy
            </Link>
            <BackToTopButton />
            © {new Date().getFullYear()} Ahsanul Haque Chowdhury. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
