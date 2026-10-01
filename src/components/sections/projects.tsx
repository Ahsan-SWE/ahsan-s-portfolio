import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

import { Reveal } from "@/components/effects/reveal";
import { projects } from "@/data/portfolio";

const glass =
  "bg-white/[0.65] backdrop-blur-2xl dark:bg-slate-800/[0.65] dark:border-slate-700/50";

const projectStyles = [
  {
    shadow: "hover:shadow-blue-500/30",
    tags: [
      "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    ],
    tint: "bg-blue-500/20",
    title: "text-blue-700 dark:text-blue-300",
  },
  {
    shadow: "hover:shadow-purple-500/30",
    tags: [
      "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    ],
    tint: "bg-purple-500/20",
    title: "text-purple-700 dark:text-purple-300",
  },
  {
    shadow: "hover:shadow-indigo-500/30",
    tags: [
      "bg-[#61DAFB]/10 text-cyan-800 dark:text-cyan-200",
      "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    ],
    tint: "",
    title: "text-indigo-700 dark:text-indigo-300",
  },
  {
    shadow: "hover:shadow-orange-500/30",
    tags: [
      "bg-gray-500/10 text-gray-700 dark:text-gray-300",
      "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    ],
    tint: "",
    title: "text-orange-700 dark:text-orange-300",
  },
  {
    shadow: "hover:shadow-blue-500/30",
    tags: [
      "bg-[#21759b]/10 text-blue-800 dark:text-blue-200",
      "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    ],
    tint: "",
    title: "text-cyan-700 dark:text-cyan-300",
  },
  {
    shadow: "hover:shadow-green-500/30",
    tags: [
      "bg-yellow-500/10 text-amber-800 dark:text-amber-200",
      "bg-green-500/10 text-green-800 dark:text-green-200",
    ],
    tint: "",
    title: "text-green-700 dark:text-green-300",
  },
] as const;

const delays = [100, 200, 300, 400, 500, 600] as const;

export function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal effect="fade-up" className="mb-20 text-center">
          <div
            className={`mb-4 inline-block rounded-full border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 ${glass}`}
          >
            Portfolio
          </div>
          <h2 className="font-heading text-4xl font-extrabold md:text-5xl dark:text-white">
            Featured Projects
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const style = projectStyles[index];
            return (
              <Reveal
                key={project.title}
                effect="zoom-in"
                delay={delays[index]}
                className="h-full"
              >
                <article
                  className={`group h-full overflow-hidden rounded-3xl border border-gray-200/50 shadow-lg transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl dark:border-gray-700/50 ${style.shadow} ${glass}`}
                >
                  <div className="relative m-0 overflow-hidden p-0">
                    {style.tint ? (
                      <div
                        className={`absolute inset-0 z-10 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 ${style.tint}`}
                      />
                    ) : null}
                    <Image
                      src={project.image}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="m-0 block h-auto w-full object-contain p-0"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent pb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live website`}
                        className="flex h-12 w-12 translate-y-8 items-center justify-center rounded-full bg-blue-500 text-lg text-white shadow-lg transition duration-500 group-hover:translate-y-0 hover:bg-white hover:text-blue-500"
                      >
                        <FaExternalLinkAlt aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className={`rounded-full px-3 py-1 text-xs font-bold ${style.tags[tagIndex]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className={`mb-2 text-xl font-extrabold transition-colors ${style.title}`}>
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="home-detail-link !mt-0 mb-4"
                    >
                      Read case study
                    </Link>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-300 hover:underline"
                    >
                      Live Website <FaArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
