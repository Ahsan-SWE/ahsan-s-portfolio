/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { FaCode, FaLightbulb, FaSearch, FaTasks } from "react-icons/fa";
import { PageHero, ProjectCta, Section } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import cmsProjects from "@/content/portfolio.json";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const projects = [
  {
    title: "Aan Nahl Website",
    slug: "aan-nahl",
    description:
      "A responsive web view for our company, redesigned with Next.js and Tailwind.",
    url: "https://aannahl-portfolio-with-nextjs.vercel.app/",
    image: "/images/portfolio-aan-nahl.webp",
    alt: "Aan Nahl software company website project",
    width: 1905,
    height: 916,
    tags: ["NEXT.JS", "TAILWIND CSS"],
  },
  {
    title: "A Cardiologist Website",
    slug: "peter-rentrop",
    description:
      "This website is based on wordpress for Peter Rentrop, MD, a cardiologist and medical director.",
    url: "https://demo-peter-rentrop.vercel.app/",
    image: "/images/portfolio-peter-rentrop.webp",
    alt: "Peter Rentrop cardiologist website project",
    width: 1902,
    height: 902,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  },
  {
    title: "A Consulting Firm Website",
    slug: "axia-consult",
    description:
      "This website is based on wordpress for Axia Consult | U.S.-based global consulting firm specializing in space domain awareness (SDA).",
    url: "https://axiaconsult.com/",
    image: "/images/portfolio-axia-consult.webp",
    alt: "Axia Consult global consulting firm website project",
    width: 1902,
    height: 949,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  },
  {
    title: "A Medical Doctor's Website",
    slug: "richard-pestell",
    description:
      "A Medical Doctor's Website for Richard Pestell | Working for Cancer Prevention.",
    url: "https://richardpestell.com/",
    image: "/images/portfolio-richard-pestell.webp",
    alt: "Richard Pestell medical doctor website project",
    width: 1901,
    height: 946,
    tags: ["HTML/CSS/JS", "WORDPRESS"],
  },
  {
    title: "Philanthropy Website",
    slug: "andrea-jaeger",
    description:
      "A custom WordPress one-pager landing page for the Philanthropy website of Andrea Jaeger.",
    url: "https://andreajaegerphilanthropy.com/",
    image: "/images/portfolio-little-star.webp",
    alt: "Andrea Jaeger philanthropy website project",
    width: 1896,
    height: 952,
    tags: ["HTML/CSS/JS", "CUSTOM LANDING PAGE WORDPRESS"],
  },
  {
    title: "Portfolio Website",
    slug: "adriana-kugler",
    description:
      "A Portfolio Website for a Former Federal Reserve Governor, Adriana Kugler.",
    url: "https://adrianakugler.com/",
    image: "/images/portfolio-adriana-kugler.webp",
    alt: "Adriana Kugler economist portfolio website project",
    width: 1899,
    height: 951,
    tags: ["HTML/CSS/JS", "WORDPRESS CUSTOM"],
  },
] as const;

