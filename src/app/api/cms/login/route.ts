import { NextResponse } from "next/server";
import {
  CMS_SESSION_COOKIE,
  cmsSessionValue,
  isCmsAuthConfigured,
  verifyCmsPassword,
} from "@/lib/cms-auth";

export async function POST(request: Request) {
  if (!isCmsAuthConfigured()) {
    return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as { password?: string };
  if (!body.password || !verifyCmsPassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CMS_SESSION_COOKIE, cmsSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
