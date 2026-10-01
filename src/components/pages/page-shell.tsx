import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaBookOpen,
  FaBriefcase,
  FaCogs,
  FaEnvelope,
  FaFolderOpen,
  FaImages,
  FaShieldAlt,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import { Reveal } from "@/components/effects/reveal";
import { PageSchema } from "@/components/seo/json-ld";

function resolvePageIcon(label: string, path: string): IconType {
  if (path.startsWith("/services/")) return FaCogs;
  if (path.startsWith("/portfolio/")) return FaFolderOpen;
  if (path.startsWith("/blog/")) return FaBookOpen;
  const value = label.toLowerCase();
  if (value.includes("about")) return FaUserCircle;
  if (value.includes("service")) return FaCogs;
  if (value.includes("expertise") || value.includes("experience")) return FaBriefcase;
  if (value.includes("portfolio") || value.includes("case study")) return FaFolderOpen;
  if (value.includes("contact")) return FaEnvelope;
  if (value.includes("gallery")) return FaImages;
  if (value.includes("blog") || value.includes("article")) return FaBookOpen;
  if (value.includes("privacy")) return FaShieldAlt;
  return FaStar;
}

export function PageHero({
  eyebrow,
  title,
  description,
  path,
  type,
  parents = [],
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  type?: string;
  parents?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  const Icon = resolvePageIcon(eyebrow, path);

  return (
    <>
      <PageSchema name={`${eyebrow} | Ahsanul Haque Chowdhury`} description={description} path={path} type={type} parents={parents} />
      <section className="inner-hero overflow-hidden">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="page-container relative z-10">
          <Reveal effect="fade-up" duration={800}>
            <nav aria-label="Breadcrumb" className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-sm">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="transition hover:text-blue-300">Home</Link></li>
                {parents.map((parent) => (
                  <li key={parent.path} className="flex items-center gap-2"><span aria-hidden="true">/</span><Link href={parent.path} className="transition hover:text-blue-300">{parent.name}</Link></li>
                ))}
                <li className="flex items-center gap-2"><span aria-hidden="true">/</span><span aria-current="page" className="text-blue-300">{eyebrow}</span></li>
              </ol>
            </nav>
          </Reveal>

          <Reveal effect="fade-right" delay={100} duration={1000}>
            <div className="flex items-center gap-3">
              <span className="page-icon-badge" aria-hidden="true"><Icon /></span>
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <h1 className="page-title">
              <span className="block text-white">Ahsanul Haque Chowdhury</span>
              <span className="mt-2 block bg-gradient-to-r from-blue-300 via-cyan-300 to-violet-300 bg-clip-text text-[0.56em] leading-tight text-transparent sm:text-[0.58em]">
                {title}
              </span>
            </h1>
          </Reveal>

          <Reveal effect="fade-up" delay={200} duration={1000}>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">{description}</p>
            {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function Section({ title, intro, children, id, className = "" }: { title: string; intro?: string; children?: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`page-container py-10 sm:py-14 ${className}`}>
     <Reveal effect="fade-up" duration={1000}>
        <h2 className="section-title"><span className="highlight-text">{title}</span></h2>
        {intro ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200 sm:text-lg">{intro}</p> : null}
      </Reveal>
      {children ? <Reveal effect="fade-up" delay={100} duration={1000}><div className="mt-7">{children}</div></Reveal> : null}
    </section>
  );
}

export function ProjectCta({
  title = "Have a project in mind?",
  text = "Tell me what you want to build or improve. We can define the right scope and next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="page-container pb-14 pt-3">
      <Reveal effect="zoom-in" duration={1000}>
        <div className="group relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-slate-900 via-[#12213b] to-slate-900 px-7 py-9 text-white shadow-xl shadow-blue-950/20 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-blue-500/15 blur-2xl transition duration-700 group-hover:scale-125" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="mt-3 leading-relaxed text-slate-200">{text}</p>
          </div>
          <Link className="button-primary relative mt-6 shrink-0 lg:mt-0" href="/contact">Discuss your project</Link>
        </div>
      </Reveal>
    </section>
  );
}

export function Questions({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <div className="max-w-4xl divide-y divide-slate-300 dark:divide-slate-700">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="cursor-pointer pr-4 text-lg font-semibold transition hover:text-blue-600 dark:hover:text-blue-300">{item.question}</summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-700 dark:text-slate-200">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
