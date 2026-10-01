# Ahsanul Haque Chowdhury Portfolio

A multipage Next.js portfolio for https://ahsanulhaquechowdhury.vercel.app.
The homepage retains the original content sections and animated network background.
The inner pages use a simpler visual treatment, expanded English content, and their own metadata.

## Quick start

Use Node.js 22 LTS or a compatible version supported by Next.js 16.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

On Windows, copy `.env.example` to `.env.local` in File Explorer or run:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. The content pages work without email credentials.
Contact submissions require the server-only email configuration below.

Read `VERIFICATION.txt` for the completed checks and remaining production setup.
The `verification` folder includes the final local Lighthouse HTML reports and
functional-test results.

## Production checks

```bash
npm run check
npm run test:contact
npm start
```

`test:contact` uses a local SMTP sink and a separate local Next.js server. It sends no real email and requires no real credentials. It checks actual SMTP transport, visitor Reply-To, rejected messages, input validation, origin checks, the rate limit, and missing configuration.

## Pages

- `/`: all original homepage sections, with links into the detailed pages.
- `/about`: expanded biography and working approach.
- `/services`: service overview, process, scope guidance, and FAQs.
- `/services/frontend-development`
- `/services/wordpress-development`
- `/services/seo-and-orm`
- `/services/performance-optimization`
- `/services/ai-content-strategy`
- `/services/digital-marketing`
- `/expertise`: work history, education, professional learning, and technical skills.
- `/portfolio`: six project summaries linking to full case studies.
- `/portfolio/aan-nahl`
- `/portfolio/peter-rentrop`
- `/portfolio/axia-consult`
- `/portfolio/richard-pestell`
- `/portfolio/andrea-jaeger`
- `/portfolio/adriana-kugler`
- `/contact`: inquiry form, contact details, and project guidance.
- `/privacy`: information handling for the website and inquiry form.

`/resume` and `/expertice` redirect permanently to `/expertise`. `/projects` redirects to `/portfolio`. The old local resume URL redirects to the supplied Google Drive resume. Old homepage `#resume` links still have an anchor.

## Enable email delivery on Vercel

The form now posts to `/api/contact`; it does not open the visitor's email application. The API sends a plain-text email through SMTP. The recipient is controlled by the server, and Reply-To is the visitor's address.

1. Enable Google 2-Step Verification on the Gmail account used to send mail.
2. Create a dedicated Google App Password for this website. Some managed or Advanced Protection accounts do not offer App Passwords. If unavailable, configure a compatible SMTP provider instead.
3. In the existing Vercel project, open Settings > Environment Variables and add these values for Production:

| Variable               | Value                                      |
| ---------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `https://ahsanulhaquechowdhury.vercel.app` |
| `SMTP_HOST`            | `smtp.gmail.com`                           |
| `SMTP_PORT`            | `465`                                      |
| `SMTP_USER`            | `ahsan.chowdhury202@gmail.com`             |
| `SMTP_PASS`            | Your dedicated Gmail App Password          |
| `CONTACT_TO_EMAIL`     | `ahsan.chowdhury202@gmail.com`             |
| `INDEXING_ENABLED`     | `true`                                     |

4. Redeploy after changing environment variables. Store the App Password only in Vercel or your ignored `.env.local`. Do not commit it, put it in browser code, or share it in chat.
5. Submit the live form with a real email address and a distinctive test subject. Confirm the message arrives in Gmail, check Spam if necessary, and click Reply to verify the visitor is the reply recipient.
6. Verify the form on both `/contact` and the homepage. Check that the success message appears and the form resets after an accepted submission.

A success response means the SMTP provider accepted the email. Final inbox placement depends on the provider. Actual Gmail delivery cannot be verified until these credentials are configured and a live submission is checked. Missing credentials or provider errors show a real error; the form never reports success for an unsent message.

Gmail can reject automated connections, revoke App Passwords after account-password changes, or enforce sending limits. If sending becomes unreliable or volume grows, use a transactional SMTP provider with an authenticated sending domain. Port 587 is supported with required STARTTLS; port 465 uses TLS from the start. The Gmail sender address must match `SMTP_USER`.

The included rate limiter allows five validated attempts per network identifier in 15 minutes per server instance. This is a basic safeguard, not a globally shared limit across Vercel instances. Use platform-level rate limiting or a shared limiter if the public endpoint receives sustained abuse. Honeypot checks, origin validation, field bounds, and payload limits are also included.

## Publish the update to the existing site

Keep the existing Vercel project and GitHub repository connection.

