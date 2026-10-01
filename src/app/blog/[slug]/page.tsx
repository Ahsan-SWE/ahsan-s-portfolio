/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
import { MarkdownContent } from "@/components/pages/markdown-content";
import { PageHero, ProjectCta } from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import posts from "@/content/blog.json";

const manualStaticSlugs = new Set([
  "building-faster-wordpress-websites",
  "seo-and-website-development-together",
]);
const dynamicPosts = posts.filter((post) => !manualStaticSlugs.has(post.slug));

export const dynamicParams = false;
export function generateStaticParams() {
  return dynamicPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = dynamicPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return pageMetadata(post.metaTitle, post.metaDescription, `/blog/${post.slug}`);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = dynamicPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow="Blog Article" title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} type="Article" parents={[{ name: "Blog", path: "/blog" }]} />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Person", name: post.author, url: siteUrl },
        image: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
        mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
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
