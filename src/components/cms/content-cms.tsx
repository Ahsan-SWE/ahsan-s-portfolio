"use client";

import type { ChangeEvent } from "react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { BlogMarkdownEditor } from "@/components/cms/blog-markdown-editor";
import { MarkdownContent } from "@/components/pages/markdown-content";

import blogSeed from "@/content/blog.json";
import gallerySeed from "@/content/gallery.json";
import portfolioSeed from "@/content/portfolio.json";

type Collection =
  | "blog"
  | "gallery"
  | "portfolio";

type JsonItem = Record<string, unknown>;

type CmsData = Record<
  Collection,
  JsonItem[]
>;

type Target = {
  repo: string;
  branch: string;
};

type GalleryBatchItem = {
  file: File;
  previewUrl: string;
  title: string;
  alt: string;
  caption: string;
  description: string;
  keywords: string[];
};

const AUTHOR =
  "Ahsanul Haque Chowdhury";

const BLOG_DRAFT_KEY =
  "ahsan-portfolio-cms-blog-draft";

const MAX_IMAGE_SIZE =
  4 * 1024 * 1024;

function today() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  date: today(),
  author: AUTHOR,
  image: "",
  imageAlt: "",
  imageTitle: "",
  metaTitle: "",
  metaDescription: "",
  tags: [] as string[],
  content: "",
};

const emptyGallery = {
  title: "",
  image: "",
  alt: "",
  description: "",
  caption: "",
  keywords: [] as string[],
};

