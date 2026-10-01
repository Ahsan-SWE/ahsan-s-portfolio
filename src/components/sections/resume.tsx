import Link from "next/link";
import {
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaWordpress,
} from "react-icons/fa";

import { Reveal } from "@/components/effects/reveal";
import { education, experiences } from "@/data/portfolio";

const accentPhrases = [
  "custom WordPress websites",
  "Advanced Custom Fields (ACF)",
  "reusable theme sections",
  "responsive interfaces",
  "technical SEO",
  "Online Reputation Management",
  "Search Engine Optimization (SEO)",
  "CMS Website Maintenance",
  "Website Performance Tracking",
  "WordPress Theme Customization",
  "Backlink Audit",
  "On-Page Optimization",
  "Plugin Management",
  "Performance Optimization",
  "Software Engineering",
  "mathematics",
  "analytical thinking",
  "structured problem-solving",
  "SEO",
  "social media",
  "content strategy",
  "Google Analytics",
  "Google Ads",
  "ChatGPT",
  "Gemini",
  "Bing AI",
] as const;

function emphasize(text: string) {
  const escaped = accentPhrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = new RegExp(`(${escaped.join("|")})`, "gi");
  return text.split(matcher).map((part, index) =>
    accentPhrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase()) ? (
      <span key={`${part}-${index}`} className="focus-point">{part}</span>
    ) : part,
  );
}

const glass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const experienceStyles = [
  {
    color: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-300",
    soft: "bg-blue-500/10",
    hover: "hover:border-blue-500/50",
    icon: FaStar,
  },
  {
    color: "bg-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    soft: "bg-purple-500/10",
    hover: "hover:border-purple-500/50",
    icon: FaWordpress,
  },
] as const;

const educationStyles = [
  {
    border: "border-blue-500",
    text: "text-blue-700 dark:text-blue-300",
    soft: "bg-blue-500/10",
  },
  {
    border: "border-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    soft: "bg-purple-500/10",
  },
] as const;

export function Resume() {
  return (
    <section
      id="expertise"
      className="relative border-y border-gray-200/50 bg-white/40 py-24 backdrop-blur-lg dark:border-gray-800/50 dark:bg-slate-900/40"
    >
      <span id="resume" className="absolute -top-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-16 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 ${glass}`}
          >
            My Qualifications
          </div>
          <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
            Expertise & Experience
          </h2>
          <Link href="/expertise" className="home-detail-link">
            Explore my full experience and education
          </Link>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal effect="fade-right">
              <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  <FaBriefcase aria-hidden="true" />
                </span>
                Work Experience
              </h3>
            </Reveal>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-1 before:-translate-x-px before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-transparent">
              {experiences.map((experience, index) => {
                const style = experienceStyles[index % experienceStyles.length];
                const Icon = style.icon;
                return (
                  <Reveal
                    key={`${experience.title}-${experience.period}`}
                    effect="fade-up"
                    delay={index === 0 ? 0 : 100}
                    className="group relative pl-14"
                  >
                    <div
                      className={`absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white text-white shadow-lg transition-transform group-hover:scale-110 dark:border-[#0b1120] ${style.color}`}
                    >
                      <Icon aria-hidden="true" className="text-sm" />
                    </div>
                    <article
                      className={`rounded-2xl border border-gray-200/50 p-8 shadow-md transition-all hover:shadow-xl dark:border-gray-700/50 ${style.hover} ${glass}`}
                    >
                      <span
                        className={`mb-2 inline-block rounded-full px-3 py-1 text-sm font-bold ${style.text} ${style.soft}`}
                      >
                        {experience.period}
                      </span>
                      <h4 className={`mb-1 text-2xl font-extrabold ${style.text}`}>
                        {experience.title}
                      </h4>
                      <h5 className="mb-4 font-bold text-gray-500 dark:text-gray-400">
                        {experience.company}
                      </h5>
                      <ul className="list-inside list-disc space-y-2 text-sm font-medium text-gray-700 sm:text-base dark:text-gray-300">
                        {experience.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{emphasize(responsibility)}</li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div>
            <Reveal effect="fade-left">
              <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  <FaGraduationCap aria-hidden="true" />
                </span>
                Education & Certifications
              </h3>
            </Reveal>

            <div className="mb-12 space-y-6">
              {education.map((item, index) => {
                const style = educationStyles[index];
                return (
                  <Reveal
                    key={`${item.title}-${item.period}`}
                    delay={index === 0 ? 0 : 100}
                  >
                    <article
                      className={`rounded-2xl border-l-4 p-8 shadow-md transition-transform hover:-translate-y-1 ${style.border} ${glass}`}
                    >
                      <span className="mb-2 block text-sm font-bold text-gray-500 dark:text-gray-400">
                        {item.period}
                      </span>
                      <h4 className={`text-xl font-extrabold ${style.text}`}>
                        {item.title}
                      </h4>
                      <p className="mt-1 font-bold text-gray-600 dark:text-gray-400">
                        {item.institution}
                      </p>
                      <p
                        className={`mt-2 inline-block rounded px-3 py-1 text-sm font-black ${style.text} ${style.soft}`}
                      >
                        {item.result}
                      </p>
                      {"description" in item && item.description ? (
                        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {emphasize(item.description)}
                        </p>
                      ) : null}
                    </article>
                  </Reveal>
                );
              })}

              <Reveal delay={200}>
                <article className="rounded-2xl border border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-8 shadow-sm dark:border-gray-700/50 dark:from-[#0b1120]/50 dark:to-gray-800/50">
                  <h4 className="mb-2 text-lg font-extrabold text-indigo-700 dark:text-indigo-300">
                    Digital Marketing & AI Tools
                  </h4>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {emphasize("Online coursework and continued learning (02/2024 - Present) in SEO, social media, content strategy, email campaigns, Google Analytics, and Google Ads.")}
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <li>{emphasize("Craft precise prompts for SEO-driven AI content.")}</li>
                    <li>{emphasize("Expert with ChatGPT, Gemini & Bing AI.")}</li>
                  </ul>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
