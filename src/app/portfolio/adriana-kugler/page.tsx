import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const siteOwner = "Ahsanul Haque Chowdhury";
const study = {
    slug: "adriana-kugler",
    name: "Adriana Kugler",
    category: "Professional portfolio / Custom WordPress",
    metaTitle: "Adriana Kugler Case Study | Ahsanul Haque Chowdhury",
    description:
      "Explore the custom WordPress portfolio project for Adriana Kugler, with a professional presentation and structured access to biographical content.",
    summary:
      "A custom WordPress professional portfolio for Adriana Kugler, a former Federal Reserve Governor.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "An established professional's website needs to connect a recognizable identity with a body of work. This project is a custom WordPress portfolio for Adriana Kugler, with the portfolio entry identifying her as a former Federal Reserve Governor.",
          "The website is a useful reference for a public-facing professional portfolio where biography and supporting materials need a clear structure. It differs from a short promotional page because readers may arrive looking for very specific information.",
        ],
      },
      {
        title: "Prioritizing clarity and credibility",
        paragraphs: [
          "A professional portfolio should establish who the person is and provide an understandable path through the content. Descriptive headings and purposeful links help visitors move from a brief introduction to more detailed material.",
          "Titles, dates, institutional references, and professional descriptions need to match approved source information. In this kind of work, consistency is a practical design requirement as well as an editorial one: the site's structure should help present facts without creating conflicting versions.",
        ],
      },
      {
        title: "A custom WordPress approach",
        paragraphs: [
          "The project is listed as custom WordPress work using HTML, CSS, and JavaScript. This supports a tailored presentation while retaining a content management foundation for ongoing updates.",
          "For a comparable project, I would map the main content groups and agree on which sections editors need to control. Reusable templates and clearly organized fields can then support a consistent design without making every update dependent on a developer.",
        ],
      },
      {
        title: "What this means for a professional website",
        paragraphs: [
          "This example can help clients evaluate the level of detail and presentation they want for their own portfolio. A future brief would define the audience, approved biography, supporting materials, and contact journey before development. The technical work would then support those content priorities across different devices.",
          "The portfolio offers a useful starting point for discussing a professional website that brings a biography and supporting materials into one consistent presentation.",
        ],
      },
    ],
    considerations: [
      "Professional identity and biography",
      "Structured supporting information",
      "Custom WordPress presentation",
      "Consistent editorial facts",
    ],
    service: "wordpress-development",
  } as const;
const project = {
    title: "Portfolio Website",
    slug: "adriana-kugler",
    description:
      "A Portfolio Website for a Former Federal Reserve Governor, Adriana Kugler.",
    url: "https://adrianakugler.com/",
    image: "/images/portfolio-adriana-kugler.webp",
    alt: "Adriana Kugler economist portfolio website project",
    width: 1899,
    height: 951,
    tags: ["HTML/CSS/JS", "WORDPRESS CUSTOM"],
  } as const;

export const metadata = pageMetadata(
  study.metaTitle,
  study.description,
  "/portfolio/adriana-kugler",
);

export default function CaseStudyPage() {
  return (
    <>
      <PageHero eyebrow={study.name} title={`${study.name}: Website Case Study`} description={study.summary} path="/portfolio/adriana-kugler" parents={[{ name: "Portfolio", path: "/portfolio" }]}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit the project</a>
        <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: `${study.name} website case study`, description: study.description, url: `${siteUrl}/portfolio/adriana-kugler`, image: `${siteUrl}${project.image}`, author: { "@type": "Person", name: siteOwner, url: siteUrl } }} />
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
