import { NextResponse } from "next/server";
import { isCmsAuthenticated } from "@/lib/cms-auth";
import { cmsGitHubInfo, isCmsGitHubConfigured, readAllCmsCollections } from "@/lib/cms-github";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isCmsAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isCmsGitHubConfigured()) {
    return NextResponse.json({ error: "GitHub publishing is not configured on the server." }, { status: 503 });
  }

  try {
    const data = await readAllCmsCollections();
    return NextResponse.json({ data, target: cmsGitHubInfo() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load CMS content." },
      { status: 500 },
    );
  }
}
