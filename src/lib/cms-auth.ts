import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const CMS_SESSION_COOKIE = "portfolio_cms_session";

function adminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

function sessionSecret() {
  return process.env.CMS_SESSION_SECRET?.trim() || adminPassword();
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isCmsAuthConfigured() {
  return Boolean(adminPassword() && sessionSecret());
}

export function verifyCmsPassword(value: string) {
  const expected = adminPassword();
  return Boolean(expected) && safeEqual(value, expected);
}

export function cmsSessionValue() {
  const secret = sessionSecret();
  const password = adminPassword();
  if (!secret || !password) return "";
  return createHmac("sha256", secret).update(`portfolio-cms:${password}`).digest("hex");
}

export async function isCmsAuthenticated() {
  if (!isCmsAuthConfigured()) return false;
  const store = await cookies();
  const actual = store.get(CMS_SESSION_COOKIE)?.value ?? "";
  const expected = cmsSessionValue();
  return Boolean(actual && expected) && safeEqual(actual, expected);
}