const caseStudies: CaseStudy[] = [
  {
    slug: "aan-nahl",
    name: "Aan-Nahl Software",
    category: "Company website / Next.js",
    metaTitle: "Aan-Nahl Website Case Study | Ahsanul Haque Chowdhury",
    description:
      "Explore the Aan-Nahl company website project: a responsive Next.js and Tailwind CSS redesign presented by Ahsanul Haque Chowdhury.",
    summary:
      "A company website redesign using Next.js and Tailwind CSS, bringing the company's web presentation into a responsive frontend structure.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "A software company's website needs to introduce its work without making visitors understand the underlying technology first. This project focused on a responsive web presentation for Aan-Nahl, using Next.js and Tailwind CSS as the frontend foundation.",
          "The portfolio example is available as a hosted project. It gives prospective clients a concrete way to explore the interface and compare the work with the kind of company website they need.",
        ],
      },
      {
        title: "The development focus",
        paragraphs: [
          "For this type of redesign, content hierarchy matters as much as individual components. A visitor should be able to recognize the company, understand the offer, and find the next relevant action. Responsive spacing and readable text support that journey at different screen sizes.",
          "Next.js provides a component-based structure for shared interface elements. Tailwind CSS supports consistent layout and styling decisions across those components. Together, they suit a company site where the design must remain coherent as content changes.",
        ],
      },
      {
        title: "What this project demonstrates",
        paragraphs: [
          "The project demonstrates my frontend development direction: responsive layouts, reusable interface patterns, and a clear business presentation. It is a useful example for teams considering a React or Next.js website instead of a traditional CMS-driven implementation.",
          "A similar engagement would begin by confirming which content needs frequent editing and which interactions are essential. Those requirements determine whether a static content structure is sufficient or whether the project needs a separate content-management workflow.",
        ],
      },
      {
        title: "Applying the approach to your website",
        paragraphs: [
          "A redesign should preserve useful content and familiar user journeys while addressing the weaknesses of the old structure. Before estimating a comparable project, I would review your existing pages, brand assets, required integrations, and deployment arrangements. That review keeps the technical choices tied to the site's real purpose.",
        ],
      },
    ],
    considerations: [
      "Company identity and service clarity",
      "Responsive frontend composition",
      "Next.js and Tailwind CSS",
      "Reusable page elements",
    ],
    service: "frontend-development",
  },
  {
    slug: "peter-rentrop",
    name: "Peter Rentrop, MD",
    category: "Professional website / WordPress",
    metaTitle: "Peter Rentrop Case Study | Ahsanul Haque Chowdhury",
    description:
      "A WordPress-based professional website project for cardiologist Peter Rentrop, MD, with a focus on clear information and readable page structure.",
    summary:
      "A WordPress-based website presentation for Peter Rentrop, MD, a cardiologist and medical director, supported by a frontend demonstration.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "Professional medical websites need a careful balance of biography, expertise, and accessible presentation. This portfolio project is a website for Peter Rentrop, MD, a cardiologist and medical director. The project uses WordPress alongside HTML, CSS, and JavaScript.",
          "The linked version is a frontend demo. It is presented as a design and development example, so visitors can review the interface without confusing the demo with a medical consultation service.",
        ],
      },
      {
        title: "Organizing a professional profile",
        paragraphs: [
          "The central communication task is to help a visitor understand who the professional is and where to find relevant information. A structured biography and readable headings make detailed content easier to scan, particularly for readers arriving directly from a search result.",
          "For a project in this category, professional information needs editorial care. Qualifications, roles, and medical statements should come from approved sources. Design decisions should help readers navigate that information without turning a professional profile into unsupported promotional claims.",
        ],
      },
      {
        title: "WordPress as the content foundation",
        paragraphs: [
          "WordPress is suited to websites where profile information and supporting articles need updates over time. A custom frontend can organize those materials around the professional's needs while maintaining a consistent visual system across pages.",
          "The relevant development considerations include responsive text sizing, image presentation, article navigation, and contact visibility. A comparable project would also require content review and testing of the final production environment, especially where forms or third-party tools are involved.",
        ],
      },
      {
        title: "What a prospective client can review",
        paragraphs: [
          "The demonstration offers a reference for a professional service website with substantial written content. When discussing a similar build, we can use it to identify the layout patterns you prefer, the sections you need, and the editing controls your team expects. The final scope would reflect your own profession, audience, and approved information.",
        ],
      },
    ],
    considerations: [
      "Professional profile and biography",
      "Readable long-form information",
      "WordPress-based content management",
      "Clearly identified frontend demo",
    ],
    service: "wordpress-development",
  },
  {
    slug: "axia-consult",
    name: "Axia Consult",
    category: "Consulting website / WordPress",
    metaTitle: "Axia Consult Case Study | Ahsanul Haque Chowdhury",
    description:
      "Explore the Axia Consult WordPress website project, presenting a specialist consulting firm through clear service information and professional design.",
    summary:
      "A WordPress website for Axia Consult, a U.S.-based global consulting firm specializing in space domain awareness.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "Specialist consulting firms often need to communicate complex work to people with different levels of technical knowledge. The Axia Consult project concerns a U.S.-based global consulting firm specializing in space domain awareness, with WordPress as its website platform.",
          "This is a different communication challenge from a personal portfolio. The website needs to present a firm and its area of work, helping a relevant visitor recognize the subject and explore the information that matters to them.",
        ],
      },
      {
        title: "Making specialist information approachable",
        paragraphs: [
          "The design considerations for this kind of site begin with hierarchy. Clear section titles, short introductory explanations, and consistent spacing help readers move from a broad understanding to more detailed material without losing their place.",
          "Professional presentation also depends on restraint. The purpose of the layout is to support the firm's content, so decorative elements should not compete with important service information. Images and text need to work together across mobile and desktop views.",
        ],
      },
      {
        title: "The website development perspective",
        paragraphs: [
          "The project is listed in my portfolio as WordPress work using HTML, CSS, and JavaScript. That combination supports a tailored interface while retaining a familiar publishing environment for content updates.",
          "For a comparable consulting website, I would clarify who edits the site, how services are organized, and which pages support inquiries. Those decisions guide the content fields, templates, and navigation before implementation begins.",
        ],
      },
      {
        title: "A useful reference for service businesses",
        paragraphs: [
          "This project is relevant to businesses that need a credible web presence for a focused area of expertise. It provides a visual reference for discussing service presentation and the relationship between technical subject matter and accessible design. Any claims about the firm's capabilities must remain grounded in its approved content.",
          "The scope of a similar engagement would be agreed around your actual services, source material, and publishing needs, rather than copying another organization's messaging.",
        ],
      },
    ],
    considerations: [
      "Specialist consulting content",
      "Professional business presentation",
      "Clear service hierarchy",
      "WordPress and custom frontend styling",
    ],
    service: "wordpress-development",
  },
  {
    slug: "richard-pestell",
    name: "Richard Pestell",
    category: "Medical professional / WordPress",
    metaTitle: "Richard Pestell Case Study | Ahsanul Haque Chowdhury",
    description:
      "A professional WordPress website project for Richard Pestell, presenting medical and cancer-prevention-related work in a clear website format.",
    summary:
      "A professional website for Richard Pestell, with a focus on presenting medical work and cancer-prevention-related information through WordPress.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "A professional website can bring an individual's work into a central place that visitors can explore at their own pace. The Richard Pestell project is included in my portfolio as a medical doctor's website associated with cancer-prevention work.",
          "The project uses WordPress with HTML, CSS, and JavaScript. It is an example of adapting a content-managed website to a professional profile rather than using the same structure as a product store or software application.",
        ],
      },
      {
        title: "Presenting a substantial body of information",
        paragraphs: [
          "A profile in this field may need to serve visitors with different interests, from a brief introduction to more detailed professional information. The design challenge is to make the first step clear and let readers decide how deeply to explore.",
          "Readable typography, consistent headings, and purposeful image placement are especially useful when content carries much of the site's value. The interface should make approved material easier to find while keeping the professional's identity consistent across pages.",
        ],
      },
      {
        title: "Content and implementation considerations",
        paragraphs: [
          "WordPress provides a publishing foundation for maintaining written material over time. For similar work, I plan the templates and editing structure around the actual content types so updates remain manageable after launch.",
          "Medical and research-related material requires careful source handling. A website implementation should not invent qualifications, research findings, or health outcomes. The role of the development work is to present the approved information clearly and support an appropriate editorial review process.",
        ],
      },
      {
        title: "How this informs a future project",
        paragraphs: [
          "This example is relevant to professionals whose website needs to communicate a detailed body of work. A comparable brief would identify the primary audience, approved biography, supporting pages, and the team's editing responsibilities. From there, we can choose a structure that supports both an initial introduction and longer-term content growth.",
          "Explore the linked website and project screenshot to review the visual presentation in context.",
        ],
      },
    ],
    considerations: [
      "Professional identity and content clarity",
      "Readable information architecture",
      "Editorial care for medical content",
      "WordPress publishing workflow",
    ],
    service: "wordpress-development",
  },
  {
    slug: "andrea-jaeger",
    name: "Andrea Jaeger Philanthropy",
    category: "Philanthropy / Custom WordPress landing page",
    metaTitle: "Andrea Jaeger Case Study | Ahsanul Haque Chowdhury",
    description:
      "A custom WordPress one-page philanthropy website for Andrea Jaeger, with focused storytelling and a clear landing-page structure.",
    summary:
      "A custom WordPress one-page landing website focused on Andrea Jaeger's philanthropy, bringing the presentation into a single guided page.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "Some websites benefit from a focused single-page structure. The Andrea Jaeger philanthropy project was presented as a custom WordPress one-page landing website, with its core story brought together in one place.",
          "The purpose of a landing-page format is to create a coherent reading path. Instead of asking visitors to choose among many pages immediately, the content can introduce the subject, develop the context, and guide readers toward relevant next steps.",
        ],
      },
      {
        title: "Designing a clear reading sequence",
        paragraphs: [
          "For philanthropy-related content, images and written material need to work together with care. The sequence of sections should help explain the subject without relying on exaggerated claims or distracting interface elements.",
          "A focused layout still requires good navigation and readable spacing. On a smaller screen, sections need enough separation to remain understandable, while images should retain a useful view of their content rather than being cropped without a clear reason.",
        ],
      },
      {
        title: "Custom development within WordPress",
        paragraphs: [
          "The project combines custom frontend work with WordPress. This allows a tailored page presentation while keeping content updates within a familiar CMS. The portfolio entry identifies HTML, CSS, JavaScript, and a custom WordPress landing-page approach.",
          "For a similar brief, the editing setup would be planned around the information that changes most often. Text, photographs, and calls to action can be organized so an editor does not need to reconstruct the layout for routine updates.",
        ],
      },
      {
        title: "Choosing the right scope",
        paragraphs: [
          "A single-page website can be appropriate when the message is focused and the content is limited. As the subject grows, dedicated pages may become useful for deeper information. The decision should follow the audience's needs and content depth rather than a preference for a particular site format.",
          "This project provides a reference for a concise, purpose-led WordPress presentation and a starting point for discussing how much structure your own website needs.",
        ],
      },
    ],
    considerations: [
      "Focused one-page reading journey",
      "Philanthropy-related storytelling",
      "Custom WordPress landing-page layout",
      "Responsive text and photography",
    ],
    service: "wordpress-development",
  },
  {
    slug: "adriana-kugler",
    name: "Adriana Kugler",
    category: "Professional portfolio / Custom WordPress",
    metaTitle: "Adriana Kugler Case Study | Ahsanul Haque Chowdhury",
    description:
      "Explore the custom WordPress portfolio project for Adriana Kugler, with a professional presentation and structured access to biographical content.",
    summary:
      "A custom WordPress professional portfolio for Adriana Kugler, a former Federal Reserve Governor.",
    sections: [
      {
        title: "Project context",
        paragraphs: [
          "An established professional's website needs to connect a recognizable identity with a body of work. This project is a custom WordPress portfolio for Adriana Kugler, with the portfolio entry identifying her as a former Federal Reserve Governor.",
          "The website is a useful reference for a public-facing professional portfolio where biography and supporting materials need a clear structure. It differs from a short promotional page because readers may arrive looking for very specific information.",
        ],
      },
      {
        title: "Prioritizing clarity and credibility",
        paragraphs: [
          "A professional portfolio should establish who the person is and provide an understandable path through the content. Descriptive headings and purposeful links help visitors move from a brief introduction to more detailed material.",
          "Titles, dates, institutional references, and professional descriptions need to match approved source information. In this kind of work, consistency is a practical design requirement as well as an editorial one: the site's structure should help present facts without creating conflicting versions.",
        ],
      },
      {
        title: "A custom WordPress approach",
        paragraphs: [
          "The project is listed as custom WordPress work using HTML, CSS, and JavaScript. This supports a tailored presentation while retaining a content management foundation for ongoing updates.",
          "For a comparable project, I would map the main content groups and agree on which sections editors need to control. Reusable templates and clearly organized fields can then support a consistent design without making every update dependent on a developer.",
        ],
      },
      {
        title: "What this means for a professional website",
        paragraphs: [
          "This example can help clients evaluate the level of detail and presentation they want for their own portfolio. A future brief would define the audience, approved biography, supporting materials, and contact journey before development. The technical work would then support those content priorities across different devices.",
          "The portfolio offers a useful starting point for discussing a professional website that brings a biography and supporting materials into one consistent presentation.",
        ],
      },
    ],
    considerations: [
      "Professional identity and biography",
      "Structured supporting information",
      "Custom WordPress presentation",
      "Consistent editorial facts",
    ],
    service: "wordpress-development",
  },
];


