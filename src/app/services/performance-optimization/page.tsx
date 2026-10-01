import Link from "next/link";
import { FaCheckCircle, FaTachometerAlt } from "react-icons/fa";
import { PageHero, Section, ProjectCta, Questions } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const service = {
    slug: "performance-optimization",
    title: "Website Performance Optimization",
    metaTitle: "Website Speed Optimization | Ahsanul Haque Chowdhury",
    description:
      "Improve website loading, responsiveness, and layout stability. Ahsanul Haque Chowdhury reviews images, fonts, JavaScript, and Core Web Vitals.",
    intro:
      "A useful performance project starts with evidence. I review how a website loads and responds, identify the resources that create unnecessary work, and make targeted changes while preserving the features and design visitors need.",
    audience:
      "For WordPress, React, and Next.js websites with slow pages, oversized media, delayed interactions, or unstable layouts on mobile and desktop.",
    sections: [
      {
        title: "Measure the pages that matter",
        text: "A home page score does not describe the entire website. I look at important page types and user journeys, with particular attention to mobile conditions. Lab tools help diagnose issues, while real-user data, when available, shows how actual visitors experience the site over time.",
      },
      {
        title: "Reduce unnecessary loading work",
        text: "Common opportunities include properly sized images, modern image formats, selective font loading, lazy-loaded offscreen media, and fewer blocking resources. The main visual should load promptly. Supporting images can wait until needed, with dimensions reserved so content does not shift as they arrive.",
      },
      {
        title: "Keep interaction responsive",
        text: "Large scripts and continuous background work can make a page feel slow after it has loaded. I review which features need JavaScript, whether animation can pause outside the viewport, and whether event handlers cause avoidable layout work. Reduced-motion preferences should be respected without hiding important content.",
      },
      {
        title: "Validate the trade-offs",
        text: "Optimization should not break a form, remove useful content, or change a working design unexpectedly. I compare the relevant pages after changes and check navigation, images, forms, and responsive layouts. Scores vary with hosting and test conditions, so I report the conditions and findings rather than promise a permanent perfect score.",
      },
    ],
    deliverables: [
      "Page-level performance diagnosis",
      "Image, font, and asset loading improvements",
      "JavaScript and animation review",
      "Core Web Vitals recommendations",
      "Before-and-after checks with stated test conditions",
    ],
    questions: [
      {
        question: "Will the design change?",
        answer:
          "The priority is to preserve the intended experience. Any visible trade-off that is needed for a meaningful improvement should be discussed before implementation.",
      },
      {
        question:
          "Does a high Lighthouse score guarantee good real-user performance?",
        answer:
          "No. Lighthouse is a lab test. Real-world results also depend on visitor devices, networks, hosting, content, and third-party services.",
      },
    ],
    project: "aan-nahl",
  } as const;
const relatedProject = {"slug": "aan-nahl", "name": "Aan-Nahl Software"} as const;
const ServiceIcon = FaTachometerAlt;

export const metadata = pageMetadata(
  service.metaTitle,
  service.description,
  "/services/performance-optimization",
);

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.title}
        description={service.intro}
        path="/services/performance-optimization"
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
          "@id": `${siteUrl}/services/performance-optimization#service`,
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services/performance-optimization`,
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
