import Link from "next/link";
import { FaCheckCircle, FaCode } from "react-icons/fa";
import { PageHero, Section, ProjectCta, Questions } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const service = {
    slug: "frontend-development",
    title: "Frontend Development",
    metaTitle: "React & Next.js Development | Ahsanul Haque Chowdhury",
    description:
      "Responsive React and Next.js websites by Ahsanul Haque Chowdhury in Dhaka. Clear navigation, accessible interfaces, and maintainable frontend code.",
    intro:
      "A website should make your business easy to understand and your next step easy to find. I build responsive interfaces with HTML, CSS, JavaScript, Tailwind CSS, React, and Next.js, with attention to the details people notice on both a phone and a larger screen.",
    audience:
      "For businesses, agencies, and independent professionals who need a new website, a clearer service presentation, or a reliable frontend for an existing project.",
    sections: [
      {
        title: "Start with the visitor's task",
        text: "Before building a component, I map the pages, important content, and actions visitors need. This helps determine the navigation, heading structure, contact options, and layout priorities. A clear structure makes it easier to turn a design into a useful website and reduces avoidable changes later.",
      },
      {
        title: "Build reusable, responsive interfaces",
        text: "I use reusable components for repeated elements such as project cards, service summaries, and navigation. Layouts adapt to different screen sizes without relying on a separate mobile site. I pay attention to text wrapping, touch targets, keyboard access, form labels, and visible focus states throughout the interface.",
      },
      {
        title: "Choose rendering deliberately",
        text: "Informational pages benefit from content that arrives in the initial HTML. With Next.js, I keep static content on the server and add client-side JavaScript where interaction needs it. This approach supports crawlability and can reduce unnecessary browser work while preserving interactive features that help visitors.",
      },
      {
        title: "Prepare for a maintainable handoff",
        text: "A finished interface should be understandable to the next person who edits it. I organize content, components, and configuration so routine updates do not require copying entire pages. The handoff can include source files, deployment instructions, and a walkthrough of the parts your team will update most often.",
      },
    ],
    deliverables: [
      "Responsive page layouts and reusable components",
      "Accessible navigation and contact interfaces",
      "Page metadata and sensible internal links",
      "Image and font loading improvements",
      "Browser checks and deployment guidance",
    ],
    questions: [
      {
        question: "Can you work from an existing design?",
        answer:
          "Yes. Share the design, current site, or reference pages with your brief. I review the required interactions and responsive behavior before confirming scope.",
      },
      {
        question: "Can you improve an existing React or Next.js website?",
        answer:
          "Yes. An existing codebase can be reviewed for navigation, component structure, rendering, accessibility, and performance issues before changes are prioritized.",
      },
    ],
    project: "aan-nahl",
  } as const;
const relatedProject = {"slug": "aan-nahl", "name": "Aan-Nahl Software"} as const;
const ServiceIcon = FaCode;

export const metadata = pageMetadata(
  service.metaTitle,
  service.description,
  "/services/frontend-development",
);

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.title}
        description={service.intro}
        path="/services/frontend-development"
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
          "@id": `${siteUrl}/services/frontend-development#service`,
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services/frontend-development`,
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
