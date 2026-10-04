import { NextResponse } from "next/server";
import { isCmsAuthenticated } from "@/lib/cms-auth";
import {
  CmsCollection,
  CmsItem,
  isCmsGitHubConfigured,
  publishCmsCollection,
} from "@/lib/cms-github";

export const runtime = "nodejs";

const collections = new Set<CmsCollection>([
  "blog",
  "gallery",
  "portfolio",
]);

function validate(
  collection: CmsCollection,
  items: CmsItem[],
) {
  const seenSlugs = new Set<string>();

  for (const item of items) {
    const title = String(item.title ?? "").trim();
    const image = String(item.image ?? "").trim();

    if (!title || !image) {
      throw new Error(
        "Every item needs a title and image.",
      );
    }

    if (collection === "gallery") {
      const alt = String(item.alt ?? "").trim();
      const description = String(
        item.description ?? "",
      ).trim();

      if (!alt || !description) {
        throw new Error(
          "Every gallery image needs alt text and a description.",
        );
      }

      continue;
    }

    const slug = String(item.slug ?? "").trim();

    if (!slug) {
      throw new Error(
        "Every blog post or portfolio item needs a slug.",
      );
    }

    if (seenSlugs.has(slug)) {
      throw new Error(`Duplicate slug: ${slug}`);
    }

    seenSlugs.add(slug);
  }
}

async function triggerVercelDeployment() {
  const deployHook =
    process.env.CMS_VERCEL_DEPLOY_HOOK?.trim();

  if (!deployHook) {
    return {
      deploymentTriggered: false,
      deploymentWarning:
        "CMS_VERCEL_DEPLOY_HOOK is not configured.",
    };
  }

  try {
    const response = await fetch(deployHook, {
      method: "POST",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        deploymentTriggered: false,
        deploymentWarning: `Vercel deployment trigger failed with status ${response.status}.`,
      };
    }

    return {
      deploymentTriggered: true,
      deploymentWarning: null,
    };
  } catch (error) {
    return {
      deploymentTriggered: false,
      deploymentWarning:
        error instanceof Error
          ? error.message
          : "Vercel deployment trigger failed.",
    };
  }
}

export async function POST(request: Request) {
  if (!(await isCmsAuthenticated())) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
      },
      {
        status: 401,
      },
    );
  }

  if (!isCmsGitHubConfigured()) {
    return NextResponse.json(
      {
        error:
          "GitHub publishing is not configured on the server.",
      },
      {
        status: 503,
      },
    );
  }

  const body = (await request
    .json()
    .catch(() => ({}))) as {
    collection?: CmsCollection;
    data?: CmsItem[];
  };

  if (
    !body.collection ||
    !collections.has(body.collection) ||
    !Array.isArray(body.data)
  ) {
    return NextResponse.json(
      {
        error: "Invalid publish request.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    validate(body.collection, body.data);

    const result = await publishCmsCollection(
      body.collection,
      body.data,
    );

    const deployment =
      await triggerVercelDeployment();

    return NextResponse.json({
      ok: true,
      ...result,
      ...deployment,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Publishing failed.",
      },
      {
        status: 500,
      },
    );
  }
}