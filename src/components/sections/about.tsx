import Link from "next/link";
import {
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaHtml5,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaReact,
  FaSearch,
  FaUser,
  FaWordpress,
} from "react-icons/fa";

import { Reveal } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { competencies, siteConfig } from "@/data/portfolio";

const glass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const skillStyles = [
  {
    width: "w-[90%]",
    bar: "from-blue-400 to-blue-600",
    icon: FaHtml5,
    iconColor: "text-orange-700 dark:text-orange-300",
  },
  {
    width: "w-[80%]",
    bar: "from-blue-400 to-blue-600",
    icon: FaReact,
    iconColor: "text-[#61DAFB]",
  },
  {
    width: "w-[85%]",
    bar: "from-purple-400 to-purple-600",
    icon: FaSearch,
    iconColor: "text-purple-700 dark:text-purple-300",
  },
  {
    width: "w-[85%]",
    bar: "from-blue-400 to-blue-600",
    icon: FaWordpress,
    iconColor: "text-[#21759b]",
  },
] as const;

const personalInfo = [
  {
    label: "Degree",
    value: "B.S.C Software Eng.",
    icon: FaGraduationCap,
    color: "text-blue-700 dark:text-blue-300",
  },
  {
    label: "Phone",
    value: siteConfig.phoneDisplay,
    icon: FaPhoneAlt,
    color: "text-purple-700 dark:text-purple-300",
  },
  {
    label: "Email",
    value: siteConfig.email,
    icon: FaEnvelope,
    color: "text-teal-700 dark:text-teal-300",
  },
  {
    label: "Location",
    value: siteConfig.locationShort,
    icon: FaMapMarkerAlt,
    color: "text-red-500",
  },
] as const;

export function About() {
  return (
    <section
      id="about"
      className="relative border-y border-gray-200/50 bg-white/40 py-24 backdrop-blur-lg dark:border-gray-800/50 dark:bg-slate-900/40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <Reveal
            effect="fade-up"
            duration={1000}
            className="space-y-8 lg:col-span-7"
          >
            <div
              className={`mb-2 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 shadow-sm ${glass}`}
            >
              <FaUser aria-hidden="true" className="mr-2 inline" /> About Me
            </div>
            <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
              Engineering{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </h2>
            <p className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              Graduating from Daffodil International University with a B.S.C in
              Software Engineering, I have developed a strong passion for
              front-end architecture and web optimization. My journey perfectly
              blends coding with digital strategy.
            </p>
            <p className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              Currently working at Aan-Nahl Software, I manage Online
              Reputation, implement advanced SEO strategies, and build custom
              WordPress solutions. I focus on delivering seamless web
              experiences, ensuring brands maintain a powerful and positive
              online presence.
            </p>

            <Link href="/about" className="home-detail-link">
              More about Ahsanul
            </Link>
            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              {personalInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`group rounded-xl border border-gray-200/50 p-4 transition-colors hover:border-blue-500 dark:border-gray-700/50 ${glass}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`mb-2 block text-xl transition-transform group-hover:scale-110 ${item.color}`}
                    />
                    <span className={`text-xs font-bold uppercase tracking-wider ${item.color}`}>
                      {item.label}
                    </span>
                    <p
                      className={`mt-1 font-semibold dark:text-white ${item.label === "Email" ? "break-all text-sm md:text-base" : ""}`}
                    >
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal effect="fade-left" duration={1200} className="lg:col-span-5">
            <TiltCard
              maxTilt={5}
              className={`rounded-3xl border border-gray-200/50 p-8 shadow-2xl dark:border-gray-700/50 ${glass}`}
            >
              <h3 className="mb-8 flex items-center gap-3 font-heading text-2xl font-bold text-blue-700 dark:text-blue-300">
                <span className="rounded-lg bg-blue-500/10 p-2 text-blue-700 dark:text-blue-300">
                  <FaCode aria-hidden="true" />
                </span>
                Core Competencies
              </h3>

              <div className="space-y-6">
                {competencies.map((skill, index) => {
                  const style = skillStyles[index];
                  const Icon = style.icon;
                  return (
                    <div key={skill.label} className="group">
                      <div className="mb-2 flex justify-between">
                        <span className="flex items-center gap-2 text-sm font-bold dark:text-gray-200">
                          <Icon
                            aria-hidden="true"
                            className={style.iconColor}
                          />
                          {skill.label}
                        </span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-800/50">
                        <Reveal
                          effect="fade-right"
                          delay={([200, 400, 600, 800] as const)[index]}
                          duration={1000}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${style.bar} ${style.width}`}
                        >
                          <span className="sr-only">{skill.value}%</span>
                        </Reveal>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
