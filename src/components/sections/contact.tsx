import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import { Reveal } from "@/components/effects/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/data/portfolio";

const glass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-gray-200/50 bg-white/40 py-24 backdrop-blur-lg dark:border-gray-800/50 dark:bg-slate-900/40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal effect="fade-right">
            <div
              className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 ${glass}`}
            >
              Get In Touch
            </div>
            <h2 className="mb-6 font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
              Let&apos;s Work <br /> Together.
            </h2>
            <p className="mb-10 max-w-md text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400">
              Have a project in mind or looking for a dedicated Front-End
              Developer? Fill out the form or reach out directly.
            </p>
            <Link href="/contact" className="home-detail-link !mt-0 mb-7">
              Plan your project inquiry
            </Link>

            <div className="space-y-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className={`group flex items-center gap-5 rounded-2xl border border-gray-200/50 p-5 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700/50 ${glass}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-700 dark:text-blue-300 transition-transform group-hover:scale-110">
                  <FaEnvelope aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    Email Me
                  </span>
                  <span className="block break-all text-lg font-bold dark:text-white">
                    {siteConfig.email}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className={`group flex items-center gap-5 rounded-2xl border border-gray-200/50 p-5 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700/50 ${glass}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-700 dark:text-blue-300 transition-transform group-hover:scale-110">
                  <FaPhoneAlt aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                    Call Me
                  </span>
                  <span className="block text-lg font-bold dark:text-white">
                    {siteConfig.phoneDisplay}
                  </span>
                </span>
              </a>

              <div
                className={`group flex items-center gap-5 rounded-2xl border border-gray-200/50 p-5 dark:border-gray-700/50 ${glass}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-700 dark:text-blue-300 transition-transform group-hover:scale-110">
                  <FaMapMarkerAlt aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Location
                  </span>
                  <span className="block text-lg font-bold dark:text-white">
                    {siteConfig.address.display}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal
            effect="fade-left"
            className={`rounded-3xl border border-gray-200/50 p-8 shadow-xl md:p-10 dark:border-gray-700/50 ${glass}`}
          >
            <h3 className="mb-6 text-2xl font-bold text-indigo-700 dark:text-indigo-300">
              Send Me a Message
            </h3>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
