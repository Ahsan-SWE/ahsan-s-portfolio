import Link from "next/link";
import { FaCheckCircle, FaChartLine } from "react-icons/fa";
import { PageHero, Section, ProjectCta, Questions } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const service = {
    slug: "digital-marketing",
    title: "Digital Marketing Support",
    metaTitle: "Digital Marketing Support | Ahsanul Haque Chowdhury",
    description:
      "Website-focused digital marketing support with content planning, landing-page improvements, and measurement guidance from Ahsanul Haque Chowdhury.",
    intro:
      "Marketing works better when the message, destination page, and next action fit together. I support website-focused digital marketing with clear content, practical landing-page improvements, and an organized way to review what happens after people arrive.",
    audience:
      "For small businesses and professional service providers who need their website and content to support a clear inquiry or conversion goal.",
    sections: [
      {
        title: "Connect the campaign to a useful page",
        text: "A visitor who clicks a message should find relevant information quickly. I review the page's headline, service explanation, supporting work, and contact path. The aim is to reduce confusion and help a potential client understand whether the service matches their needs.",
      },
      {
        title: "Plan consistent, purposeful content",
        text: "Content planning should reflect real services and questions from prospective clients. I can help organize topics, refresh outdated information, and adapt content for the website and relevant profiles. A manageable publishing plan is more useful than a large schedule that a team cannot maintain.",
      },
      {
        title: "Make measurement understandable",
        text: "Google Analytics and campaign reporting can support better decisions when the goals are clear. Measurement planning starts with the actions that matter, such as a completed inquiry or a visit to an important service page. Tracking choices should be appropriate to the project and respect visitor privacy.",
      },
      {
        title: "Improve through focused reviews",
        text: "After a campaign or content update, I review the available evidence and identify sensible next steps. A weak response may relate to audience fit, messaging, page usability, or the offer itself. Keeping these factors separate helps a business decide what to improve instead of changing everything at once.",
      },
    ],
    deliverables: [
      "Website and campaign message alignment",
      "Landing-page and contact-path review",
      "Practical content planning",
      "Analytics and conversion measurement guidance",
      "Clear follow-up actions based on available data",
    ],
    questions: [
      {
        question: "Can we start with a small project?",
        answer:
          "Yes. A focused landing-page review, content update, or website improvement can be a useful starting point before a broader engagement.",
      },
      {
        question: "Are advertising costs included?",
        answer:
          "No advertising budget is assumed. Any campaign management scope, platform access, and advertising spend must be agreed separately.",
      },
    ],
    project: "axia-consult",
  } as const;
const relatedProject = {"slug": "axia-consult", "name": "Axia Consult"} as const;
const ServiceIcon = FaChartLine;

export const metadata = pageMetadata(
  service.metaTitle,
  service.description,
  "/services/digital-marketing",
);

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.title}
        description={service.intro}
        path="/services/digital-marketing"
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
          "@id": `${siteUrl}/services/digital-marketing#service`,
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services/digital-marketing`,
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
