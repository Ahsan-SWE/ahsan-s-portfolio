import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const siteOwner = "Ahsanul Haque Chowdhury";
const study = {
    slug: "aan-nahl",
    name: "Aan-Nahl Software",
    category: "Company website / Next.js",
    metaTitle: "Aan-Nahl Website Case Study | Ahsanul Haque Chowdhury",
    description:
      "Explore the Aan-Nahl company website project: a responsive Next.js and Tailwind CSS redesign presented by Ahsanul Haque Chowdhury.",
    summary:
      "A company website redesign using Next.js and Tailwind CSS, bringing the company's web presentation into a responsive frontend structure.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "A software company's website needs to introduce its work without making visitors understand the underlying technology first. This project focused on a responsive web presentation for Aan-Nahl, using Next.js and Tailwind CSS as the frontend foundation.",
          "The portfolio example is available as a hosted project. It gives prospective clients a concrete way to explore the interface and compare the work with the kind of company website they need.",
        ],
      },
      {
        title: "The development focus",
        paragraphs: [
          "For this type of redesign, content hierarchy matters as much as individual components. A visitor should be able to recognize the company, understand the offer, and find the next relevant action. Responsive spacing and readable text support that journey at different screen sizes.",
          "Next.js provides a component-based structure for shared interface elements. Tailwind CSS supports consistent layout and styling decisions across those components. Together, they suit a company site where the design must remain coherent as content changes.",
        ],
      },
      {
        title: "What this project demonstrates",
        paragraphs: [
          "The project demonstrates my frontend development direction: responsive layouts, reusable interface patterns, and a clear business presentation. It is a useful example for teams considering a React or Next.js website instead of a traditional CMS-driven implementation.",
          "A similar engagement would begin by confirming which content needs frequent editing and which interactions are essential. Those requirements determine whether a static content structure is sufficient or whether the project needs a separate content-management workflow.",
        ],
      },
      {
        title: "Applying the approach to your website",
        paragraphs: [
          "A redesign should preserve useful content and familiar user journeys while addressing the weaknesses of the old structure. Before estimating a comparable project, I would review your existing pages, brand assets, required integrations, and deployment arrangements. That review keeps the technical choices tied to the site's real purpose.",
        ],
      },
    ],
    considerations: [
      "Company identity and service clarity",
      "Responsive frontend composition",
      "Next.js and Tailwind CSS",
      "Reusable page elements",
    ],
    service: "frontend-development",
  } as const;
const project = {
    title: "Aan Nahl Website",
    slug: "aan-nahl",
    description:
      "A responsive web view for our company, redesigned with Next.js and Tailwind.",
    url: "https://aannahl-portfolio-with-nextjs.vercel.app/",
    image: "/images/portfolio-aan-nahl.webp",
    alt: "Aan Nahl software company website project",
    width: 1905,
    height: 916,
    tags: ["NEXT.JS", "TAILWIND CSS"],
  } as const;

export const metadata = pageMetadata(
  study.metaTitle,
  study.description,
  "/portfolio/aan-nahl",
);

export default function CaseStudyPage() {
  return (
    <>
      <PageHero eyebrow={study.name} title={`${study.name}: Website Case Study`} description={study.summary} path="/portfolio/aan-nahl" parents={[{ name: "Portfolio", path: "/portfolio" }]}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit the project</a>
        <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: `${study.name} website case study`, description: study.description, url: `${siteUrl}/portfolio/aan-nahl`, image: `${siteUrl}${project.image}`, author: { "@type": "Person", name: siteOwner, url: siteUrl } }} />
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
