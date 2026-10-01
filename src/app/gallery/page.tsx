import { GalleryGrid } from "@/components/pages/gallery-grid";
import {
  PageHero,
  ProjectCta,
  Section,
} from "@/components/pages/page-shell";
import { StructuredData } from "@/components/seo/json-ld";
import galleryContentJson from "@/content/gallery.json";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

type GalleryItem = {
  title: string;
  image: string;
  alt: string;
  description: string;
  caption: string;
  keywords: string[];
};

const galleryContent =
  galleryContentJson as GalleryItem[];

const galleryItems: GalleryItem[] =
  galleryContent.map((item) => ({
    ...item,
    keywords: Array.isArray(item.keywords)
      ? item.keywords
      : [],
  }));

export const metadata = pageMetadata(
  "Image Gallery of Ahsanul Haque Chowdhury",
  "Browse the professional image gallery of Ahsanul Haque Chowdhury, with descriptive image metadata for search visibility and personal branding.",
  "/gallery",
);

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Image insights from a developer, SEO, and ORM professional."
        description="Explore a visual collection featuring Ahsanul Haque Chowdhury across professional work, projects, learning experiences, and meaningful moments throughout his career and personal journey."
        path="/gallery"
        type="CollectionPage"
      />

      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Image Gallery of Ahsanul Haque Chowdhury",
          url: `${siteUrl}/gallery`,
          associatedMedia: galleryItems.map((item) => ({
            "@type": "ImageObject",
            contentUrl: item.image.startsWith("http")
              ? item.image
              : `${siteUrl}${item.image}`,
            name: item.title,
            caption: item.caption,
            description: item.description,
            keywords: item.keywords.join(", "),
          })),
        }}
      />

      <Section
        title="Image Gallery of Ahsanul Haque Chowdhury"
        intro="This gallery brings together selected images that reflect his experience in software development, WordPress, SEO, digital projects, and professional growth. Each photo offers a closer look at the people, places, and moments connected to his work and development."
      >
        {galleryItems.length > 0 ? (
          <GalleryGrid items={galleryItems} />
        ) : (
          <div className="surface-panel text-center">
            <p className="text-slate-600 dark:text-slate-300">
              No gallery images have been published yet.
            </p>
          </div>
        )}
      </Section>

      <ProjectCta
        title="Need a stronger professional web presence?"
        text="My portfolio combines development, technical SEO, image optimization, structured data, and maintainable content workflows so a website can look polished while remaining practical to update."
      />
    </>
  );
}