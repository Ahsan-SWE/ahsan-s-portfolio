/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";

import {
  PageHero,
  ProjectCta,
  Section,
} from "@/components/pages/page-shell";
import postsData from "@/content/blog.json";
import { pageMetadata } from "@/lib/seo";

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  content: string;
};

const posts = postsData as BlogPost[];

export const metadata = pageMetadata(
  "Blog | Ahsanul Haque Chowdhury",
  "Read articles by Ahsanul Haque Chowdhury about frontend development, WordPress, SEO, ORM, website performance, and practical digital strategy.",
  "/blog",
);

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Development, SEO, and digital work in practice."
        description="Practical articles drawn from real website work across frontend development, custom WordPress, SEO, ORM, content structure, and performance. Each post has its own indexable page, featured image, metadata, internal links, and room for references or anchor links."
        path="/blog"
        type="Blog"
      />

      <Section
        title="Latest articles"
        intro="The blog is structured for regular publishing through the CMS. Posts can include a featured image, article content, headings, links, tags, references, SEO metadata, and a dedicated URL for search visibility."
      >
        {sorted.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <article
                key={post.slug}
                className="blog-card surface-panel animated-card flex h-full flex-col overflow-hidden !p-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex h-[18rem] items-center justify-center overflow-hidden bg-slate-100 p-3 dark:bg-slate-950 md:h-[18.5rem]"
                  aria-label={`Read ${post.title}`}
                >
                  <img
                    src={post.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl transition duration-700 group-hover:scale-125 dark:opacity-20"
                  />

                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    title={post.imageTitle}
                    width="900"
                    height="700"
                    loading="lazy"
                    className="relative z-10 h-full w-full object-contain transition duration-500 group-hover:scale-[1.025]"
                  />
                </Link>

                <div className="flex flex-1 flex-col border-t border-slate-200 p-6 dark:border-slate-800 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    <span className="inline-flex items-center gap-2">
                      <FaCalendarAlt aria-hidden="true" />

                      <time dateTime={post.date}>
                        {new Date(
                          `${post.date}T00:00:00`,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </span>

                    {post.tags?.[0] ? (
                      <span className="inline-flex items-center gap-2">
                        <FaTags aria-hidden="true" />
                        {post.tags[0]}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-4 text-2xl font-bold leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="card-copy flex-1">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-link mt-5 inline-flex items-center gap-2 self-start"
                  >
                    <FaBookOpen aria-hidden="true" />
                    Read full article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="surface-panel text-center">
            <p className="text-slate-600 dark:text-slate-300">
              No blog posts have been published yet.
            </p>
          </div>
        )}
      </Section>

      <ProjectCta
        title="Need help with a website or search project?"
        text="Browse the articles for practical context, then contact me when you are ready to discuss a specific development, WordPress, SEO, ORM, content, or performance goal."
      />
    </>
  );
}