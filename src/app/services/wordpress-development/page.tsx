import Link from "next/link";
import { FaCheckCircle, FaCubes } from "react-icons/fa";
import { PageHero, Section, ProjectCta, Questions } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const service = {
    slug: "wordpress-development",
    title: "Custom WordPress & ACF Development",
    metaTitle: "Custom WordPress & ACF | Ahsanul Haque Chowdhury",
    description:
      "Custom WordPress websites and ACF content sections by Ahsanul Haque Chowdhury. Flexible editing, responsive templates, and practical technical SEO.",
    intro:
      "Your team should be able to update a website without rebuilding its design. I develop custom WordPress websites with Advanced Custom Fields (ACF), connecting structured editing fields to purpose-built templates and reusable sections that fit the client's content.",
    audience:
      "For businesses, professional portfolios, and agencies that need a custom WordPress theme with a manageable editing experience and room to grow.",
    sections: [
      {
        title: "Design the editing experience",
        text: "I start by identifying what changes often: biographies, services, images, project details, and contact information. These become organized fields with clear labels. The goal is to give editors meaningful control while preserving consistent spacing, typography, and page structure on the public website.",
      },
      {
        title: "Build flexible sections with ACF",
        text: "Reusable sections can support text, images, calls to action, and repeated content without hard-coding a complete page for every update. ACF Flexible Content and repeater fields can be used where the brief requires them. Empty optional fields should not leave broken layouts or unnecessary blank areas.",
      },
      {
        title: "Connect functionality to the brief",
        text: "Custom templates, navigation, archives, and contact forms should support the business's actual needs. I review plugin choices, avoid overlapping functionality where possible, and test the editing flow as well as the visitor experience. Features are selected for the project rather than added simply because a plugin exists.",
      },
      {
        title: "Maintain the site after launch",
        text: "A custom site still needs updates, backups, and checks when content or plugins change. I can help investigate layout problems, broken links, form issues, and performance regressions. A practical handoff explains which content is editable, how the templates fit together, and what should be checked before an update goes live.",
      },
    ],
    deliverables: [
      "Custom responsive WordPress theme templates",
      "ACF field groups and reusable content sections",
      "Client-friendly content editing",
      "Contact form integration and delivery checks",
      "Technical SEO, responsive QA, and handoff notes",
    ],
    questions: [
      {
        question: "Will I be able to edit the content myself?",
        answer:
          "The editing fields are designed around your content needs. Text, images, and agreed reusable sections can be managed in WordPress without changing template code.",
      },
      {
        question: "Is an ACF Pro license included?",
        answer:
          "License needs are confirmed with the project scope. Features such as Flexible Content may require ACF Pro; any paid tools and ownership arrangements should be agreed before development.",
      },
    ],
    project: "adriana-kugler",
  } as const;
const relatedProject = {"slug": "adriana-kugler", "name": "Adriana Kugler"} as const;
const ServiceIcon = FaCubes;

export const metadata = pageMetadata(
  service.metaTitle,
  service.description,
  "/services/wordpress-development",
);

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.title}
        description={service.intro}
        path="/services/wordpress-development"
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
          "@id": `${siteUrl}/services/wordpress-development#service`,
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services/wordpress-development`,
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
