import Image from "next/image";
import Link from "next/link";
import { FaBriefcase, FaCode, FaGraduationCap, FaSearch, FaTachometerAlt, FaWordpress } from "react-icons/fa";
import { PageHero, ProjectCta, Section } from "@/components/pages/page-shell";
import { pageMetadata } from "@/lib/seo";

const skillIcons = [FaCode, FaWordpress, FaSearch, FaTachometerAlt];
const skillVisuals = [
  { src: "/images/expertise/frontend-development.svg", alt: "Frontend development interface illustration" },
  { src: "/images/expertise/wordpress-cms.svg", alt: "WordPress and custom CMS illustration" },
  { src: "/images/expertise/search-reputation.svg", alt: "Search visibility and online reputation illustration" },
  { src: "/images/expertise/performance-content.svg", alt: "Website performance and content workflow illustration" },
] as const;

const experiences = [
  {
    period: "02/2026 - Present",
    title: "Senior Executive Software Development",
    company: "Aan-Nahl Software",
    tone: "brand",
    responsibilities: [
      "Build full custom WordPress websites for clients using Advanced Custom Fields (ACF).",
      "Develop reusable theme sections, flexible layouts, and structured content fields.",
      "Implement responsive interfaces and client-specific website functionality.",
      "Integrate contact forms and maintain reliable content editing workflows.",
      "Improve technical SEO, accessibility, and website performance.",
      "Test, troubleshoot, and maintain custom websites through launch and updates.",
    ],
  },
 
  {
    period: "01/2025 - 01/2026",
    title: "Website Management",
    company: "Aan-Nahl Software",
    tone: "purple",
    responsibilities: [
      "WordPress Theme Customization & Building.",
      "Link Building Techniques & Backlink Audit.",
      "On-Page Optimization & Web 2.0s.",
      "Custom Feature add & Plugin Management.",
      "Content Creation and Management.",
      "Performance Optimization.",
    ],
  },
   {
    period: "02/2024 - 12/2024",
    title: "Senior ORM Executive",
    company: "Aan-Nahl Software",
    tone: "brand",
    responsibilities: [
      "Online Reputation Management.",
      "Search Engine Optimization (SEO).",
      "Reputation Crisis Management.",
      "CMS Website Maintenance.",
      "Website Performance Tracking.",
      "Custom To-do Jobs.",
    ],
  },
] as const;

const education = [
  {
    period: "2020 - 2023",
    title: "B.S.C in Software Engineering",
    institution: "Daffodil International University",
    result: "CGPA: 3.39 / 4.00",
    tone: "brand",
    description:
      "I completed my Bachelor's degree in Software Engineering. My university journey helped me grow personally and professionally, building confidence, discipline, and a continuous learning mindset.",
  },
  {
    period: "2017 - 2019",
    title: "HSC (Science)",
    institution: "Eminence College",
    result: "GPA: 3.50 / 5.00",
    tone: "purple",
    description:
      "My Higher Secondary education in Science strengthened my foundation in mathematics, analytical thinking, and structured problem-solving before I moved into software engineering.",
  },
] as const;

const skillGroups = [
  {
    title: "Frontend development",
    tools: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "React", "Next.js"],
    text: "Responsive layouts, reusable components, semantic page structure, accessible navigation, and interactive features that serve a clear visitor task.",
  },
  {
    title: "WordPress & custom CMS",
    tools: ["WordPress", "ACF", "Custom themes", "CMS maintenance"],
    text: "Client-specific templates, structured content fields, reusable sections, plugin integration, and an editing workflow that fits the content.",
  },
  {
    title: "Search & reputation",
    tools: ["Technical SEO", "On-page SEO", "ORM", "Backlink reviews"],
    text: "Crawlability, page metadata, internal links, accurate professional information, and consistent content across owned digital assets.",
  },
  {
    title: "Performance & content",
    tools: ["Core Web Vitals", "Google Analytics", "ChatGPT", "Gemini"],
    text: "Website performance reviews, image and resource optimization, content briefs, structured prompts, and human-reviewed publishing support.",
  },
];

const expertiseResume = "https://drive.google.com/uc?export=download&id=1NOWIHK20Vp7q-xfOaAP-apKsoSBUvpbW";

export const metadata = pageMetadata(
  "Experience & Expertise | Ahsanul Haque Chowdhury",
  "Review Ahsanul Haque Chowdhury's experience across software development, WordPress, SEO, ORM, website management, and technical optimization.",
  "/expertise",
);

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title="Experience connecting code, content, and search."
        description="My work has progressed from website management and ORM into custom software and website development. That path gives me a broader view of how a site is planned, built, edited, optimized, discovered, and maintained after launch."
        path="/expertise"
        type="ProfilePage"
      >
        <a href={expertiseResume} className="button-primary" download>Download resume</a>
        <Link href="/portfolio" className="button-secondary">See the work</Link>
      </PageHero>

      <Section title="Work Experience" intro="A concise view of my progression at Aan-Nahl Software, from website management and ORM to a development role focused on custom client websites and maintainable digital systems.">
        <div className="space-y-5">
          {experiences.map((item) => (
            <article key={`${item.period}-${item.title}`} className="surface-panel animated-card grid gap-5 md:grid-cols-[180px_1fr]">
              <div>
                <span className="feature-icon mb-4" aria-hidden="true"><FaBriefcase /></span>
                <p className="eyebrow">{item.period}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-1 font-semibold text-blue-700 dark:text-blue-300">{item.company}</p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
                  {item.responsibilities.map((text) => <li key={text} className="flex gap-2"><span className="text-blue-600 dark:text-blue-300">✓</span>{text}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Core capability snapshot from Ahsanul Haque Chowdhury" intro="The strongest part of my experience is the overlap between development, CMS work, search visibility, and performance. These areas often affect one another on the same project.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index % skillIcons.length];
            return (
              <article key={group.title} className="surface-panel animated-card overflow-hidden !p-0">
                <div className="capability-visual relative overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
                  <Image src={skillVisuals[index % skillVisuals.length].src} alt={skillVisuals[index % skillVisuals.length].alt} width={640} height={360} className="h-40 w-full object-cover" />
                  <span className="feature-icon absolute bottom-4 left-4 !h-12 !w-12" aria-hidden="true"><Icon /></span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{group.title}</h3>
                  <p className="card-copy">{group.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.tools.map((tool) => <span key={tool} className="tag">{tool}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section title="Education" intro="My academic background in software engineering supports the practical development, problem-solving, and continuous learning required in client website work.">
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <article key={item.title} className="surface-panel animated-card">
              <span className="feature-icon" aria-hidden="true"><FaGraduationCap /></span>
              <p className="eyebrow mt-5">{item.period}</p>
              <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 font-semibold text-blue-700 dark:text-blue-300">{item.institution}</p>
              <p className="mt-2 text-slate-700 dark:text-slate-200">{item.result}</p>
              {"description" in item && item.description ? <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">{item.description}</p> : null}
            </article>
          ))}
        </div>
      </Section>
      <ProjectCta title="Want to discuss a project?" text="If your project touches development, WordPress, SEO, ORM, performance, or content structure, I can help define where the work should start and how the pieces fit together." />
    </>
  );
}