1. Back up the current repository files.
2. Replace the old project files with the contents of this folder. Keep your own `.git` directory and any private environment files.
3. Remove the obsolete local resume PDF and old `.jpg`, `.svg`, and `.png` image copies in `public/images`; this package uses the supplied optimized `.webp` assets. Keep the generated icon PNGs outside that images folder.
4. Run `npm ci`, `npm run check`, and `npm run test:contact` locally.
5. Commit and push the updated source to the production branch connected to Vercel.
6. Confirm the Vercel deployment succeeded and the public site is accessible without authentication.
7. Complete the email-delivery check above.

The archive is source code. It intentionally excludes `.git`, `.next`, `node_modules`, and credentials. Do not deploy it as static-export-only hosting because the email endpoint needs the Next.js Node.js runtime.

## Google indexing and SEO

Production pages allow indexing. Vercel preview deployments are automatically marked `noindex`; `INDEXING_ENABLED=false` can also disable indexing for a private staging build. Do not apply that setting to the production deployment.

The application generates `/robots.txt` and `/sitemap.xml`. Robots allows page content, CSS, JavaScript, and images. It blocks only `/api/` from crawling on production. API responses also carry `X-Robots-Tag: noindex, nofollow`.

Every content page has a unique title, description, canonical URL, one H1, and crawlable internal links. Structured data includes Person, WebSite, relevant page types, breadcrumbs, services, and project case studies. Homepage FAQ markup matches visible answers; it does not imply eligibility for a Google FAQ rich result.

After deployment:

1. Verify the URL-prefix property `https://ahsanulhaquechowdhury.vercel.app/` in Google Search Console.
2. For HTML-tag verification, place only the verification token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
3. Submit `sitemap.xml` in Search Console.
4. Inspect the homepage, services, expertise, and portfolio URLs using Live Test. Check that Google can fetch the pages and that the declared canonical matches the production URL.
5. Request indexing for the important pages, then monitor the Page Indexing and Performance reports over time.
6. If a custom domain is added later, set `NEXT_PUBLIC_SITE_URL` to its final HTTPS origin, update `public/llms.txt`, redirect the previous hostname through the hosting settings, and verify the new property.

Technical readiness does not guarantee indexing or a ranking position. Useful original content, accurate project evidence, relevant mentions, and ongoing maintenance still matter. No traffic, ranking, or client-result metrics have been invented for these case studies. `llms.txt` is a human-readable content directory, not a Google ranking requirement.

## Performance and accessibility

- Static generation for every public content page; Node runtime only for contact submissions.
- Server components for the detailed content pages.
- Optimized WebP source assets, responsive Next.js image sizing, and modern output formats.
- Original source image total reduced from 4,522,638 bytes to 435,504 bytes, approximately 90%.
- Local Latin-subset Inter and Poppins fonts; unused font packages removed.
- Original particle configuration retained on desktop; fewer particles and lower rendering density on mobile.
- Background drawing pauses on inner pages and hidden browser tabs. Particle counts are capped.
- Motion preferences respected by particles, reveal effects, typing, loops, and tilt.
- Homepage text remains visible in the initial HTML and without JavaScript.
- Labels, visible keyboard focus, skip link, mobile navigation, and form status announcements.

Run PageSpeed Insights on the deployed production URL for both mobile and desktop. Local Lighthouse results are lab measurements, not live PageSpeed scores or real-user Core Web Vitals. Review LCP, INP, and CLS in field data as traffic becomes available.

## Edit content

| File                       | Purpose                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `src/data/portfolio.ts`    | Identity, contact information, resume, homepage services, projects, experience, education |
| `src/data/services.ts`     | Expanded service copy and FAQs                                                            |
| `src/data/case-studies.ts` | Six detailed project narratives                                                           |
| `src/data/expertise.ts`    | Expanded responsibilities and skills                                                      |
| `src/app/about/page.tsx`   | Expanded biography                                                                        |
| `src/app/privacy/page.tsx` | Privacy notice                                                                            |
| `src/lib/seo.ts`           | Metadata helpers and indexing rules                                                       |
| `src/app/sitemap.ts`       | Public URL inventory and content modification date                                        |

The new role is dated February 2025 to present. Based on the confirmed promotion, the two earlier responsibilities are recorded through January 2025. Update those end dates if the actual employment records differ. Existing education details are retained; no new certificate issuer, qualification, award, or client endorsement has been invented.

## Reference documentation

- Google technical requirements: https://developers.google.com/search/docs/essentials/technical
- Google App Passwords: https://support.google.com/accounts/answer/185833
- Next.js sitemap convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Nodemailer Gmail guidance: https://nodemailer.com/usage/using-gmail/
