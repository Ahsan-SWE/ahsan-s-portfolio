import { NextResponse } from "next/server";
import { isCmsAuthenticated } from "@/lib/cms-auth";
import {
  deleteCmsImage,
  isCmsGitHubConfigured,
  uploadCmsImage,
} from "@/lib/cms-github";

export const runtime = "nodejs";

const maxImageBytes = 8 * 1024 * 1024;

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const extensionByType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

function createSeoFriendlyFilename(file: File) {
  const originalName = file.name.replace(/\.[^.]+$/, "");

  const slug = originalName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 120);

  const extension =
    extensionByType[file.type] || "jpg";

  const safeBaseName =
    slug || `cms-image-${Date.now()}`;

  return `${safeBaseName}.${extension}`;
}

async function createSanitizedFile(file: File) {
  const safeFilename =
    createSeoFriendlyFilename(file);

  const buffer =
    await file.arrayBuffer();

  return new File(
    [buffer],
    safeFilename,
    {
      type: file.type,
      lastModified: file.lastModified,
    },
  );
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

  const formData =
    await request.formData();

  const file =
    formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        error: "Choose an image first.",
      },
      {
        status: 400,
      },
    );
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json(
      {
        error:
          "Use JPG, PNG, WebP, GIF, or AVIF images.",
      },
      {
        status: 400,
      },
    );
  }

  if (file.size > maxImageBytes) {
    return NextResponse.json(
      {
        error:
          "Image must be 8 MB or smaller.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const sanitizedFile =
      await createSanitizedFile(file);

    const result =
      await uploadCmsImage(
        sanitizedFile,
      );

    return NextResponse.json({
      ok: true,
      filename:
        sanitizedFile.name,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Image upload failed.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
) {
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

  const body = (await request
    .json()
    .catch(() => ({}))) as {
    image?: string;
  };

  if (
    !body.image?.startsWith(
      "/uploads/",
    )
  ) {
    return NextResponse.json({
      ok: true,
      removed: false,
    });
  }

  try {
    const removed =
      await deleteCmsImage(
        body.image,
      );

    return NextResponse.json({
      ok: true,
      removed,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Image cleanup failed.",
      },
      {
        status: 500,
      },
    );
  }
}