import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaCode,
  FaGraduationCap,
  FaSearch,
  FaSitemap,
} from "react-icons/fa";
import {
  PageHero,
  ProjectCta,
  Section,
} from "@/components/pages/page-shell";
import { pageMetadata } from "@/lib/seo";

const aboutPageContent = {
  resume:
    "https://drive.google.com/uc?export=download&id=1NOWIHK20Vp7q-xfOaAP-apKsoSBUvpbW",
  image: "/images/about_page_image.jpg",
  imageAlt:
    "Ahsanul Haque Chowdhury, software developer and SEO specialist in Dhaka",
  basedIn: "Uttara, Dhaka, Bangladesh",
  currentRole: "Senior Executive Software Development At Aan-Nahl Software",
  focus: "Frontend, WordPress, SEO, ORM",
} as const;

const approachItems = [
  {
    title: "Understand the requirement",
    text: "Define the audience, key content, required functions, and the result the website should support before choosing the implementation path.",
    icon: FaSearch,
    titleClass: "text-blue-700 dark:text-blue-300",
  },
  {
    title: "Build for real editing",
    text: "Use reusable structures and clear CMS fields so future updates do not depend on rebuilding the page or touching template code.",
    icon: FaSitemap,
    titleClass: "text-violet-700 dark:text-violet-300",
  },
  {
    title: "Review the full experience",
    text: "Check responsive behavior, accessibility, SEO fundamentals, performance, links, forms, and content consistency before handoff.",
    icon: FaCheckCircle,
    titleClass: "text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "Keep the system maintainable",
    text: "Organize components, content fields, and documentation so the site remains understandable when new pages, images, or case studies are added later.",
    icon: FaCode,
    titleClass: "text-amber-700 dark:text-amber-300",
  },
] as const;

export const metadata = pageMetadata(
  "About Ahsanul Haque Chowdhury | Developer & SEO Specialist",
  "Meet Ahsanul Haque Chowdhury, a Dhaka-based developer specializing in custom WordPress, Next.js, SEO, ORM, and website performance.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Development skills with a wider digital perspective."
        description="Ahsanul Haque Chowdhury combines frontend development, custom WordPress, SEO, ORM, website performance, and structured content workflows to build digital experiences that are practical to use, easier to maintain, and prepared for long-term search visibility."
        path="/about"
        type="ProfilePage"
      >
        <Link href="/portfolio" className="button-primary">
          Explore my work
        </Link>

        <a
          href={aboutPageContent.resume}
          className="button-secondary"
          download
        >
          Download resume
        </a>
      </PageHero>

      <section className="page-container grid items-center gap-10 py-12 lg:grid-cols-[1.35fr_.8fr]">
        <div className="reading-copy">
          <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-50 px-4 py-3 font-semibold text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            <FaGraduationCap aria-hidden="true" />
            Software engineering with practical website experience
          </div>

          <h2>Software engineering turned into practical web work</h2>

          <p>
            <span className="focus-point">Ahsanul Haque Chowdhury</span>{" "}
            completed his B.Sc. in Software Engineering at Daffodil
            International University. His technical background supports
            practical work across HTML, CSS, JavaScript, Tailwind CSS, React,
            Next.js, WordPress, and ACF, allowing him to work across both modern
            frontend development and content-managed websites.
          </p>

          <p>
            At Aan-Nahl Software, his professional experience has included
            website management, SEO, ORM, and custom development. Since February
            2025, his work has focused on{" "}
            <span className="focus-point">
              flexible client websites, technical quality, responsive
              development, and cleaner editing workflows
            </span>
            .
          </p>

          <p>
            He approaches every website as both a technical product and a
            communication system. His process considers{" "}
            <span className="focus-point">
              structure, performance, accessibility, content organization,
              search visibility, user experience, and CMS usability
            </span>{" "}
            so these elements support the same digital objective instead of
            functioning as separate parts of the project.
          </p>

          <p>
            <span className="focus-point">Ahsanul Haque Chowdhury</span> also
            considers what happens after a website goes live. His goal is to
            create digital systems that remain manageable, scalable,
            search-friendly, and easier to improve over time. This approach
            helps clients update content confidently, maintain consistency, and
            expand their websites without creating unnecessary technical
            complexity.
          </p>
        </div>

        <aside className="surface-panel animated-card overflow-hidden !p-0">
          <div className="bg-slate-100 dark:bg-slate-800">
            <Image
              src={aboutPageContent.image}
              alt={aboutPageContent.imageAlt}
              title="Ahsanul Haque Chowdhury"
              width={556}
              height={900}
              sizes="(max-width: 1023px) 90vw, 380px"
              className="mx-auto h-[480px] w-full object-cover"
            />
          </div>

          <dl className="grid gap-4 p-6 text-sm">
            <div>
              <dt className="text-slate-500 dark:text-slate-300">
                Based in
              </dt>
              <dd className="mt-1 font-semibold">
                {aboutPageContent.basedIn}
              </dd>
            </div>

            <div>
              <dt className="text-slate-500 dark:text-slate-300">
                Current role
              </dt>
              <dd className="mt-1 font-semibold">
                {aboutPageContent.currentRole}
              </dd>
            </div>

            <div>
              <dt className="text-slate-500 dark:text-slate-300">
                Focus
              </dt>
              <dd className="mt-1 font-semibold text-blue-700 dark:text-blue-300">
                {aboutPageContent.focus}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <Section
        title="How I approach a client website"
        intro="The process stays focused on the requirement, the editing experience, the visitor journey, and the long-term maintainability of the site."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {approachItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="surface-panel animated-card"
              >
                <span className="feature-icon" aria-hidden="true">
                  <Icon />
                </span>

                <h3 className={`card-title mt-5 ${item.titleClass}`}>
                  {item.title}
                </h3>

                <p className="card-copy">{item.text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <ProjectCta text="Tell me what you want to build, improve, or simplify. I can help connect the technical implementation with the content, SEO, performance, and CMS workflow behind it." />
    </>
  );
}