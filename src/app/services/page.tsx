import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBullseye,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaCode,
  FaCubes,
  FaMagic,
  FaRocket,
  FaSearch,
  FaTachometerAlt,
  FaTools,
} from "react-icons/fa";
import { PageHero, ProjectCta, Section } from "@/components/pages/page-shell";
import { pageMetadata } from "@/lib/seo";

type ServiceDetail = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  audience: string;
  sections: { title: string; text: string }[];
  deliverables: string[];
  questions: { question: string; answer: string }[];
  project: string;
};

const serviceDetails: ServiceDetail[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export const projectProcess = [
  {
    title: "Understand",
    text: "We discuss your audience, current website, business goals, and the content or functionality you need. Existing assets and constraints shape the brief.",
  },
  {
    title: "Define",
    text: "We agree on deliverables, responsibilities, review points, and timing. Tools, hosting, and any paid licenses are identified before implementation.",
  },
  {
    title: "Build & review",
    text: "I develop the agreed work and check it across relevant devices. You review the content and experience while there is time to make focused changes.",
  },
  {
    title: "Launch & hand over",
    text: "The final checks cover links, forms, content, and deployment settings. You receive the agreed files and guidance for maintaining the finished work.",
  },
];

const serviceIcons: IconType[] = [FaCode, FaSearch, FaCubes, FaTachometerAlt, FaMagic, FaChartLine];
const serviceTitleClasses = [
  "text-blue-700 dark:text-blue-300",
  "text-violet-700 dark:text-violet-300",
  "text-emerald-700 dark:text-emerald-300",
  "text-amber-700 dark:text-amber-300",
  "text-indigo-700 dark:text-indigo-300",
  "text-rose-700 dark:text-rose-300",
] as const;
const flowToneClasses = [
  "workflow-blue",
  "workflow-violet",
  "workflow-emerald",
  "workflow-amber",
  "workflow-indigo",
  "workflow-rose",
] as const;

const flowSteps: { title: string; text: string; icon: IconType }[] = [
  { title: "Discover the goal", text: "Clarify the audience, business need, success criteria, and the main action the website should support.", icon: FaBullseye },
  { title: "Review the current state", text: "Check the existing website, content, search setup, technical limits, and reusable assets before changing anything.", icon: FaSearch },
  { title: "Define the plan", text: "Turn the findings into a practical scope, page structure, content plan, priorities, and delivery sequence.", icon: FaClipboardList },
  { title: "Build with structure", text: "Develop reusable components, CMS fields, templates, and interactions with responsive behavior in mind.", icon: FaTools },
  { title: "Test and refine", text: "Review accessibility, links, forms, performance, SEO fundamentals, content consistency, and device behavior.", icon: FaCheckCircle },
  { title: "Launch and improve", text: "Prepare the handoff, deployment, indexing steps, and a clear path for future content or technical improvements.", icon: FaRocket },
];

export const metadata = pageMetadata(
  "Web Development, SEO & WordPress Services | Ahsanul Haque Chowdhury",
  "Explore custom WordPress, frontend development, SEO, ORM, performance, and digital website services from Ahsanul Haque Chowdhury.",
  "/services",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Focused services for better websites and visibility."
        description="I help with custom WordPress builds, frontend implementation, technical SEO, ORM, website performance, AI-assisted content workflows, and practical CMS systems. The work can focus on one problem or connect several disciplines when the project needs a broader solution."
        path="/services"
        type="CollectionPage"
      />
      <Section
        title="Choose the service that matches your goal"
        intro="Each service can stand alone or be combined when development, search visibility, content management, and performance overlap. The aim is to solve the actual website problem without adding unnecessary complexity."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceDetails.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <article key={service.slug} className="surface-panel animated-card flex flex-col">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="feature-icon" aria-hidden="true"><Icon /></span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">0{index + 1}</span>
                </div>
                <h2 className={`text-xl font-bold ${serviceTitleClasses[index % serviceTitleClasses.length]}`}>{service.title}</h2>
                <p className="card-copy">{service.audience}</p>
                <ul className="my-5 space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {service.deliverables.slice(0, 4).map((item) => <li key={item} className="flex gap-3"><span className="text-blue-600 dark:text-blue-300">✓</span>{item}</li>)}
                </ul>
                <Link className="text-link mt-auto" href={`/services/${service.slug}`}>Explore {service.title.toLowerCase()}</Link>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        title="A clearer project flow from idea to launch from Ahsanul Haque Chowdhury"
        intro="The workflow keeps design, development, content, SEO, and quality checks connected. Each step has a clear purpose so decisions are easier to review and the final handoff is more predictable."
        className="pb-16"
      >
        <div className="workflow-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const tone = flowToneClasses[index % flowToneClasses.length];
            return (
              <article key={step.title} className={`workflow-card animated-card group relative overflow-hidden ${tone}`}>
                <div className="workflow-accent" aria-hidden="true" />
                <span className="workflow-watermark" aria-hidden="true">0{index + 1}</span>
                <div className="relative z-10 flex items-start gap-5">
                  <span className="workflow-icon" aria-hidden="true"><Icon /></span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="workflow-step-label">Step 0{index + 1}</span>
                      {index < flowSteps.length - 1 ? <FaArrowRight className="workflow-mini-arrow" aria-hidden="true" /> : null}
                    </div>
                    <h3 className="workflow-title text-xl font-bold leading-snug">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{step.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
      <ProjectCta
        title="Let's define the right scope."
        text="Share the current website, the main problem, and the outcome you want. I can help turn that into a focused technical and content plan before the build begins."
      />
    </>
  );
}
