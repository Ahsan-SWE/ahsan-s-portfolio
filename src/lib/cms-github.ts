import { randomUUID } from "node:crypto";

export type CmsCollection = "blog" | "gallery" | "portfolio";
export type CmsItem = Record<string, unknown>;

export const cmsPaths: Record<CmsCollection, string> = {
  blog: "src/content/blog.json",
  gallery: "src/content/gallery.json",
  portfolio: "src/content/portfolio.json",
};

const collectionNames = Object.keys(cmsPaths) as CmsCollection[];

function repoName() {
  return process.env.CMS_GITHUB_REPO?.trim() || "Ahsan-SWE/ahsan-s-portfolio";
}

function branchName() {
  return process.env.CMS_GITHUB_BRANCH?.trim() || "main";
}

function token() {
  return process.env.CMS_GITHUB_TOKEN?.trim() || "";
}

export function cmsGitHubInfo() {
  return { repo: repoName(), branch: branchName() };
}

export function isCmsGitHubConfigured() {
  return Boolean(repoName().includes("/") && branchName() && token());
}

function encodedPath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function githubRequest(path: string, init?: RequestInit, query = "") {
  const authToken = token();
  if (!authToken) throw new Error("CMS_GITHUB_TOKEN is not configured.");

  const suffix = query ? `?${query}` : "";
  const response = await fetch(`https://api.github.com/repos/${repoName()}/contents/${encodedPath(path)}${suffix}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${authToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message || `GitHub request failed with ${response.status}.`);
  }

  return response.json();
}

type GitHubFile = {
  content?: string;
  sha: string;
};

export async function readCmsFile<T>(path: string): Promise<{ data: T; sha: string }> {
  const file = (await githubRequest(path, undefined, new URLSearchParams({ ref: branchName() }).toString())) as GitHubFile;
  if (!file.content) throw new Error(`Could not read ${path} from GitHub.`);
  const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { data: JSON.parse(decoded) as T, sha: file.sha };
}

export async function readAllCmsCollections() {
  const entries = await Promise.all(
    collectionNames.map(async (collection) => [collection, (await readCmsFile<CmsItem[]>(cmsPaths[collection])).data] as const),
  );
  return Object.fromEntries(entries) as Record<CmsCollection, CmsItem[]>;
}

export async function writeCmsFile(path: string, data: unknown, message: string) {
  const current = await readCmsFile<unknown>(path);
  const body = {
    message,
    content: Buffer.from(`${JSON.stringify(data, null, 2)}\n`, "utf8").toString("base64"),
    sha: current.sha,
    branch: branchName(),
  };
  return githubRequest(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as Promise<{ commit?: { sha?: string } }>;
}

function safeUploadName(name: string) {
  const cleaned = name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  return `${Date.now()}-${randomUUID().slice(0, 8)}-${cleaned}`;
}

export async function uploadCmsImage(file: File) {
  const fileName = safeUploadName(file.name);
  const path = `public/uploads/${fileName}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const result = (await githubRequest(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Upload ${fileName} from portfolio CMS`,
      content: bytes.toString("base64"),
      branch: branchName(),
    }),
  })) as { commit?: { sha?: string } };
  return { image: `/uploads/${fileName}`, commitSha: result.commit?.sha ?? null };
}

export async function deleteCmsImage(imagePath: string) {
  if (!imagePath.startsWith("/uploads/")) return false;
  const path = `public${imagePath}`;
  let current: GitHubFile;
  try {
    current = (await githubRequest(path, undefined, new URLSearchParams({ ref: branchName() }).toString())) as GitHubFile;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.toLowerCase().includes("not found")) return false;
    throw error;
  }

  await githubRequest(path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Remove unused CMS image ${imagePath.split("/").pop()}`,
      sha: current.sha,
      branch: branchName(),
    }),
  });
  return true;
}

function uploadedImages(items: CmsItem[]) {
  return new Set(
    items
      .map((item) => (typeof item.image === "string" ? item.image : ""))
      .filter((image) => image.startsWith("/uploads/")),
  );
}

export async function publishCmsCollection(collection: CmsCollection, nextItems: CmsItem[]) {
  const allCurrent = await readAllCmsCollections();
  const previousItems = allCurrent[collection];
  const previousImages = uploadedImages(previousItems);
  allCurrent[collection] = nextItems;

  const referencedImages = new Set<string>();
  for (const items of Object.values(allCurrent)) {
    for (const image of uploadedImages(items)) referencedImages.add(image);
  }

  const imagesToRemove = [...previousImages].filter((image) => !referencedImages.has(image));
  const result = await writeCmsFile(
    cmsPaths[collection],
    nextItems,
    `Update ${collection} content from portfolio CMS`,
  );

  const cleanupWarnings: string[] = [];
  for (const image of imagesToRemove) {
    try {
      await deleteCmsImage(image);
    } catch (error) {
      cleanupWarnings.push(error instanceof Error ? `${image}: ${error.message}` : `${image}: cleanup failed`);
    }
  }

  return {
    commitSha: result.commit?.sha ?? null,
    removedImages: imagesToRemove.length - cleanupWarnings.length,
    cleanupWarnings,
  };
}