const emptyPortfolio = {
  title: "",
  slug: "",
  summary: "",
  category: "",
  url: "",
  image: "",
  alt: "",
  tags: [] as string[],
  challenge: "",
  solution: "",
  result: "",
  metaTitle: "",
  metaDescription: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toText(value: unknown) {
  return typeof value === "string"
    ? value
    : "";
}

function plainTextFromMarkdown(
  value: string,
) {
  return value
    .replace(
      /!\[[^\]]*\]\([^)]+\)/g,
      " ",
    )
    .replace(
      /\[([^\]]+)\]\([^)]+\)/g,
      "$1",
    )
    .replace(
      /^#{1,6}\s+/gm,
      "",
    )
    .replace(
      /^>\s?/gm,
      "",
    )
    .replace(
      /^[-*]\s+/gm,
      "",
    )
    .replace(
      /^\d+\.\s+/gm,
      "",
    )
    .replace(
      /[*_`]/g,
      "",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

function limitText(
  value: string,
  max: number,
) {
  const text = value
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= max) {
    return text;
  }

  return `${text
    .slice(0, max - 3)
    .trimEnd()}...`;
}

function titleFromFilename(
  filename: string,
) {
  const withoutExtension =
    filename.replace(
      /\.[^.]+$/,
      "",
    );

  return withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    )
    .trim();
}

function validImage(file: File) {
  const allowed = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
  ]);

  if (!allowed.has(file.type)) {
    return "Only JPG, PNG, WebP, GIF, and AVIF images are supported.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Each image must be 4 MB or smaller.";
  }

  return "";
}

async function readJson<T>(
  response: Response,
): Promise<T> {
  const body = (await response
    .json()
    .catch(() => ({}))) as T & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(
      body.error ||
        `Request failed with ${response.status}.`,
    );
  }

  return body;
}

export function ContentCms() {
  const [activeCollection, setActiveCollection] =
    useState<Collection | null>(
      null,
    );

  const [collection, setCollection] =
    useState<Collection>("blog");

  const [data, setData] =
    useState<CmsData>({
      blog: blogSeed as JsonItem[],
      gallery:
        gallerySeed as JsonItem[],
      portfolio:
        portfolioSeed as JsonItem[],
    });

  const [form, setForm] =
    useState<JsonItem>({
      ...emptyBlog,
    });

  const [
    editingIndex,
    setEditingIndex,
  ] = useState<number | null>(
    null,
  );

  const [
    pendingImage,
    setPendingImage,
  ] = useState<File | null>(
    null,
  );

  const [
    fileInputKey,
    setFileInputKey,
  ] = useState(0);

  const [
    galleryInputKey,
    setGalleryInputKey,
  ] = useState(0);

  const [
    galleryBatch,
    setGalleryBatch,
  ] = useState<
    GalleryBatchItem[]
  >([]);

  const [target, setTarget] =
    useState<Target | null>(
      null,
    );

  const [status, setStatus] =
    useState(
      "Choose an action to start publishing.",
    );

  const [busy, setBusy] =
    useState(false);

  const [
    showBlogPreview,
    setShowBlogPreview,
  ] = useState(false);

  const [
    hasBlogDraft,
    setHasBlogDraft,
  ] = useState(false);

  const items = data[collection];

  const currentTitle =
    useMemo(() => {
      if (
        collection === "blog"
      ) {
        return "Blog posts";
      }

      if (
        collection ===
        "gallery"
      ) {
        return "Gallery images";
      }

      return "Portfolio projects";
    }, [collection]);

  useEffect(() => {
    setHasBlogDraft(
      Boolean(
        window.localStorage.getItem(
          BLOG_DRAFT_KEY,
        ),
      ),
    );
  }, []);

  useEffect(() => {
    if (
      activeCollection !==
      "blog"
    ) {
      return;
    }

    const title = toText(
      form.title,
    ).trim();

    const content = toText(
      form.content,
    ).trim();

    if (!title && !content) {
      return;
    }

    window.localStorage.setItem(
      BLOG_DRAFT_KEY,
      JSON.stringify(form),
    );

    setHasBlogDraft(true);
  }, [
    activeCollection,
    form,
  ]);

  function blankFor(
    type: Collection,
  ): JsonItem {
    if (type === "blog") {
      return {
        ...emptyBlog,
        date: today(),
      };
    }

    if (
      type === "gallery"
    ) {
      return {
        ...emptyGallery,
      };
    }

    return {
      ...emptyPortfolio,
    };
  }

  function clearPendingImage() {
    setPendingImage(null);

    setFileInputKey(
      (current) =>
        current + 1,
    );
  }

  function startNew(
    type: Collection,
  ) {
    setCollection(type);
    setActiveCollection(type);

    setEditingIndex(null);
    setShowBlogPreview(false);

    clearPendingImage();

    setGalleryBatch([]);

    setGalleryInputKey(
      (current) =>
        current + 1,
    );

    setForm(blankFor(type));

    setStatus(
      type === "blog"
        ? "Ready to write a new blog post."
        : type ===
            "gallery"
          ? "Select one or more images to add to the gallery."
          : "Ready to add a new portfolio project.",
    );
  }

  function backToDashboard() {
    setActiveCollection(null);
    setEditingIndex(null);
    setShowBlogPreview(false);

    clearPendingImage();

    setGalleryBatch([]);

    setStatus(
      "Choose an action to start publishing.",
    );
  }

  function update(
    key: string,
    value: unknown,
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateTitle(
    value: string,
  ) {
    setForm((current) => {
      const next: JsonItem = {
        ...current,
        title: value,
      };

      if (
        collection !==
          "gallery" &&
        editingIndex === null
      ) {
        next.slug =
          slugify(value);
      }

      return next;
    });
  }

  function prepareBlog(
    source: JsonItem,
  ) {
    const draft = {
      ...source,
    };

    const title = toText(
      draft.title,
    ).trim();

    const content = toText(
      draft.content,
    );

    const plain =
      plainTextFromMarkdown(
        content,
      );

    const generatedExcerpt =
      limitText(plain, 180);

    draft.slug =
      slugify(
        toText(draft.slug) ||
          title,
      );

    draft.date =
      toText(draft.date) ||
      today();

    draft.author =
      toText(draft.author) ||
      AUTHOR;

    draft.excerpt =
      toText(
        draft.excerpt,
      ).trim() ||
      generatedExcerpt;

    draft.metaTitle =
      toText(
        draft.metaTitle,
      ).trim() ||
      limitText(title, 60);

    draft.metaDescription =
      toText(
        draft.metaDescription,
      ).trim() ||
      limitText(
        generatedExcerpt,
        140,
      );

    draft.imageAlt =
      toText(
        draft.imageAlt,
      ).trim() ||
      title;

    draft.imageTitle =
      toText(
        draft.imageTitle,
      ).trim() ||
      title;

    draft.tags =
      Array.isArray(
        draft.tags,
      )
        ? draft.tags
        : [];

    return draft;
  }

  function preparePortfolio(
    source: JsonItem,
  ) {
    const draft = {
      ...source,
    };

    const title = toText(
      draft.title,
    ).trim();

    const summary = toText(
      draft.summary,
    ).trim();

    draft.slug =
      slugify(
        toText(draft.slug) ||
          title,
      );

    draft.alt =
      toText(
        draft.alt,
      ).trim() ||
      title;

    draft.metaTitle =
      toText(
        draft.metaTitle,
      ).trim() ||
      limitText(title, 60);

    draft.metaDescription =
      toText(
        draft.metaDescription,
      ).trim() ||
      limitText(
        summary,
        140,
      );

    draft.tags =
      Array.isArray(
        draft.tags,
      )
        ? draft.tags
        : [];

    return draft;
  }

  function prepareGallery(
    source: JsonItem,
  ) {
    const draft = {
      ...source,
    };

    const title = toText(
      draft.title,
    ).trim();

    const alt =
      toText(
        draft.alt,
      ).trim() ||
      title;

    draft.alt = alt;

    draft.description =
      toText(
        draft.description,
      ).trim() ||
      alt;

    draft.caption =
      toText(
        draft.caption,
      ).trim() ||
      title;

    draft.keywords =
      Array.isArray(
        draft.keywords,
      )
        ? draft.keywords
        : [];

    return draft;
  }

  function validateDraft(
    draft: JsonItem,
  ) {
    const imageReady =
      Boolean(
        toText(
          draft.image,
        ).trim() ||
          pendingImage,
      );

    const required =
      collection === "blog"
        ? [
            "title",
            "slug",
            "content",
          ]
        : collection ===
            "portfolio"
          ? [
              "title",
              "slug",
              "summary",
              "category",
            ]
          : [
              "title",
              "alt",
            ];

    const missing =
      required.filter(
        (key) =>
          !toText(
            draft[key],
          ).trim(),
      );

    if (!imageReady) {
      missing.push(
        "image",
      );
    }

    if (missing.length) {
      throw new Error(
        `Please complete: ${missing.join(", ")}.`,
      );
    }
  }

  async function loadLatestContent() {
    if (busy) {
      return;
    }

    setBusy(true);

    setStatus(
      "Loading the latest content from GitHub...",
    );

    try {
      const response =
        await fetch(
          "/api/cms/content",
          {
            cache:
              "no-store",
          },
        );

      const body =
        await readJson<{
          data: CmsData;
          target: Target;
        }>(response);

      setData(body.data);
      setTarget(body.target);

      setStatus(
        "Latest content loaded successfully.",
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not load the latest content.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function uploadFile(
    file: File,
  ) {
    const payload =
      new FormData();

    payload.append(
      "file",
      file,
    );

    const response =
      await fetch(
        "/api/cms/image",
        {
          method: "POST",
          body: payload,
        },
      );

    return readJson<{
      image: string;
    }>(response);
  }

  async function cleanupImage(
    image: string,
  ) {
    if (
      !image.startsWith(
        "/uploads/",
      )
    ) {
      return;
    }

    await fetch(
      "/api/cms/image",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          image,
        }),
      },
    ).catch(
      () => undefined,
    );
  }

  async function publishCollection(
    type: Collection,
    nextItems: JsonItem[],
  ) {
    const response =
      await fetch(
        "/api/cms/publish",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            collection: type,
            data: nextItems,
          }),
        },
      );

    return readJson<{
      commitSha: string | null;
      removedImages: number;
      cleanupWarnings: string[];
      deploymentTriggered: boolean;
      deploymentWarning: string | null;
    }>(response);
  }

  async function saveAndPublish() {
    if (busy) {
      return;
    }

    let draft: JsonItem = {
      ...form,
    };

    if (
      collection === "blog"
    ) {
      draft =
        prepareBlog(draft);
    }

    if (
      collection ===
      "portfolio"
    ) {
      draft =
        preparePortfolio(
          draft,
        );
    }

    if (
      collection ===
      "gallery"
    ) {
      draft =
        prepareGallery(
          draft,
        );
    }

    try {
      validateDraft(draft);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Please complete the required fields.",
      );

      return;
    }

    setBusy(true);

    setStatus(
      pendingImage
        ? "Uploading the image and publishing..."
        : "Publishing...",
    );

    let uploadedImage = "";

    try {
      if (pendingImage) {
        const uploaded =
          await uploadFile(
            pendingImage,
          );

        uploadedImage =
          uploaded.image;

        draft.image =
          uploaded.image;
      }

      const nextItems = [
        ...items,
      ];

      if (
        editingIndex === null
      ) {
        nextItems.unshift(
          draft,
        );
      } else {
        nextItems[
          editingIndex
        ] = draft;
      }

      const result =
        await publishCollection(
          collection,
          nextItems,
        );

      setData(
        (current) => ({
          ...current,
          [collection]:
            nextItems,
        }),
      );

      if (
        collection === "blog"
      ) {
        window.localStorage.removeItem(
          BLOG_DRAFT_KEY,
        );

        setHasBlogDraft(
          false,
        );
      }

      setEditingIndex(null);
      clearPendingImage();

      setForm(
        blankFor(
          collection,
        ),
      );

      setShowBlogPreview(
        false,
      );

      if (!result.deploymentTriggered) {
        setStatus(
          `Content was published to GitHub, but Vercel deployment was not triggered. ${
            result.deploymentWarning ||
            "Check the deploy hook configuration."
          }`,
        );
      } else if (
        result.cleanupWarnings.length
      ) {
        setStatus(
          `Published successfully and deployment triggered. ${result.cleanupWarnings.length} image cleanup warning(s) remain.`,
        );
      } else {
        setStatus(
          "Published successfully. Vercel production deployment was triggered.",
        );
      }
    } catch (error) {
      if (uploadedImage) {
        await cleanupImage(
          uploadedImage,
        );
      }

      setStatus(
        error instanceof Error
          ? error.message
          : "Publishing failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function publishGalleryBatch() {
    if (
      busy ||
      galleryBatch.length === 0
    ) {
      return;
    }

    for (
      const item of galleryBatch
    ) {
      if (!item.alt.trim()) {
        setStatus(
          `Please add alt text for ${item.title}.`,
        );

        return;
      }
    }

    setBusy(true);

    setStatus(
      `Uploading ${galleryBatch.length} gallery image(s)...`,
    );

    const uploadedPaths: string[] =
      [];

    try {
      const newItems: JsonItem[] =
        [];

      for (
        const item of
          galleryBatch
      ) {
        const uploaded =
          await uploadFile(
            item.file,
          );

        uploadedPaths.push(
          uploaded.image,
        );

     newItems.push({
  title:
    item.title.trim(),
  image:
    uploaded.image,
  alt:
    item.alt.trim(),
  description:
    item.description.trim() ||
    item.alt.trim(),
  caption:
    item.caption.trim() ||
    item.title.trim(),
  keywords:
    item.keywords,
});
      }

      const nextItems = [
        ...newItems,
        ...data.gallery,
      ];

      const result =
        await publishCollection(
          "gallery",
          nextItems,
        );

      setData(
        (current) => ({
          ...current,
          gallery:
            nextItems,
        }),
      );

      setGalleryBatch(
        [],
      );

      setGalleryInputKey(
        (current) =>
          current + 1,
      );

      if (!result.deploymentTriggered) {
        setStatus(
          `Gallery was published to GitHub, but Vercel deployment was not triggered. ${
            result.deploymentWarning ||
            "Check the deploy hook configuration."
          }`,
        );
      } else if (
        result.cleanupWarnings.length
      ) {
        setStatus(
          `Gallery published and deployment triggered. ${result.cleanupWarnings.length} cleanup warning(s) remain.`,
        );
      } else {
        setStatus(
          `${newItems.length} gallery image(s) published successfully. Vercel production deployment was triggered.`,
        );
      }
    } catch (error) {
      await Promise.all(
        uploadedPaths.map(
          (image) =>
            cleanupImage(
              image,
            ),
        ),
      );

      setStatus(
        error instanceof Error
          ? error.message
          : "Gallery publishing failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem(
    index: number,
  ) {
    if (
      busy ||
      !window.confirm(
        "Delete this item and publish the change now?",
      )
    ) {
      return;
    }

    const nextItems =
      items.filter(
        (
          _,
          itemIndex,
        ) =>
          itemIndex !==
          index,
      );

    setBusy(true);

    setStatus(
      "Deleting and publishing...",
    );

    try {
      const result =
        await publishCollection(
          collection,
          nextItems,
        );

      setData(
        (current) => ({
          ...current,
          [collection]:
            nextItems,
        }),
      );

      if (
        editingIndex ===
        index
      ) {
        setEditingIndex(
          null,
        );

        clearPendingImage();

        setForm(
          blankFor(
            collection,
          ),
        );
      }

      if (!result.deploymentTriggered) {
        setStatus(
          `Item was deleted from GitHub, but Vercel deployment was not triggered. ${
            result.deploymentWarning ||
            "Check the deploy hook configuration."
          }`,
        );
      } else if (
        result.cleanupWarnings.length
      ) {
        setStatus(
          `Item deleted and deployment triggered. ${result.cleanupWarnings.length} cleanup warning(s) remain.`,
        );
      } else {
        setStatus(
          "Item deleted successfully. Vercel production deployment was triggered.",
        );
      }
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not delete the item.",
      );
    } finally {
      setBusy(false);
    }
  }

  function editItem(
    index: number,
  ) {
    setEditingIndex(
      index,
    );

    clearPendingImage();

    setGalleryBatch([]);

    setForm({
      ...items[index],
    });

    setShowBlogPreview(
      false,
    );

    setStatus(
      "Editing existing content. Publish when the changes are ready.",
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingIndex(
      null,
    );

    clearPendingImage();

    setForm(
      blankFor(
        collection,
      ),
    );

    setShowBlogPreview(
      false,
    );

    setStatus(
      "Edit cancelled.",
    );
  }

  async function logout() {
    await fetch(
      "/api/cms/logout",
      {
        method: "POST",
      },
    ).catch(
      () => undefined,
    );

    window.location.reload();
  }

  function chooseImage(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] ??
      null;

    if (!file) {
      return;
    }

    const error = validImage(file);

    if (error) {
      setStatus(error);
      event.target.value = "";
      return;
    }

    setPendingImage(file);

    setStatus(
      `${file.name} selected. It will upload when you publish.`,
    );
  }

  function chooseGalleryImages(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(
      event.target.files ?? [],
    );

    if (!files.length) {
      return;
    }

    if (files.length > 20) {
      setStatus(
        "Please upload no more than 20 images at one time.",
      );
      event.target.value = "";
      return;
    }

    for (const file of files) {
      const error = validImage(file);

      if (error) {
        setStatus(`${file.name}: ${error}`);
        event.target.value = "";
        return;
      }
    }

    setGalleryBatch((current) => {
      current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });

      return files.map((file) => {
        const title = titleFromFilename(
          file.name,
        );

        return {
          file,
          previewUrl: URL.createObjectURL(
            file,
          ),
          title,
          alt: title,
          caption: title,
          description: "",
          keywords: [],
        };
      });
    });

    setStatus(
      `${files.length} image(s) selected. Review the image SEO details, then publish.`,
    );
  }

  function updateGalleryItem(
    index: number,
    key:
      | "title"
      | "alt"
      | "caption"
      | "description"
      | "keywords",
    value: string | string[],
  ) {
    setGalleryBatch((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [key]: value,
            }
          : item,
      ),
    );
  }

  function removeGalleryItem(
    index: number,
  ) {
    setGalleryBatch((current) => {
      const target = current[index];

      if (target) {
        URL.revokeObjectURL(
          target.previewUrl,
        );
      }

      return current.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      );
    });
  }

  function saveBlogDraft() {
    window.localStorage.setItem(
      BLOG_DRAFT_KEY,
      JSON.stringify(form),
    );

    setHasBlogDraft(true);

    setStatus(
      "Blog draft saved in this browser.",
    );
  }

  function loadBlogDraft() {
    const stored =
      window.localStorage.getItem(
        BLOG_DRAFT_KEY,
      );

    if (!stored) {
      setStatus(
        "No saved blog draft was found.",
      );

      return;
    }

    try {
      const parsed =
        JSON.parse(
          stored,
        ) as JsonItem;

      setForm(parsed);

      setEditingIndex(
        null,
      );

      setStatus(
        "Saved blog draft restored.",
      );
    } catch {
      setStatus(
        "The saved draft could not be restored.",
      );
    }
  }

  function clearBlogDraft() {
    window.localStorage.removeItem(
      BLOG_DRAFT_KEY,
    );

    setHasBlogDraft(
      false,
    );

    setStatus(
      "Saved browser draft cleared.",
    );
  }

  if (
    activeCollection === null
  ) {
    return (
      <div className="space-y-8">
        <section className="surface-panel">
          <p className="eyebrow">
            Content dashboard
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            What do you want to publish?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Create and manage blog posts,
            gallery images, and portfolio
            projects without editing JSON or
            using terminal commands.
          </p>

          {target ? (
            <p className="mt-4 text-sm font-semibold text-blue-700 dark:text-blue-300">
              Target: {target.repo} /{" "}
              {target.branch}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="button-secondary"
              onClick={
                loadLatestContent
              }
              disabled={busy}
            >
              Refresh content
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={logout}
              disabled={busy}
            >
              Log out
            </button>
          </div>

          <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-200">
            {busy
              ? "Working..."
              : status}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <DashboardCard
            eyebrow="Blog"
            title="New Blog Post"
            description="Write, format, preview, and publish a new article."
            count={
              data.blog.length
            }
            buttonLabel="Write Blog"
            onClick={() =>
              startNew(
                "blog",
              )
            }
          />

          <DashboardCard
            eyebrow="Gallery"
            title="Add Gallery Images"
            description="Upload multiple images together and publish them in one step."
            count={
              data.gallery.length
            }
            buttonLabel="Add Images"
            onClick={() =>
              startNew(
                "gallery",
              )
            }
          />

          <DashboardCard
            eyebrow="Portfolio"
            title="Add Portfolio Project"
            description="Add a project with the main details and optional case study information."
            count={
              data.portfolio
                .length
            }
            buttonLabel="Add Project"
            onClick={() =>
              startNew(
                "portfolio",
              )
            }
          />
        </section>

        <section className="surface-panel">
          <p className="eyebrow">
            Manage content
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Edit existing content
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="button-secondary"
              onClick={() =>
                startNew(
                  "blog",
                )
              }
            >
              Manage Blog
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={() =>
                startNew(
                  "gallery",
                )
              }
            >
              Manage Gallery
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={() =>
                startNew(
                  "portfolio",
                )
              }
            >
              Manage Portfolio
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="surface-panel">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="eyebrow">
              Quick publishing
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {currentTitle}
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {items.length} published item
              {items.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="button-secondary"
              onClick={
                loadLatestContent
              }
              disabled={busy}
            >
              Refresh
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={
                backToDashboard
              }
              disabled={busy}
            >
              Dashboard
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={logout}
              disabled={busy}
            >
              Log out
            </button>
          </div>
        </div>

        <p className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-200">
          {busy
            ? "Working..."
            : status}
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={
            collection ===
            "blog"
              ? "rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              : "rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100"
          }
          onClick={() =>
            startNew("blog")
          }
          disabled={busy}
        >
          Blog
        </button>

        <button
          type="button"
          className={
            collection ===
            "gallery"
              ? "rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              : "rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100"
          }
          onClick={() =>
            startNew(
              "gallery",
            )
          }
          disabled={busy}
        >
          Gallery
        </button>

        <button
          type="button"
          className={
            collection ===
            "portfolio"
              ? "rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              : "rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100"
          }
          onClick={() =>
            startNew(
              "portfolio",
            )
          }
          disabled={busy}
        >
          Portfolio
        </button>
      </div>

      <section className="grid gap-8 xl:grid-cols-[1fr_.78fr]">
        <div className="surface-panel">
          {collection ===
          "blog" ? (
            <>
              <p className="eyebrow">
                {editingIndex ===
                null
                  ? "New post"
                  : "Edit post"}
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {editingIndex ===
                null
                  ? "Write Blog Post"
                  : "Update Blog Post"}
              </h2>

              <div className="mt-6 grid gap-5">
                <Field
                  label="Blog title"
                  value={toText(
                    form.title,
                  )}
                  onChange={
                    updateTitle
                  }
                />

                <ImagePicker
                  label="Featured image"
                  fileInputKey={
                    fileInputKey
                  }
                  pendingImage={
                    pendingImage
                  }
                  currentImage={toText(
                    form.image,
                  )}
                  onChange={
                    chooseImage
                  }
                  onClear={
                    clearPendingImage
                  }
                  disabled={busy}
                />

                <BlogMarkdownEditor
                  value={toText(
                    form.content,
                  )}
                  onChange={(
                    value,
                  ) =>
                    update(
                      "content",
                      value,
                    )
                  }
                  disabled={busy}
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={
                      saveBlogDraft
                    }
                    disabled={busy}
                  >
                    Save Draft
                  </button>

                  {hasBlogDraft ? (
                    <>
                      <button
                        type="button"
                        className="button-secondary"
                        onClick={
                          loadBlogDraft
                        }
                        disabled={busy}
                      >
                        Restore Draft
                      </button>

                      <button
                        type="button"
                        className="button-secondary"
                        onClick={
                          clearBlogDraft
                        }
                        disabled={busy}
                      >
                        Clear Draft
                      </button>
                    </>
                  ) : null}

                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() =>
                      setShowBlogPreview(
                        (
                          current,
                        ) =>
                          !current,
                      )
                    }
                    disabled={busy}
                  >
                    {showBlogPreview
                      ? "Hide Preview"
                      : "Preview"}
                  </button>
                </div>

                {showBlogPreview ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
                    <p className="eyebrow">
                      Preview
                    </p>

                    <h1 className="mt-3 text-3xl font-bold">
                      {toText(
                        form.title,
                      ) ||
                        "Untitled blog post"}
                    </h1>

                    <div className="mt-6">
                      <MarkdownContent
                        content={toText(
                          form.content,
                        )}
                      />
                    </div>
                  </div>
                ) : null}

                <details className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                  <summary className="cursor-pointer font-bold">
                    Advanced SEO and post settings
                  </summary>

                  <div className="mt-5 grid gap-5">
                    <Field
                      label="Slug"
                      value={toText(
                        form.slug,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "slug",
                          slugify(
                            value,
                          ),
                        )
                      }
                    />

                    <TextArea
                      label="Excerpt"
                      value={toText(
                        form.excerpt,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "excerpt",
                          value,
                        )
                      }
                      rows={3}
                    />

                    <Field
                      label="Publication date"
                      type="date"
                      value={toText(
                        form.date,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "date",
                          value,
                        )
                      }
                    />

                    <Field
                      label="Author"
                      value={toText(
                        form.author,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "author",
                          value,
                        )
                      }
                    />

                    <Field
                      label="Image alt text"
                      value={toText(
                        form.imageAlt,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "imageAlt",
                          value,
                        )
                      }
                    />

                    <Field
                      label="Image title"
                      value={toText(
                        form.imageTitle,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "imageTitle",
                          value,
                        )
                      }
                    />

                    <Field
                      label="SEO title"
                      value={toText(
                        form.metaTitle,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "metaTitle",
                          value,
                        )
                      }
                    />

                    <CharacterCount
                      value={toText(
                        form.metaTitle,
                      )}
                      recommended="50-60 characters"
                    />

                    <TextArea
                      label="Meta description"
                      value={toText(
                        form.metaDescription,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "metaDescription",
                          value,
                        )
                      }
                      rows={3}
                    />

                    <CharacterCount
                      value={toText(
                        form.metaDescription,
                      )}
                      recommended="130-140 characters"
                    />

                    <ListField
                      label="Tags"
                      value={
                        form.tags
                      }
                      onChange={(
                        value,
                      ) =>
                        update(
                          "tags",
                          value,
                        )
                      }
                    />
                  </div>
                </details>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="button-primary"
                    onClick={
                      saveAndPublish
                    }
                    disabled={busy}
                  >
                    {editingIndex ===
                    null
                      ? "Publish Blog Post"
                      : "Save and Publish Changes"}
                  </button>

                  {editingIndex !==
                  null ? (
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={
                        cancelEdit
                      }
                      disabled={busy}
                    >
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}

          {collection ===
            "gallery" &&
          editingIndex ===
            null ? (
            <>
              <p className="eyebrow">
                Quick upload
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Add Gallery Images
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Select multiple images. Titles are generated from the file names. Review the alt text and publish everything together.
              </p>

              <div className="mt-6">
                <label
                  className="form-label"
                  htmlFor="cms-gallery-batch"
                >
                  Select images
                </label>

                <input
                  key={
                    galleryInputKey
                  }
                  id="cms-gallery-batch"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  onChange={
                    chooseGalleryImages
                  }
                  disabled={busy}
                  className="form-field file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white"
                />
              </div>
              {galleryBatch.length > 0 ? (
                <div className="mt-6 space-y-5">
                  {galleryBatch.map((item, index) => (
                    <article
                      key={`${item.file.name}-${index}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700"
                    >
                      <div className="grid gap-5 p-5 md:grid-cols-[180px_1fr]">
                        <div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.previewUrl}
                            alt={item.alt || item.title}
                            className="h-44 w-full rounded-xl bg-slate-100 object-contain dark:bg-slate-950"
                          />

                          <p className="mt-2 break-all text-xs text-slate-500 dark:text-slate-400">
                            {item.file.name}
                          </p>
                        </div>

                        <div className="grid gap-4">
                          <Field
                            label={`Image title ${index + 1}`}
                            value={item.title}
                            onChange={(value) =>
                              updateGalleryItem(
                                index,
                                "title",
                                value,
                              )
                            }
                          />

                          <Field
                            label={`Alt text ${index + 1}`}
                            value={item.alt}
                            onChange={(value) =>
                              updateGalleryItem(
                                index,
                                "alt",
                                value,
                              )
                            }
                          />

                          <details className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                            <summary className="cursor-pointer font-semibold">
                              Advanced Image Details
                            </summary>

                            <div className="mt-4 grid gap-4">
                              <Field
                                label={`Caption ${index + 1}`}
                                value={item.caption}
                                onChange={(value) =>
                                  updateGalleryItem(
                                    index,
                                    "caption",
                                    value,
                                  )
                                }
                              />

                              <TextArea
                                label={`Description ${index + 1}`}
                                value={item.description}
                                onChange={(value) =>
                                  updateGalleryItem(
                                    index,
                                    "description",
                                    value,
                                  )
                                }
                                rows={3}
                              />

                              <ListField
                                label={`Keywords ${index + 1}`}
                                value={item.keywords}
                                onChange={(value) =>
                                  updateGalleryItem(
                                    index,
                                    "keywords",
                                    value,
                                  )
                                }
                              />
                            </div>
                          </details>

                          <button
                            type="button"
                            className="w-fit font-semibold text-red-600 dark:text-red-400"
                            onClick={() =>
                              removeGalleryItem(index)
                            }
                            disabled={busy}
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="button-primary"
                      onClick={publishGalleryBatch}
                      disabled={busy}
                    >
                      Publish {galleryBatch.length} Image
                      {galleryBatch.length === 1 ? "" : "s"}
                    </button>

                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => {
                        galleryBatch.forEach((item) => {
                          URL.revokeObjectURL(
                            item.previewUrl,
                          );
                        });

                        setGalleryBatch([]);
                        setGalleryInputKey(
                          (current) => current + 1,
                        );
                      }}
                      disabled={busy}
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          {collection ===
            "gallery" &&
          editingIndex !==
            null ? (
            <>
              <p className="eyebrow">
                Edit image
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Update Gallery Image
              </h2>

              <div className="mt-6 grid gap-5">
                <Field
                  label="Title"
                  value={toText(
                    form.title,
                  )}
                  onChange={
                    updateTitle
                  }
                />

                <ImagePicker
                  label="Replace image"
                  fileInputKey={
                    fileInputKey
                  }
                  pendingImage={
                    pendingImage
                  }
                  currentImage={toText(
                    form.image,
                  )}
                  onChange={
                    chooseImage
                  }
                  onClear={
                    clearPendingImage
                  }
                  disabled={busy}
                />

                <Field
                  label="Alt text"
                  value={toText(
                    form.alt,
                  )}
                  onChange={(
                    value,
                  ) =>
                    update(
                      "alt",
                      value,
                    )
                  }
                />

                <details className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                  <summary className="cursor-pointer font-bold">
                    Advanced image details
                  </summary>

                  <div className="mt-5 grid gap-5">
                    <Field
                      label="Caption"
                      value={toText(
                        form.caption,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "caption",
                          value,
                        )
                      }
                    />

                    <TextArea
                      label="Description"
                      value={toText(
                        form.description,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "description",
                          value,
                        )
                      }
                      rows={4}
                    />

                    <ListField
                      label="Keywords"
                      value={
                        form.keywords
                      }
                      onChange={(
                        value,
                      ) =>
                        update(
                          "keywords",
                          value,
                        )
                      }
                    />
                  </div>
                </details>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="button-primary"
                    onClick={
                      saveAndPublish
                    }
                    disabled={busy}
                  >
                    Save and Publish Changes
                  </button>

                  <button
                    type="button"
                    className="button-secondary"
                    onClick={
                      cancelEdit
                    }
                    disabled={busy}
                  >
                    Cancel Edit
                  </button>
                </div>
              </div>
            </>
          ) : null}

          {collection ===
          "portfolio" ? (
            <>
              <p className="eyebrow">
                {editingIndex ===
                null
                  ? "New project"
                  : "Edit project"}
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {editingIndex ===
                null
                  ? "Add Portfolio Project"
                  : "Update Portfolio Project"}
              </h2>

              <div className="mt-6 grid gap-5">
                <Field
                  label="Project title"
                  value={toText(
                    form.title,
                  )}
                  onChange={
                    updateTitle
                  }
                />

                <ImagePicker
                  label="Project image"
                  fileInputKey={
                    fileInputKey
                  }
                  pendingImage={
                    pendingImage
                  }
                  currentImage={toText(
                    form.image,
                  )}
                  onChange={
                    chooseImage
                  }
                  onClear={
                    clearPendingImage
                  }
                  disabled={busy}
                />

                <Field
                  label="Category"
                  value={toText(
                    form.category,
                  )}
                  onChange={(
                    value,
                  ) =>
                    update(
                      "category",
                      value,
                    )
                  }
                  placeholder="WordPress, Next.js, SEO"
                />

                <Field
                  label="Live website URL"
                  value={toText(
                    form.url,
                  )}
                  onChange={(
                    value,
                  ) =>
                    update(
                      "url",
                      value,
                    )
                  }
                  placeholder="https://example.com"
                />

                <TextArea
                  label="Short summary"
                  value={toText(
                    form.summary,
                  )}
                  onChange={(
                    value,
                  ) =>
                    update(
                      "summary",
                      value,
                    )
                  }
                  rows={4}
                />

                <details className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                  <summary className="cursor-pointer font-bold">
                    Case Study and SEO Details
                  </summary>

                  <div className="mt-5 grid gap-5">
                    <Field
                      label="Slug"
                      value={toText(
                        form.slug,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "slug",
                          slugify(
                            value,
                          ),
                        )
                      }
                    />

                    <Field
                      label="Image alt text"
                      value={toText(
                        form.alt,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "alt",
                          value,
                        )
                      }
                    />

                    <ListField
                      label="Tags"
                      value={
                        form.tags
                      }
                      onChange={(
                        value,
                      ) =>
                        update(
                          "tags",
                          value,
                        )
                      }
                    />

                    <TextArea
                      label="Challenge"
                      value={toText(
                        form.challenge,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "challenge",
                          value,
                        )
                      }
                      rows={4}
                    />

                    <TextArea
                      label="Solution"
                      value={toText(
                        form.solution,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "solution",
                          value,
                        )
                      }
                      rows={4}
                    />

                    <TextArea
                      label="Result"
                      value={toText(
                        form.result,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "result",
                          value,
                        )
                      }
                      rows={4}
                    />

                    <Field
                      label="SEO title"
                      value={toText(
                        form.metaTitle,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "metaTitle",
                          value,
                        )
                      }
                    />

                    <CharacterCount
                      value={toText(
                        form.metaTitle,
                      )}
                      recommended="50-60 characters"
                    />

                    <TextArea
                      label="Meta description"
                      value={toText(
                        form.metaDescription,
                      )}
                      onChange={(
                        value,
                      ) =>
                        update(
                          "metaDescription",
                          value,
                        )
                      }
                      rows={3}
                    />

                    <CharacterCount
                      value={toText(
                        form.metaDescription,
                      )}
                      recommended="130-140 characters"
                    />
                  </div>
                </details>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="button-primary"
                    onClick={
                      saveAndPublish
                    }
                    disabled={busy}
                  >
                    {editingIndex ===
                    null
                      ? "Publish Project"
                      : "Save and Publish Changes"}
                  </button>

                  {editingIndex !==
                  null ? (
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={
                        cancelEdit
                      }
                      disabled={busy}
                    >
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="surface-panel">
          <p className="eyebrow">
            Current content
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {currentTitle}
          </h2>

          <div className="mt-5 max-h-[900px] space-y-3 overflow-y-auto pr-1">
            {items.length ===
            0 ? (
              <p className="text-slate-600 dark:text-slate-300">
                No items yet.
              </p>
            ) : (
              items.map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={`${toText(item.slug) || toText(item.title)}-${index}`}
                    className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                  >
                    <h3 className="font-bold">
                      {toText(
                        item.title,
                      ) ||
                        "Untitled"}
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                      {toText(
                        item.slug,
                      ) ||
                        toText(
                          item.image,
                        )}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="text-link"
                        onClick={() =>
                          editItem(
                            index,
                          )
                        }
                        disabled={busy}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="font-semibold text-red-600 dark:text-red-400"
                        onClick={() =>
                          deleteItem(
                            index,
                          )
                        }
                        disabled={busy}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ),
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardCard({
  eyebrow,
  title,
  description,
  count,
  buttonLabel,
  onClick,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count: number;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <article className="surface-panel">
      <p className="eyebrow">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>

      <p className="mt-5 text-sm font-semibold text-blue-700 dark:text-blue-300">
        {count} published
      </p>

      <button
        type="button"
        className="button-primary mt-5"
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </article>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  placeholder?: string;
  type?: string;
}) {
  const id = `cms-${label
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )}`;

  return (
    <div>
      <label
        className="form-label"
        htmlFor={id}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={
          placeholder
        }
        onChange={(
          event,
        ) =>
          onChange(
            event.target
              .value,
          )
        }
        className="form-field"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  rows?: number;
}) {
  const id = `cms-${label
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )}`;

  return (
    <div>
      <label
        className="form-label"
        htmlFor={id}
      >
        {label}
      </label>

      <textarea
        id={id}
        value={value}
        rows={rows}
        onChange={(
          event,
        ) =>
          onChange(
            event.target
              .value,
          )
        }
        className="form-field resize-y"
      />
    </div>
  );
}

function ListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (
    value: string[],
  ) => void;
}) {
  const [draft, setDraft] =
    useState("");

  const items = Array.isArray(value)
    ? value.filter(
        (item): item is string =>
          typeof item === "string" &&
          item.trim().length > 0,
      )
    : [];

  function addItems(
    values: string[],
  ) {
    const next = [...items];

    for (const raw of values) {
      const item = raw.trim();

      if (!item) {
        continue;
      }

      const exists = next.some(
        (current) =>
          current.toLowerCase() ===
          item.toLowerCase(),
      );

      if (!exists) {
        next.push(item);
      }
    }

    onChange(next);
  }

  function commitDraft() {
    if (!draft.trim()) {
      return;
    }

    addItems(
      draft.split(","),
    );

    setDraft("");
  }

  function removeItem(
    index: number,
  ) {
    onChange(
      items.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  }

  const id = `cms-${label
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )}`;

  return (
    <div>
      <label
        className="form-label"
        htmlFor={id}
      >
        {label}
      </label>

      {items.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {items.map(
            (item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {item}

                <button
                  type="button"
                  onClick={() =>
                    removeItem(index)
                  }
                  className="text-slate-500 transition hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                  aria-label={`Remove ${item}`}
                >
                  ×
                </button>
              </span>
            ),
          )}
        </div>
      ) : null}

      <input
        id={id}
        type="text"
        value={draft}
        placeholder="Type a tag, then press Enter or comma"
        onChange={(event) => {
          const text =
            event.target.value;

          if (
            text.includes(",")
          ) {
            const parts =
              text.split(",");

            const remaining =
              parts.pop() ?? "";

            addItems(parts);
            setDraft(remaining);
            return;
          }

          setDraft(text);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter"
          ) {
            event.preventDefault();
            commitDraft();
            return;
          }

          if (
            event.key ===
              "Backspace" &&
            !draft &&
            items.length > 0
          ) {
            removeItem(
              items.length - 1,
            );
          }
        }}
        onBlur={commitDraft}
        className="form-field"
      />

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Spaces are allowed inside a tag. Press Enter or comma to add another one.
      </p>
    </div>
  );
}


function CharacterCount({
  value,
  recommended,
}: {
  value: string;
  recommended: string;
}) {
  return (
    <p className="-mt-3 text-xs text-slate-500 dark:text-slate-400">
      {value.length} characters. Recommended:{" "}
      {recommended}.
    </p>
  );
}

function ImagePicker({
  label,
  fileInputKey,
  pendingImage,
  currentImage,
  onChange,
  onClear,
  disabled,
}: {
  label: string;
  fileInputKey: number;
  pendingImage: File | null;
  currentImage: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onClear: () => void;
  disabled: boolean;
}) {
  return (
    <div>
      <label
        className="form-label"
        htmlFor="cms-main-image"
      >
        {label}
      </label>

      <input
        key={fileInputKey}
        id="cms-main-image"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={onChange}
        disabled={disabled}
        className="form-field file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white"
      />

      {pendingImage ? (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected:{" "}
            {
              pendingImage.name
            }
          </p>

          <button
            type="button"
            className="text-link text-xs"
            onClick={onClear}
            disabled={disabled}
          >
            Clear selected image
          </button>
        </div>
      ) : null}

      {!pendingImage &&
      currentImage ? (
        <p className="mt-2 break-all text-xs text-slate-500 dark:text-slate-400">
          Current image:{" "}
          {currentImage}
        </p>
      ) : null}
    </div>
  );
}