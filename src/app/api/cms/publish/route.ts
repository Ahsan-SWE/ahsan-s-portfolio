import { NextResponse } from "next/server";
import { isCmsAuthenticated } from "@/lib/cms-auth";
import {
  CmsCollection,
  CmsItem,
  isCmsGitHubConfigured,
  publishCmsCollection,
} from "@/lib/cms-github";

export const runtime = "nodejs";

const collections = new Set<CmsCollection>(["blog", "gallery", "portfolio"]);

function validate(collection: CmsCollection, items: CmsItem[]) {
  const seenSlugs = new Set<string>();

  for (const item of items) {
    const title = String(item.title ?? "").trim();
    const image = String(item.image ?? "").trim();
    if (!title || !image) throw new Error("Every item needs a title and image.");

    if (collection === "gallery") {
      if (!String(item.alt ?? "").trim() || !String(item.description ?? "").trim()) {
        throw new Error("Every gallery image needs alt text and a description.");
      }
      continue;
    }

    const slug = String(item.slug ?? "").trim();
    if (!slug) throw new Error("Every blog post or portfolio item needs a slug.");
    if (seenSlugs.has(slug)) throw new Error(`Duplicate slug: ${slug}`);
    seenSlugs.add(slug);
  }
}

export async function POST(request: Request) {
  if (!(await isCmsAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isCmsGitHubConfigured()) {
    return NextResponse.json({ error: "GitHub publishing is not configured on the server." }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    collection?: CmsCollection;
    data?: CmsItem[];
  };

  if (!body.collection || !collections.has(body.collection) || !Array.isArray(body.data)) {
    return NextResponse.json({ error: "Invalid publish request." }, { status: 400 });
  }

  try {
    validate(body.collection, body.data);
    const result = await publishCmsCollection(body.collection, body.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Publishing failed." },
      { status: 500 },
    );
  }
}
