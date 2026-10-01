import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { projects, siteConfig } from "@/data/portfolio";
import { serviceDetails } from "@/data/services";
import blogPosts from "@/content/blog.json";
import gallery from "@/content/gallery.json";
import cmsProjectsJson from "@/content/portfolio.json";

type CmsProject = { slug: string; image: string };
const cmsProjects = cmsProjectsJson as CmsProject[];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/expertise", "/portfolio", "/blog", "/gallery", "/contact", "/privacy"];
  const lastModified = new Date();
  return [
    ...pages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      ...(path === "" ? { images: [`${siteUrl}${siteConfig.image}`, ...projects.map((project) => `${siteUrl}${project.image}`)] } : {}),
      ...(path === "/gallery" ? { images: gallery.map((item) => item.image.startsWith("http") ? item.image : `${siteUrl}${item.image}`) } : {}),
    })),
    ...serviceDetails.map((service) => ({ url: `${siteUrl}/services/${service.slug}`, lastModified })),
    ...projects.map((project) => ({ url: `${siteUrl}/portfolio/${project.slug}`, lastModified, images: [`${siteUrl}${project.image}`] })),
    ...cmsProjects.map((project) => ({ url: `${siteUrl}/portfolio/${project.slug}`, lastModified, images: [project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`] })),
    ...blogPosts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(`${post.date}T00:00:00Z`), images: [post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`] })),
  ];
}
