# Temporary Easy-Edit Structure

This version is intentionally organized for manual content and image editing before final deployment.

## Main page files

- Home: `src/app/page.tsx`
- About: `src/app/about/page.tsx`
- Services: `src/app/services/page.tsx`
- Expertise: `src/app/expertise/page.tsx`
- Portfolio: `src/app/portfolio/page.tsx`
- Blog: `src/app/blog/page.tsx`
- Gallery: `src/app/gallery/page.tsx`
- Contact: `src/app/contact/page.tsx`
- Privacy: `src/app/privacy/page.tsx`

The Home page now contains the visible content for Hero, About, Services, Work Experience, Education, Portfolio, FAQ, and Contact sections inside `src/app/page.tsx`.

## Service detail pages

Each built-in service has its own editable page file:

- `src/app/services/frontend-development/page.tsx`
- `src/app/services/seo-and-orm/page.tsx`
- `src/app/services/wordpress-development/page.tsx`
- `src/app/services/performance-optimization/page.tsx`
- `src/app/services/ai-content-strategy/page.tsx`
- `src/app/services/digital-marketing/page.tsx`

If you change a service title, summary, or card text, update the matching card in `src/app/services/page.tsx` as well.

## Portfolio case-study pages

Each built-in case study has its own editable page file:

- `src/app/portfolio/aan-nahl/page.tsx`
- `src/app/portfolio/peter-rentrop/page.tsx`
- `src/app/portfolio/axia-consult/page.tsx`
- `src/app/portfolio/richard-pestell/page.tsx`
- `src/app/portfolio/andrea-jaeger/page.tsx`
- `src/app/portfolio/adriana-kugler/page.tsx`

If you change a project title, summary, or card image, update the matching card in `src/app/portfolio/page.tsx` as well.

## Current blog posts

The two existing posts now have dedicated page files:

- `src/app/blog/building-faster-wordpress-websites/page.tsx`
- `src/app/blog/seo-and-website-development-together/page.tsx`

Their listing cards are in `src/app/blog/page.tsx`. If you change a post title, excerpt, date, or featured image, update the matching listing object there too.

The dynamic `src/app/blog/[slug]/page.tsx` route remains for future CMS-created posts.

## Gallery

All current gallery titles, images, alt text, descriptions, captions, and keywords are directly inside `src/app/gallery/page.tsx` during this editing phase.

## Shared global files

A few items remain shared because they are global functionality rather than page-specific content:

- Header and footer identity/navigation data: `src/data/portfolio.ts`
- Contact form behavior and field logic: `src/components/sections/contact-form.tsx`
- Header: `src/components/layout/header.tsx`
- Footer: `src/components/layout/footer.tsx`
- Reusable visual shells and animation components remain under `src/components/`

## About image

The About page uses:

`public/images/ahsan_profile.jpg`

A placeholder is included because the custom `ahsan_profile.jpg` file was not present in the uploaded ZIP. Replace that file with your final image using the same filename.

## Before production deployment

This is a temporary manual-editing structure. CMS JSON files and shared data files are intentionally retained so they can be restored as the final source of truth later. Before GitHub and Vercel production deployment, consolidate the approved content back into the data-driven structure so page content, CMS, sitemap, schema, and SEO metadata stay synchronized from one source.
