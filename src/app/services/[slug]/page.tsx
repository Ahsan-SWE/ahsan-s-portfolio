import Link from "next/link";
import { notFound } from "next/navigation";
import type { IconType } from "react-icons";
import { FaChartLine, FaCheckCircle, FaCode, FaCubes, FaMagic, FaSearch, FaTachometerAlt } from "react-icons/fa";
import { PageHero, Section, ProjectCta, Questions } from "@/components/pages/page-shell";
import { Reveal } from "@/components/effects/reveal";
import { StructuredData } from "@/components/seo/json-ld";
import { serviceDetails } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

const serviceIconMap: Record<string, IconType> = {
  "frontend-development": FaCode,
  "seo-and-orm": FaSearch,
  "wordpress-development": FaCubes,
  "performance-optimization": FaTachometerAlt,
  "ai-content-strategy": FaMagic,
  "digital-marketing": FaChartLine,
};

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.metaTitle, service.description, `/services/${slug}`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);
  if (!service) notFound();
  const project = caseStudies.find((item) => item.slug === service.project);
  const ServiceIcon = serviceIconMap[service.slug] ?? FaCode;

  return (
    <>
      <PageHero eyebrow={service.title} title={service.title} description={service.intro} path={`/services/${slug}`} parents={[{ name: "Services", path: "/services" }]}>
        <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="button-primary">Discuss this service</Link>
      </PageHero>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "Service", "@id": `${siteUrl}/services/${slug}#service`, name: service.title, description: service.description, url: `${siteUrl}/services/${slug}`, serviceType: service.title, provider: { "@id": `${siteUrl}/#person` } }} />

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
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{service.deliverables.map((item) => <li key={item} className="flex gap-3"><FaCheckCircle className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" />{item}</li>)}</ul>
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="button-primary mt-7 w-full">Start a conversation</Link>
          </aside>
        </Reveal>
      </div>

      {project ? <Section title="Related website example" intro="A related case study can help show how the service connects with a real website context, while the final approach would still be shaped around your own content, audience, and technical requirements."><Link href={`/portfolio/${project.slug}`} className="text-link">View the {project.name} case study</Link></Section> : null}
      <Section title="Service questions" intro="These answers cover common starting points. A specific recommendation depends on the current website, access, content, and the result you want to achieve."><Questions items={service.questions} /></Section>
      <ProjectCta text="Share the website, the main problem, and the outcome you want. I can help identify which parts of this service matter most and where the work should begin." />
    </>
  );
}
