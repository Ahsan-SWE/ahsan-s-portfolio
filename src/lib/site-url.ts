const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://ahsanulhaquechowdhury.vercel.app";
const parsedUrl = new URL(
  /^https?:\/\//i.test(configuredUrl)
    ? configuredUrl
    : `https://${configuredUrl}`,
);
if (!["http:", "https:"].includes(parsedUrl.protocol))
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP or HTTPS URL.");
export const siteUrl = parsedUrl.origin;
export const siteUrlObject = new URL(siteUrl);
