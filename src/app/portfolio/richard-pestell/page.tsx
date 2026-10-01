import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const siteOwner = "Ahsanul Haque Chowdhury";
const study = {
    slug: "richard-pestell",
    name: "Richard Pestell",
    category: "Medical professional / WordPress",
    metaTitle: "Richard Pestell Case Study | Ahsanul Haque Chowdhury",
    description:
      "A professional WordPress website project for Richard Pestell, presenting medical and cancer-prevention-related work in a clear website format.",
    summary:
      "A professional website for Richard Pestell, with a focus on presenting medical work and cancer-prevention-related information through WordPress.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "A professional website can bring an individual's work into a central place that visitors can explore at their own pace. The Richard Pestell project is included in my portfolio as a medical doctor's website associated with cancer-prevention work.",
          "The project uses WordPress with HTML, CSS, and JavaScript. It is an example of adapting a content-managed website to a professional profile rather than using the same structure as a product store or software application.",
        ],
      },
      {
        title: "Presenting a substantial body of information",
        paragraphs: [
          "A profile in this field may need to serve visitors with different interests, from a brief introduction to more detailed professional information. The design challenge is to make the first step clear and let readers decide how deeply to explore.",
          "Readable typography, consistent headings, and purposeful image placement are especially useful when content carries much of the site's value. The interface should make approved material easier to find while keeping the professional's identity consistent across pages.",
        ],
      },
      {
        title: "Content and implementation considerations",
        paragraphs: [
          "WordPress provides a publishing foundation for maintaining written material over time. For similar work, I plan the templates and editing structure around the actual content types so updates remain manageable after launch.",
          "Medical and research-related material requires careful source handling. A website implementation should not invent qualifications, research findings, or health outcomes. The role of the development work is to present the approved information clearly and support an appropriate editorial review process.",
        ],
      },
      {
        title: "How this informs a future project",
        paragraphs: [
          "This example is relevant to professionals whose website needs to communicate a detailed body of work. A comparable brief would identify the primary audience, approved biography, supporting pages, and the team's editing responsibilities. From there, we can choose a structure that supports both an initial introduction and longer-term content growth.",
          "Explore the linked website and project screenshot to review the visual presentation in context.",
        ],
      },
    ],
    considerations: [
      "Professional identity and content clarity",
      "Readable information architecture",
      "Editorial care for medical content",
      "WordPress publishing workflow",
    ],
    service: "wordpress-development",
  } as const;
const project = {
    title: "A Medical Doctor's Website",
    slug: "richard-pestell",
    description:
      "A Medical Doctor's Website for Richard Pestell | Working for Cancer Prevention.",
    url: "https://richardpestell.com/",
    image: "/images/portfolio-richard-pestell.webp",
    alt: "Richard Pestell medical doctor website project",
    width: 1901,
    height: 946,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  } as const;

export const metadata = pageMetadata(
  study.metaTitle,
  study.description,
  "/portfolio/richard-pestell",
);

export default function CaseStudyPage() {
  return (
    <>
      <PageHero eyebrow={study.name} title={`${study.name}: Website Case Study`} description={study.summary} path="/portfolio/richard-pestell" parents={[{ name: "Portfolio", path: "/portfolio" }]}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button-primary">Visit the project</a>
        <Link href="/contact" className="button-secondary">Discuss a similar project</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: `${study.name} website case study`, description: study.description, url: `${siteUrl}/portfolio/richard-pestell`, image: `${siteUrl}${project.image}`, author: { "@type": "Person", name: siteOwner, url: siteUrl } }} />
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
