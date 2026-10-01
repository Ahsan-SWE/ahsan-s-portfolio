import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const siteOwner = "Ahsanul Haque Chowdhury";
const study = {
    slug: "andrea-jaeger",
    name: "Andrea Jaeger Philanthropy",
    category: "Philanthropy / Custom WordPress landing page",
    metaTitle: "Andrea Jaeger Case Study | Ahsanul Haque Chowdhury",
    description:
      "A custom WordPress one-page philanthropy website for Andrea Jaeger, with focused storytelling and a clear landing-page structure.",
    summary:
      "A custom WordPress one-page landing website focused on Andrea Jaeger's philanthropy, bringing the presentation into a single guided page.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "Some websites benefit from a focused single-page structure. The Andrea Jaeger philanthropy project was presented as a custom WordPress one-page landing website, with its core story brought together in one place.",
          "The purpose of a landing-page format is to create a coherent reading path. Instead of asking visitors to choose among many pages immediately, the content can introduce the subject, develop the context, and guide readers toward relevant next steps.",
        ],
      },
      {
        title: "Designing a clear reading sequence",
        paragraphs: [
          "For philanthropy-related content, images and written material need to work together with care. The sequence of sections should help explain the subject without relying on exaggerated claims or distracting interface elements.",
          "A focused layout still requires good navigation and readable spacing. On a smaller screen, sections need enough separation to remain understandable, while images should retain a useful view of their content rather than being cropped without a clear reason.",
        ],
      },
      {
        title: "Custom development within WordPress",
        paragraphs: [
          "The project combines custom frontend work with WordPress. This allows a tailored page presentation while keeping content updates within a familiar CMS. The portfolio entry identifies HTML, CSS, JavaScript, and a custom WordPress landing-page approach.",
          "For a similar brief, the editing setup would be planned around the information that changes most often. Text, photographs, and calls to action can be organized so an editor does not need to reconstruct the layout for routine updates.",
        ],
      },
      {
        title: "Choosing the right scope",
        paragraphs: [
          "A single-page website can be appropriate when the message is focused and the content is limited. As the subject grows, dedicated pages may become useful for deeper information. The decision should follow the audience's needs and content depth rather than a preference for a particular site format.",
          "This project provides a reference for a concise, purpose-led WordPress presentation and a starting point for discussing how much structure your own website needs.",
        ],
      },
    ],
    considerations: [
      "Focused one-page reading journey",
      "Philanthropy-related storytelling",
      "Custom WordPress landing-page layout",
      "Responsive text and photography",
    ],
    service: "wordpress-development",
  } as const;
const project = {
    title: "Philanthropy Website",
    slug: "andrea-jaeger",
    description:
      "A custom WordPress one-pager landing page for the Philanthropy website of Andrea Jaeger.",
    url: "https://andreajaegerphilanthropy.com/",
    image: "/images/portfolio-little-star.webp",
    alt: "Andrea Jaeger philanthropy website project",
    width: 1896,
    height: 952,
    tags: ["HTML/CSS/JS", "CUSTOM LANDING PAGE WORDPRESS"],
  } as const;

export const metadata = pageMetadata(
  study.metaTitle,
  study.description,
  "/portfolio/andrea-jaeger",
);

export default function CaseStudyPage() {
  return (
    <>
      <PageHero eyebrow={study.name} title={`${study.name}: Website Case Study`} description={study.summary} path="/portfolio/andrea-jaeger" parents={[{ name: "Portfolio", path: "/portfolio" }]}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit the project</a>
        <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: `${study.name} website case study`, description: study.description, url: `${siteUrl}/portfolio/andrea-jaeger`, image: `${siteUrl}${project.image}`, author: { "@type": "Person", name: siteOwner, url: siteUrl } }} />
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
