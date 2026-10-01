import Link from "next/link";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import { PageHero, Section, ProjectCta, Questions } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const service = {
    slug: "seo-and-orm",
    title: "SEO & Online Reputation Management",
    metaTitle: "SEO & ORM Services in Dhaka | Ahsanul Haque Chowdhury",
    description:
      "Technical SEO, on-page optimization, backlink reviews, and online reputation support for businesses and professionals, by Ahsanul Haque Chowdhury.",
    intro:
      "Search visibility depends on a website people and search engines can understand. I connect technical SEO with clear content and consistent professional information, helping businesses and individuals present their work accurately across their website and relevant online profiles.",
    audience:
      "For professionals and businesses that need a stronger search foundation, consistent brand information, or organized support for their online reputation.",
    sections: [
      {
        title: "Find the issues that limit discovery",
        text: "I review crawlability, indexable pages, canonical URLs, internal links, redirects, and sitemap coverage. Where access is available, Google Search Console can help distinguish an indexing problem from a content or visibility problem. Recommendations are prioritized by their impact and the effort needed to implement them.",
      },
      {
        title: "Match pages to useful search intent",
        text: "On-page work connects each page to a distinct purpose. This can include titles, descriptions, headings, image alternatives, service explanations, and links to supporting pages. The aim is useful coverage of a topic, with accurate claims and readable copy, rather than repeating the same keywords in every paragraph.",
      },
      {
        title: "Keep your professional information consistent",
        text: "Reputation work starts with understanding which assets you control and whether they accurately represent you. I review names, biographies, links, service information, and outdated references. Corrections and publishing plans should use approved facts and maintain consistent information across the website and relevant profiles.",
      },
      {
        title: "Review progress with context",
        text: "Search performance changes over time and depends on competition, content quality, technical health, and other factors. Reporting should identify completed fixes, remaining issues, and observable changes without treating every movement as proof of one action. I do not promise a particular ranking or guaranteed removal of third-party content.",
      },
    ],
    deliverables: [
      "Prioritized technical and on-page review",
      "Page intent, metadata, and internal-link recommendations",
      "Backlink and owned-profile review",
      "Approved biography and content consistency checks",
      "Issue tracking and follow-up recommendations",
    ],
    questions: [
      {
        question: "Can you guarantee first-page Google rankings?",
        answer:
          "No. Search engines control rankings and indexing. The work focuses on accurate content, accessible pages, technical improvements, and a realistic plan for ongoing visibility.",
      },
      {
        question: "What access is useful for an SEO review?",
        answer:
          "Your website URL is enough for an initial discussion. Search Console, analytics, and CMS access may be useful after the scope and access permissions are agreed.",
      },
    ],
    project: "adriana-kugler",
  } as const;
const relatedProject = {"slug": "adriana-kugler", "name": "Adriana Kugler"} as const;
const ServiceIcon = FaSearch;

export const metadata = pageMetadata(
  service.metaTitle,
  service.description,
  "/services/seo-and-orm",
);

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.title}
        description={service.intro}
        path="/services/seo-and-orm"
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
          "@id": `${siteUrl}/services/seo-and-orm#service`,
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services/seo-and-orm`,
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
