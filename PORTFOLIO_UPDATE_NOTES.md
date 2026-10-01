# Portfolio Update Notes

## Latest final refinements

- Gallery cards now show only the image, title/caption, and description. SEO keyword tags remain in the content data and structured metadata but are not displayed under the images.
- Gallery images are clickable. The larger lightbox supports previous and next controls, keyboard arrow navigation, Escape to close, background click to close, and clicking the enlarged image again to close.
- Gallery images use `object-contain` so landscape, portrait, and square images remain uncropped.
- Gallery cards use equal-height rows with one column on small screens, two columns on medium screens, and four columns on large screens.
- Blog cards now use one column on small screens, two columns on medium screens, and three columns on large screens.
- Blog featured-image areas are roughly 30% taller than the earlier version and use uncropped `object-contain` presentation.
- The Services project-flow section was expanded from four short steps to six detailed stages: discovery, review, planning, building, testing, and launch/improvement.
- The project flow now includes animated icon badges, numbered steps, visual connectors, hover motion, and richer supporting copy.
- Inner pages now include related icons and symbols through the shared page hero plus page-specific cards and information blocks.
- Key phrases inside inner-page copy now use stronger accent colors for easier scanning in dark mode.
- Inner-page content was expanded from the previous shortened version with additional context, capability summaries, complete service sections, full deliverable lists, fuller case-study content, and clearer project guidance.
- The home page was not changed by this final refinement pass.

## Previously implemented core features

- Dark mode is the default theme for first-time visitors.
- The global header is 10px taller and keeps the owner name on one line on small screens.
- The resume CTA is labeled `Download Resume` and points to the configured resume file/link.
- Inner-page hero banners use a compact dark visual system, gradients, motion, and a single H1 containing `Ahsanul Haque Chowdhury`.
- A fixed WhatsApp button is available globally and points to the configured WhatsApp number.
- A fixed animated portfolio chatbot remains available at the bottom-right of the viewport.
- The Gallery page contains 15 SEO-ready placeholder image entries that can be replaced from the CMS.
- Gallery data supports image title, alt text, caption, description, keywords, ImageObject structured data, and sitemap coverage.
- The Blog system includes a listing page plus individual indexable article pages.
- Blog content supports Markdown headings, paragraphs, lists, references, and anchor links.
- Portfolio case studies can be extended through CMS-managed JSON content.
- A noindex content CMS is available at `/admin`.

## CMS publishing workflow

The CMS uses the GitHub Contents API so changes are stored in the repository and can trigger a Vercel rebuild.

1. Open `/admin` on the deployed website.
2. Create a fine-grained GitHub Personal Access Token.
3. Limit the token to the `Ahsan-SWE/ahsan-s-portfolio` repository.
4. Give the token `Contents: Read and write` permission only.
5. Enter the repository, branch, and token in the CMS.
6. Click `Load latest content` before editing.
7. Add or edit Blog, Gallery, or Portfolio content.
8. Use the image uploader to save images into `public/uploads/`.
9. Complete image title, alt text, caption, description, and other relevant fields.
10. Click the appropriate Publish button so the CMS commits the JSON file to GitHub.

The token is kept in browser state and is not written into the repository content files.

## Google Search Console and indexing

The project remains prepared for Google Search Console after production deployment.

1. Set `NEXT_PUBLIC_SITE_URL` to the final production domain.
2. Keep `INDEXING_ENABLED=true` in production.
3. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if using the HTML-tag verification method.
4. Deploy the production website.
5. Confirm `/robots.txt` and `/sitemap.xml` load correctly.
6. Add the production property in Google Search Console.
7. Submit `/sitemap.xml`.
8. Request indexing for the important public pages, blog posts, gallery, and case studies.

## Validation note

The latest modified TypeScript and TSX files passed a syntax transpilation check, the JSON content files were validated, CSS braces were checked, and no Bengali text was found inside `src`.

A complete `npm run check` and browser verification could not be rerun in this workspace because the dependency installation could not finish before the environment timeout. Run `npm ci` and then `npm run check` on the development machine before production deployment.

## Final UI refinement pass

- Replaced the floating chat symbol with an animated agentic robot icon.
- Added HSC descriptive copy and stronger visual emphasis to home experience and education content.
- Added focused color highlights to About copy and card titles across non-blog pages.
- Changed the About portrait to a fixed-size cover treatment.
- Made footer service items link directly to their matching service pages.
- Rebuilt the Services project flow as a professional six-step two-row layout.
- Added related visual artwork to the Core Capability Snapshot cards.
- Updated blog and gallery image presentation to preserve the full image while filling the frame visually.
- Updated Gallery to 3 columns on large screens, 2 on medium, and 1 on small screens, with title-only captions.
- Removed numbered Section labels from case studies.
- Limited single blog featured images to 600px maximum height on large screens with responsive smaller limits.
- Replaced the footer hash-based Back to top link with smooth JavaScript scrolling that does not change the URL.