type CmsProject = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  url: string;
  image: string;
  alt: string;
  tags: string[];
  challenge: string;
  solution: string;
  result: string;
  metaTitle: string;
  metaDescription: string;
};

const managedProjects = cmsProjects as CmsProject[];
const caseStudyFocus = [
  { title: "The project context", text: "What the website needed to communicate, who it was built for, and which practical requirement shaped the implementation.", icon: FaLightbulb },
  { title: "The implementation", text: "How the page structure, frontend, WordPress setup, CMS fields, or reusable components were organized for the project.", icon: FaCode },
  { title: "Quality and visibility", text: "How responsive behavior, technical SEO, content structure, performance, and usability were considered before handoff.", icon: FaSearch },
];

export const metadata = pageMetadata(
  "Website Portfolio & Case Studies | Ahsanul Haque Chowdhury",
  "Explore WordPress and Next.js projects by Ahsanul Haque Chowdhury, including concise case studies and project context.",
  "/portfolio",
);

export default function PortfolioPage() {
  const allItems = [
    ...caseStudies.map((item) => ({ slug: item.slug, name: item.name })),
    ...managedProjects.map((item) => ({ slug: item.slug, name: item.title })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected websites and the thinking behind the work."
        description="Explore professional websites, company projects, landing pages, and CMS-driven case studies across WordPress and Next.js. Each case study focuses on the project need, the implementation choices, and the practical details that support a reliable handoff."
        path="/portfolio"
        type="CollectionPage"
      />
      <StructuredData data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Website portfolio and case studies", itemListElement: allItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${siteUrl}/portfolio/${item.slug}` })) }} />

      <Section title="Project case studies" intro="A focused selection of development work across WordPress, Next.js, professional profiles, service websites, and client-specific content systems. New projects can be added through the built-in CMS without changing the page code.">
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.slug} className="surface-panel animated-card overflow-hidden !p-0">
              <Link href={`/portfolio/${project.slug}`} className="block overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes="(max-width: 767px) 100vw, 600px" className="h-auto w-full border-b border-slate-200 transition duration-700 hover:scale-[1.02] dark:border-slate-700" />
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-3"><span className="feature-icon !h-10 !w-10 !text-sm" aria-hidden="true"><FaTasks /></span><p className="eyebrow">{caseStudies[index].category}</p></div>
                <h2 className="mt-4 text-2xl font-bold"><Link href={`/portfolio/${project.slug}`}>{caseStudies[index].name}</Link></h2>
                <p className="card-copy">{caseStudies[index].summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
                <Link href={`/portfolio/${project.slug}`} className="text-link mt-5 inline-block">Read case study</Link>
              </div>
            </article>
          ))}
          {managedProjects.map((project) => (
            <article key={project.slug} className="surface-panel animated-card overflow-hidden !p-0">
              <Link href={`/portfolio/${project.slug}`} className="flex min-h-64 items-center justify-center overflow-hidden bg-slate-100 p-3 dark:bg-slate-950"><img src={project.image} alt={project.alt} title={project.title} loading="lazy" className="max-h-80 w-full object-contain transition duration-700 hover:scale-[1.03]" /></Link>
              <div className="p-6">
                <div className="flex items-center gap-3"><span className="feature-icon !h-10 !w-10 !text-sm" aria-hidden="true"><FaTasks /></span><p className="eyebrow">{project.category}</p></div>
                <h2 className="mt-4 text-2xl font-bold"><Link href={`/portfolio/${project.slug}`}>{project.title}</Link></h2>
                <p className="card-copy">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
                <Link href={`/portfolio/${project.slug}`} className="text-link mt-5 inline-block">Read case study</Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="What each case study focuses on" intro="The goal is not only to show a finished screenshot. The case studies explain the decisions that made the website useful, manageable, and ready for real client content.">
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudyFocus.map((item) => {
            const Icon = item.icon;
            return <article key={item.title} className="surface-panel animated-card"><span className="feature-icon" aria-hidden="true"><Icon /></span><h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className="card-copy">{item.text}</p></article>;
          })}
        </div>
      </Section>
      <ProjectCta title="Have a similar project in mind?" text="Share the reference, current website, or project requirement. I can help identify the right structure, CMS approach, development scope, and quality checks before implementation begins." />
    </>
  );
}
