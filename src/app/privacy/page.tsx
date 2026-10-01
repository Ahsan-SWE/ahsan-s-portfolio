import { FaEnvelope, FaExternalLinkAlt, FaLock, FaSearch, FaServer, FaUserShield } from "react-icons/fa";
import { PageHero } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { pageMetadata } from "@/lib/seo";

const privacyPageInfo = {
  name: "Ahsanul Haque Chowdhury",
  email: "ahsan.chowdhury202@gmail.com",
} as const;

const sections = [
  {
    title: "Contact inquiries",
    icon: FaEnvelope,
    content: <>The contact form sends your name, email, subject, selected service, and message to {privacyPageInfo.name} so the inquiry can be reviewed and answered. The form is intended for normal project communication. Do not submit passwords, payment details, private credentials, or sensitive documents through the form.</>,
  },
  {
    title: "Hosting, email, and technical information",
    icon: FaServer,
    content: <>The website is hosted on Vercel and contact messages use the configured email provider. Hosting and delivery services may process technical request data needed for operation, security, reliability, and abuse prevention. Contact messages are not automatically added to a marketing list by this website.</>,
  },
  {
    title: "Theme preference and browser storage",
    icon: FaLock,
    content: <>Your selected theme preference may be stored locally in your browser so the website can remember how you prefer to view it. Local browser preferences are used for presentation and do not require you to create an account on this portfolio.</>,
  },
  {
    title: "Public content and search visibility",
    icon: FaSearch,
    content: <>Portfolio pages, blog posts, gallery images, and public project information are designed to be accessible on the open web. After the production site is published and indexing is enabled, search engines may crawl and index public pages according to the site&apos;s robots and sitemap configuration.</>,
  },
  {
    title: "External links and services",
    icon: FaExternalLinkAlt,
    content: <>Project websites, social profiles, WhatsApp, GitHub, resume links, and other external destinations are operated by their respective providers. When you leave this website, those services may apply their own privacy, security, account, and data-handling practices.</>,
  },
  {
    title: "Your requests",
    icon: FaUserShield,
    content: <>For questions, corrections, or deletion requests related to information you personally sent through this website, email <a href={`mailto:${privacyPageInfo.email}`}>{privacyPageInfo.email}</a>. Include enough context to identify the message or inquiry you are referring to.</>,
  },
];

export const metadata = pageMetadata(
  "Website Privacy Notice | Ahsanul Haque Chowdhury",
  "Learn how contact inquiries, website preferences, and basic technical information are handled on Ahsanul Haque Chowdhury's portfolio website.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice"
        description="How information is handled when you browse this portfolio, use website preferences, follow external links, or send a project inquiry through the contact form."
        path="/privacy"
      />
      <article className="page-container py-12">
     <Reveal effect="fade-up" duration={1000}>
          <div className="mx-auto max-w-5xl">
            <p className="mb-7 text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">Last updated: October 1, 2026</p>
            <div className="grid gap-5 md:grid-cols-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <section key={section.title} className="surface-panel animated-card">
                    <span className="feature-icon" aria-hidden="true"><Icon /></span>
                    <h2 className="mt-5 text-2xl font-bold">{section.title}</h2>
                    <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">{section.content}</p>
                  </section>
                );
              })}
            </div>
          </div>
        </Reveal>
      </article>
    </>
  );
}
