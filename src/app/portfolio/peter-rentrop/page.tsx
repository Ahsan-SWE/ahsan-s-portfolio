import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const siteOwner = "Ahsanul Haque Chowdhury";
const study = {
    slug: "peter-rentrop",
    name: "Peter Rentrop, MD",
    category: "Professional website / WordPress",
    metaTitle: "Peter Rentrop Case Study | Ahsanul Haque Chowdhury",
    description:
      "A WordPress-based professional website project for cardiologist Peter Rentrop, MD, with a focus on clear information and readable page structure.",
    summary:
      "A WordPress-based website presentation for Peter Rentrop, MD, a cardiologist and medical director, supported by a frontend demonstration.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "Professional medical websites need a careful balance of biography, expertise, and accessible presentation. This portfolio project is a website for Peter Rentrop, MD, a cardiologist and medical director. The project uses WordPress alongside HTML, CSS, and JavaScript.",
          "The linked version is a frontend demo. It is presented as a design and development example, so visitors can review the interface without confusing the demo with a medical consultation service.",
        ],
      },
      {
        title: "Organizing a professional profile",
        paragraphs: [
          "The central communication task is to help a visitor understand who the professional is and where to find relevant information. A structured biography and readable headings make detailed content easier to scan, particularly for readers arriving directly from a search result.",
          "For a project in this category, professional information needs editorial care. Qualifications, roles, and medical statements should come from approved sources. Design decisions should help readers navigate that information without turning a professional profile into unsupported promotional claims.",
        ],
      },
      {
        title: "WordPress as the content foundation",
        paragraphs: [
          "WordPress is suited to websites where profile information and supporting articles need updates over time. A custom frontend can organize those materials around the professional's needs while maintaining a consistent visual system across pages.",
          "The relevant development considerations include responsive text sizing, image presentation, article navigation, and contact visibility. A comparable project would also require content review and testing of the final production environment, especially where forms or third-party tools are involved.",
        ],
      },
      {
        title: "What a prospective client can review",
        paragraphs: [
          "The demonstration offers a reference for a professional service website with substantial written content. When discussing a similar build, we can use it to identify the layout patterns you prefer, the sections you need, and the editing controls your team expects. The final scope would reflect your own profession, audience, and approved information.",
        ],
      },
    ],
    considerations: [
      "Professional profile and biography",
      "Readable long-form information",
      "WordPress-based content management",
      "Clearly identified frontend demo",
    ],
    service: "wordpress-development",
  } as const;
const project = {
    title: "A Cardiologist Website",
    slug: "peter-rentrop",
    description:
      "This website is based on wordpress for Peter Rentrop, MD, a cardiologist and medical director.",
    url: "https://demo-peter-rentrop.vercel.app/",
    image: "/images/portfolio-peter-rentrop.webp",
    alt: "Peter Rentrop cardiologist website project",
    width: 1902,
    height: 902,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  } as const;

export const metadata = pageMetadata(
  study.metaTitle,
  study.description,
  "/portfolio/peter-rentrop",
);

export default function CaseStudyPage() {
  return (
    <>
      <PageHero eyebrow={study.name} title={`${study.name}: Website Case Study`} description={study.summary} path="/portfolio/peter-rentrop" parents={[{ name: "Portfolio", path: "/portfolio" }]}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit the project</a>
        <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: `${study.name} website case study`, description: study.description, url: `${siteUrl}/portfolio/peter-rentrop`, image: `${siteUrl}${project.image}`, author: { "@type": "Person", name: siteOwner, url: siteUrl } }} />
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
