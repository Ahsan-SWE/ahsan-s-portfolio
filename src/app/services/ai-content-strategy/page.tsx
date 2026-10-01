import Link from "next/link";
import { FaCheckCircle, FaMagic } from "react-icons/fa";
import { PageHero, Section, ProjectCta, Questions } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const service = {
    slug: "ai-content-strategy",
    title: "AI-Assisted Content & Prompting",
    metaTitle: "AI Content & Prompting | Ahsanul Haque Chowdhury",
    description:
      "Clear briefs, structured prompts, and human-reviewed website content. Ahsanul Haque Chowdhury supports practical AI-assisted content workflows.",
    intro:
      "AI can help organize ideas and produce a first draft, but a useful website still needs accurate, distinctive content. I build content briefs and prompts around the audience, the page's purpose, and approved source information, then review the output before publication.",
    audience:
      "For professionals, marketing teams, and businesses that need a repeatable way to prepare website copy, biographies, service descriptions, and supporting content.",
    sections: [
      {
        title: "Create a brief before generating text",
        text: "A good brief defines the reader, the questions the page should answer, its key message, and the evidence available. It also identifies what should not be claimed. This reduces generic copy and helps keep a group of pages consistent without making every page sound the same.",
      },
      {
        title: "Use prompts with useful constraints",
        text: "I work with tools such as ChatGPT and Gemini to structure drafts, explore wording, and organize long source material. Prompts can specify tone, length, headings, terminology, and factual boundaries. These instructions improve consistency, but the output still needs editorial review and source checking.",
      },
      {
        title: "Review for accuracy and originality",
        text: "A draft should be checked for unsupported statistics, repeated phrasing, missing context, and awkward transitions. Professional biographies require particular care with titles, dates, affiliations, and achievements. Content is rewritten where necessary to reflect the subject's actual work rather than a generic template.",
      },
      {
        title: "Prepare content for its destination",
        text: "A service page, project summary, and short profile serve different purposes. I adapt structure and calls to action to the destination, then check titles, links, and formatting. Search intent informs the writing, but readability and factual accuracy remain more useful than forced keyword repetition.",
      },
    ],
    deliverables: [
      "Audience and page-specific content briefs",
      "Reusable prompts with factual boundaries",
      "Edited website and profile copy",
      "Metadata and formatting review",
      "A practical content quality checklist",
    ],
    questions: [
      {
        question: "Is AI output published without review?",
        answer:
          "No. Drafts should be checked against approved sources and edited for accuracy, clarity, and the intended audience before publication.",
      },
      {
        question: "What source material should I provide?",
        answer:
          "Share your approved biography, service details, brand guidance, and any supporting documents. Do not include confidential information that is unnecessary for the task.",
      },
    ],
    project: "richard-pestell",
  } as const;
const relatedProject = {"slug": "richard-pestell", "name": "Richard Pestell"} as const;
const ServiceIcon = FaMagic;

export const metadata = pageMetadata(
  service.metaTitle,
  service.description,
  "/services/ai-content-strategy",
);

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.title}
        description={service.intro}
        path="/services/ai-content-strategy"
        parents={[{ name: "Services", path: "/services" }]}
      >
        <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="button-primary">
          Discuss this service
        </Link>
      </PageHero>

      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${siteUrl}/services/ai-content-strategy#service`,
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services/ai-content-strategy`,
          serviceType: service.title,
          provider: { "@id": `${siteUrl}/#person` },
        }}
      />

      <div className="page-container grid items-start gap-8 py-12 lg:grid-cols-[1.6fr_1fr]">
        <Reveal effect="fade-right" duration={1000}>
          <div className="reading-copy">
            <div className="mb-8 flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-blue-50 p-5 dark:bg-blue-950/20">
              <span className="feature-icon shrink-0" aria-hidden="true"><ServiceIcon /></span>
              <p className="!mt-0 text-base leading-relaxed"><span className="focus-point">Service focus:</span> {service.audience}</p>
            </div>
            {service.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
        </Reveal>

        <Reveal effect="fade-left" delay={100} duration={1000}>
          <aside className="surface-panel animated-card lg:sticky lg:top-28">
            <span className="feature-icon" aria-hidden="true"><ServiceIcon /></span>
            <p className="eyebrow mt-5">A good fit for</p>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">{service.audience}</p>
            <h2 className="mt-7 text-xl font-bold">Potential deliverables</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {service.deliverables.map((item) => <li key={item} className="flex gap-3"><FaCheckCircle className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" />{item}</li>)}
            </ul>
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="button-primary mt-7 w-full">Start a conversation</Link>
          </aside>
        </Reveal>
      </div>

      {relatedProject.slug ? (
        <Section title="Related website example" intro="A related case study can help show how the service connects with a real website context, while the final approach would still be shaped around your own content, audience, and technical requirements.">
          <Link href={`/portfolio/${relatedProject.slug}`} className="text-link">View the {relatedProject.name} case study</Link>
        </Section>
      ) : null}

      <Section title="Service questions" intro="These answers cover common starting points. A specific recommendation depends on the current website, access, content, and the result you want to achieve.">
        <Questions items={service.questions} />
      </Section>
      <ProjectCta text="Share the website, the main problem, and the outcome you want. I can help identify which parts of this service matter most and where the work should begin." />
    </>
  );
}
