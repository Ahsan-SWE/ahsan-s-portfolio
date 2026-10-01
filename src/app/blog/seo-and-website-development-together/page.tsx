/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
import { MarkdownContent } from "@/components/pages/markdown-content";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const post = {
  "title": "Why SEO and Website Development Work Better Together",
  "slug": "seo-and-website-development-together",
  "excerpt": "Technical structure, content clarity, performance, and search visibility are easier to improve when they are considered during development.",
  "date": "2026-09-29",
  "author": "Ahsanul Haque Chowdhury",
  "image": "/images/profile-image.webp",
  "imageAlt": "Ahsanul Haque Chowdhury working on SEO and website development",
  "imageTitle": "SEO and Website Development",
  "metaTitle": "SEO and Web Development | Ahsanul Haque Chowdhury",
  "metaDescription": "See why Ahsanul Haque Chowdhury combines SEO thinking with website development to improve structure, performance, and search visibility.",
  "tags": [
    "SEO",
    "Frontend Development",
    "Technical SEO"
  ],
  "content": "SEO is easier to maintain when it is considered during development instead of being added after launch. Page structure, headings, internal links, image handling, and performance all affect how a site communicates with users and search engines.\n\n## Structure supports clarity\n\nA clear heading hierarchy and descriptive navigation help people understand a page quickly. They also make the content easier for search systems to interpret.\n\n## Performance supports usability\n\nFast pages reduce friction. Image sizing, script control, caching, and clean templates can support both Core Web Vitals and a better visitor experience.\n\n## Content should remain editable\n\nA technically strong site is easier to maintain when editors can update important content without breaking the layout. Good development and good SEO often share the same goal, making information easier to access and manage."
} as const;

export const metadata = pageMetadata(
  post.metaTitle,
  post.metaDescription,
  "/blog/seo-and-website-development-together",
);

export default function BlogPostPage() {
  return (
    <>
      <PageHero eyebrow="Blog Article" title={post.title} description={post.excerpt} path="/blog/seo-and-website-development-together" type="Article" parents={[{ name: "Blog", path: "/blog" }]} />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Person", name: post.author, url: siteUrl },
        image: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
        mainEntityOfPage: `${siteUrl}/blog/seo-and-website-development-together`,
      }} />
      <article className="page-container py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-950">
            <img src={post.image} alt={post.imageAlt} title={post.imageTitle} width="1200" height="900" className="mx-auto max-h-[420px] w-full object-contain sm:max-h-[500px] lg:max-h-[600px]" />
            <figcaption className="px-3 pb-2 pt-4 text-center text-sm text-slate-600 dark:text-slate-300">{post.imageAlt}</figcaption>
          </figure>
          <div className="mt-8 flex flex-wrap items-center gap-5 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <span className="inline-flex items-center gap-2"><FaUser className="text-blue-600 dark:text-blue-300" aria-hidden="true" />By <strong>{post.author}</strong></span>
            <span className="inline-flex items-center gap-2"><FaCalendarAlt className="text-blue-600 dark:text-blue-300" aria-hidden="true" /><time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time></span>
          </div>
          <div className="mt-8"><MarkdownContent content={post.content} /></div>
          <div className="mt-10 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
          <Link href="/blog" className="text-link mt-8 inline-flex items-center gap-2"><FaArrowLeft aria-hidden="true" />Back to all articles</Link>
        </div>
      </article>
      <ProjectCta text="If an article relates to a challenge on your own website, share the current page and the outcome you want. I can help turn the idea into a focused development, SEO, WordPress, or performance plan." />
    </>
  );
}
