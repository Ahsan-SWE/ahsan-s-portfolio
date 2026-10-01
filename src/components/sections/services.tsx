import Link from "next/link";
import {
  FaBullhorn,
  FaLaptopCode,
  FaRobot,
  FaSearchDollar,
  FaTachometerAlt,
  FaWordpressSimple,
} from "react-icons/fa";

import { Reveal } from "@/components/effects/reveal";
import { services } from "@/data/portfolio";

const glass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const serviceStyles = [
  {
    icon: FaLaptopCode,
    iconBox:
      "bg-blue-50/80 text-blue-700 dark:text-blue-300 dark:bg-blue-900/40",
    shadow: "hover:shadow-blue-500/20",
    title: "text-blue-700 dark:text-blue-300",
  },
  {
    icon: FaSearchDollar,
    iconBox:
      "bg-purple-50/80 text-purple-700 dark:text-purple-300 dark:bg-purple-900/40",
    shadow: "hover:shadow-purple-500/20",
    title: "text-purple-700 dark:text-purple-300",
  },
  {
    icon: FaWordpressSimple,
    iconBox:
      "bg-teal-50/80 text-teal-700 dark:text-teal-300 dark:bg-teal-900/40",
    shadow: "hover:shadow-teal-500/20",
    title: "text-teal-700 dark:text-teal-300",
  },
  {
    icon: FaTachometerAlt,
    iconBox:
      "bg-orange-50/80 text-orange-700 dark:text-orange-300 dark:bg-orange-900/40",
    shadow: "hover:shadow-orange-500/20",
    title: "text-orange-700 dark:text-orange-300",
  },
  {
    icon: FaRobot,
    iconBox: "bg-indigo-50/80 text-indigo-500 dark:bg-indigo-900/40",
    shadow: "hover:shadow-indigo-500/20",
    title: "text-indigo-600 dark:text-indigo-300",
  },
  {
    icon: FaBullhorn,
    iconBox: "bg-red-50/80 text-red-500 dark:bg-red-900/40",
    shadow: "hover:shadow-red-500/20",
    title: "text-red-600 dark:text-red-300",
  },
] as const;

const delays = [100, 200, 300, 400, 500, 600] as const;

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-20 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 shadow-sm ${glass}`}
          >
            What I Do
          </div>
          <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
            My Specializations
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const style = serviceStyles[index];
            const Icon = style.icon;
            return (
              <Reveal
                key={service.title}
                effect="fade-up"
                delay={delays[index]}
                className="h-full"
              >
                <article
                  className={`group h-full overflow-hidden rounded-3xl border border-gray-200/50 p-10 shadow-lg transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 ${style.shadow} ${glass}`}
                >
                  <div
                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 ${style.iconBox}`}
                  >
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className={`mb-4 text-2xl font-bold ${style.title}`}>
                    {service.title}
                  </h3>
                  <p className="font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="home-detail-link"
                  >
                    Explore {service.title}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
