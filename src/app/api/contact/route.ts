import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-validation";
import { mailConfigured, sendContactMail } from "@/lib/contact-mail";
import { siteConfig } from "@/data/portfolio";
import { siteUrl } from "@/lib/site-url";

export const runtime = "nodejs";
export const maxDuration = 30;
const windowMs = 15 * 60 * 1000;
// This bounded limiter is per server instance. Add edge rate limiting for distributed traffic.
const attempts = new Map<string, { count: number; expires: number }>();
function reply(status: number, message: string) {
  return NextResponse.json(
    { ok: status === 200, message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "900" } : {}),
      },
    },
  );
}
function rateLimited(request: NextRequest) {
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires <= now) attempts.delete(key);
  const address =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown";
  const key = createHash("sha256").update(address).digest("hex");
  const current = attempts.get(key);
  if (current && current.count >= 5) return true;
  if (!current && attempts.size >= 5000) return true;
  attempts.set(key, {
    count: (current?.count ?? 0) + 1,
    expires: current?.expires ?? now + windowMs,
  });
  return false;
}
async function readLimitedBody(request: NextRequest): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 24_000) {
      await reader.cancel();
      throw new Error("large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowed = new Set([siteUrl]);
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  if (["localhost", "127.0.0.1"].includes(request.nextUrl.hostname)) {
    allowed.add(request.nextUrl.origin);
    const localPort = request.nextUrl.port ? `:${request.nextUrl.port}` : "";
    allowed.add(`${request.nextUrl.protocol}//localhost${localPort}`);
    allowed.add(`${request.nextUrl.protocol}//127.0.0.1${localPort}`);
  }
  if (!origin || !allowed.has(origin))
    return reply(403, "Please send the form from this website.");
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return reply(415, "Please use the website contact form.");
  if (Number(request.headers.get("content-length") || 0) > 24_000)
    return reply(
      413,
      "Your message is too large. Please keep it under 5,000 characters.",
    );
  let body: unknown;
  try {
    body = JSON.parse(await readLimitedBody(request));
  } catch (error) {
    return reply(
      error instanceof Error && error.message === "large" ? 413 : 400,
      "Please send a valid message under 5,000 characters.",
    );
  }
  const result = validateContact(body);
  if ("error" in result) return reply(400, result.error);
  if (!mailConfigured())
    return reply(
      503,
      `The form is temporarily unavailable. Please email ${siteConfig.email} directly. Your message has not been sent.`,
    );
  if (rateLimited(request))
    return reply(
      429,
      "Too many attempts. Please try again in 15 minutes or contact me directly by email.",
    );
  try {
    await sendContactMail(result.data);
    return reply(
      200,
      "Your message has been sent. Thank you for getting in touch.",
    );
  } catch {
    console.error(
      "Contact email delivery failed. Check SMTP configuration and provider logs.",
    );
    return reply(
      502,
      `I could not confirm that your message was sent. Please email ${siteConfig.email} directly.`,
    );
  }
}
