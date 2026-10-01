/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCheckCircle, FaExclamationCircle, FaLightbulb, FaTools } from "react-icons/fa";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { caseStudies } from "@/data/case-studies";
import { projects, siteConfig } from "@/data/portfolio";
import cmsProjects from "@/content/portfolio.json";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };
type CmsProject = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  url: string;
  image: string;
  alt: string;
  tags: string[];
  challenge: string;
  solution: string;
  result: string;
  metaTitle: string;
  metaDescription: string;
};

const managedProjects = cmsProjects as CmsProject[];

export const dynamicParams = false;
export function generateStaticParams() {
  return managedProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (study) return pageMetadata(study.metaTitle, study.description, `/portfolio/${slug}`);
  const managed = managedProjects.find((item) => item.slug === slug);
  if (managed) return pageMetadata(managed.metaTitle, managed.metaDescription, `/portfolio/${slug}`);
  return {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  const project = projects.find((item) => item.slug === slug);
  const managed = managedProjects.find((item) => item.slug === slug);

  if (managed) {
    const managedSections = [
      { title: "Challenge", text: managed.challenge, icon: FaExclamationCircle },
      { title: "Solution", text: managed.solution, icon: FaTools },
      { title: "Result", text: managed.result, icon: FaCheckCircle },
    ];

    return (
      <>
        <PageHero eyebrow={managed.category || "Case Study"} title={`${managed.title}: Website Case Study`} description={managed.summary} path={`/portfolio/${slug}`} parents={[{ name: "Portfolio", path: "/portfolio" }]}>
          {managed.url ? <a href={managed.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit project</a> : null}
          <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
        </PageHero>
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${managed.title} website case study`,
          description: managed.metaDescription,
          url: `${siteUrl}/portfolio/${slug}`,
          image: managed.image.startsWith("http") ? managed.image : `${siteUrl}${managed.image}`,
          author: { "@type": "Person", name: siteConfig.name, url: siteUrl },
        }} />
        <article className="page-container py-12">
          <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-950">
            <img src={managed.image} alt={managed.alt} title={managed.title} className="mx-auto max-h-[720px] w-full object-contain" />
          </figure>
          <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-blue-500/20 bg-blue-50/70 p-6 leading-relaxed text-slate-700 dark:bg-blue-950/20 dark:text-slate-200">
            <div className="flex items-start gap-4"><span className="feature-icon shrink-0" aria-hidden="true"><FaLightbulb /></span><p><span className="focus-point">Project summary:</span> {managed.summary} The case study below separates the problem, the implementation response, and the resulting outcome so the work is easier to review.</p></div>
          </div>
          <div className="mx-auto mt-8 grid max-w-6xl gap-7 lg:grid-cols-3">
            {managedSections.map((section) => {
              const Icon = section.icon;
              return (
                <section key={section.title} className="surface-panel animated-card">
                  <span className="feature-icon" aria-hidden="true"><Icon /></span>
                  <h2 className="mt-5 text-2xl font-bold">{section.title}</h2>
                  <p className="card-copy">{section.text}</p>
                </section>
              );
            })}
          </div>
          <div className="mx-auto mt-8 flex max-w-6xl flex-wrap gap-2">{managed.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
        </article>
        <ProjectCta text="If this project is close to what you need, share your current site, reference, content requirements, and preferred editing workflow. I can help define a comparable scope without copying another project's structure blindly." />
      </>
    );
  }

  if (!study || !project) notFound();

  return (
    <>
      <PageHero eyebrow={study.name} title={`${study.name}: Website Case Study`} description={study.summary} path={`/portfolio/${slug}`} parents={[{ name: "Portfolio", path: "/portfolio" }]}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit the project</a>
        <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: `${study.name} website case study`, description: study.description, url: `${siteUrl}/portfolio/${slug}`, image: `${siteUrl}${project.image}`, author: { "@type": "Person", name: siteConfig.name, url: siteUrl } }} />
      <article className="page-container py-12">
        <Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes="(max-width: 1280px) 100vw, 1200px" className="h-auto w-full rounded-3xl border border-slate-200 dark:border-slate-700" />
        <div className="mx-auto mt-10 max-w-4xl reading-copy">
          {study.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <h2 className="text-2xl font-bold">Key project considerations</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {study.considerations.map((item) => <div key={item} className="surface-panel animated-card flex items-center gap-3 !p-5"><FaCheckCircle className="shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" /><span className="font-semibold">{item}</span></div>)}
          </div>
        </div>
        <div className="mx-auto mt-9 flex max-w-4xl flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
      </article>
      <ProjectCta text="A similar project would start with your own content, audience, editing needs, and technical requirements. The case study is a reference for the approach, not a template that must be copied." />
    </>
  );
}
