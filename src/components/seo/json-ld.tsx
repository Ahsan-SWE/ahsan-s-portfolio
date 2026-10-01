import { siteConfig, faqs } from "@/data/portfolio";
import { siteUrl } from "@/lib/site-url";
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function SiteSchema() {
  const { streetAddress, addressLocality, postalCode, addressCountry } =
    siteConfig.address;
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name: siteConfig.name,
            url: siteUrl,
            image: `${siteUrl}${siteConfig.image}`,
            jobTitle: "Senior Executive Software Development",
            description: siteConfig.description,
            email: siteConfig.email,
            telephone: siteConfig.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress,
              addressLocality,
              postalCode,
              addressCountry,
            },
            worksFor: { "@type": "Organization", name: siteConfig.company },
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: siteConfig.university,
            },
            sameAs: Object.values(siteConfig.social),
            knowsAbout: [
              "WordPress",
              "Advanced Custom Fields",
              "Next.js",
              "Frontend Development",
              "Technical SEO",
              "Online Reputation Management",
            ],
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: siteConfig.name,
            url: siteUrl,
            description: siteConfig.description,
            inLanguage: "en",
            publisher: { "@id": `${siteUrl}/#person` },
          },
        ],
      }}
    />
  );
}
export function PageSchema({
  name,
  description,
  path,
  type = "WebPage",
  parents = [],
}: {
  name: string;
  description: string;
  path: string;
  type?: string;
  parents?: { name: string; path: string }[];
}) {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const crumbs = [
    { name: "Home", path: "/" },
    ...parents,
    ...(path === "/" ? [] : [{ name, path }]),
  ];
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": type,
            "@id": `${url}#page`,
            name,
            description,
            url,
            inLanguage: "en",
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: { "@id": `${siteUrl}/#person` },
            ...(type === "ProfilePage"
              ? { mainEntity: { "@id": `${siteUrl}/#person` } }
              : {}),
            ...(path !== "/"
              ? { breadcrumb: { "@id": `${url}#breadcrumbs` } }
              : {}),
          },
          ...(path === "/"
            ? []
            : [
                {
                  "@type": "BreadcrumbList",
                  "@id": `${url}#breadcrumbs`,
                  itemListElement: crumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: crumb.name,
                    item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
                  })),
                },
              ]),
        ],
      }}
    />
  );
}
export function JsonLd() {
  return (
    <>
      <PageSchema
        name={siteConfig.name}
        description={siteConfig.description}
        path="/"
        type="ProfilePage"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
    </>
  );
}
