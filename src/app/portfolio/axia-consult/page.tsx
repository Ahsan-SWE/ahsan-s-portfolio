import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const siteOwner = "Ahsanul Haque Chowdhury";
const study = {
    slug: "axia-consult",
    name: "Axia Consult",
    category: "Consulting website / WordPress",
    metaTitle: "Axia Consult Case Study | Ahsanul Haque Chowdhury",
    description:
      "Explore the Axia Consult WordPress website project, presenting a specialist consulting firm through clear service information and professional design.",
    summary:
      "A WordPress website for Axia Consult, a U.S.-based global consulting firm specializing in space domain awareness.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "Specialist consulting firms often need to communicate complex work to people with different levels of technical knowledge. The Axia Consult project concerns a U.S.-based global consulting firm specializing in space domain awareness, with WordPress as its website platform.",
          "This is a different communication challenge from a personal portfolio. The website needs to present a firm and its area of work, helping a relevant visitor recognize the subject and explore the information that matters to them.",
        ],
      },
      {
        title: "Making specialist information approachable",
        paragraphs: [
          "The design considerations for this kind of site begin with hierarchy. Clear section titles, short introductory explanations, and consistent spacing help readers move from a broad understanding to more detailed material without losing their place.",
          "Professional presentation also depends on restraint. The purpose of the layout is to support the firm's content, so decorative elements should not compete with important service information. Images and text need to work together across mobile and desktop views.",
        ],
      },
      {
        title: "The website development perspective",
        paragraphs: [
          "The project is listed in my portfolio as WordPress work using HTML, CSS, and JavaScript. That combination supports a tailored interface while retaining a familiar publishing environment for content updates.",
          "For a comparable consulting website, I would clarify who edits the site, how services are organized, and which pages support inquiries. Those decisions guide the content fields, templates, and navigation before implementation begins.",
        ],
      },
      {
        title: "A useful reference for service businesses",
        paragraphs: [
          "This project is relevant to businesses that need a credible web presence for a focused area of expertise. It provides a visual reference for discussing service presentation and the relationship between technical subject matter and accessible design. Any claims about the firm's capabilities must remain grounded in its approved content.",
          "The scope of a similar engagement would be agreed around your actual services, source material, and publishing needs, rather than copying another organization's messaging.",
        ],
      },
    ],
    considerations: [
      "Specialist consulting content",
      "Professional business presentation",
      "Clear service hierarchy",
      "WordPress and custom frontend styling",
    ],
    service: "wordpress-development",
  } as const;
const project = {
    title: "A Consulting Firm Website",
    slug: "axia-consult",
    description:
      "This website is based on wordpress for Axia Consult | U.S.-based global consulting firm specializing in space domain awareness (SDA).",
    url: "https://axiaconsult.com/",
    image: "/images/portfolio-axia-consult.webp",
    alt: "Axia Consult global consulting firm website project",
    width: 1902,
    height: 949,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  } as const;

export const metadata = pageMetadata(
  study.metaTitle,
  study.description,
  "/portfolio/axia-consult",
);

export default function CaseStudyPage() {
  return (
    <>
      <PageHero eyebrow={study.name} title={`${study.name}: Website Case Study`} description={study.summary} path="/portfolio/axia-consult" parents={[{ name: "Portfolio", path: "/portfolio" }]}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit the project</a>
        <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: `${study.name} website case study`, description: study.description, url: `${siteUrl}/portfolio/axia-consult`, image: `${siteUrl}${project.image}`, author: { "@type": "Person", name: siteOwner, url: siteUrl } }} />
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
