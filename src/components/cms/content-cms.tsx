"use client";

import { ChangeEvent, useMemo, useState } from "react";
import blogSeed from "@/content/blog.json";
import gallerySeed from "@/content/gallery.json";
import portfolioSeed from "@/content/portfolio.json";

type Collection = "blog" | "gallery" | "portfolio";
type JsonItem = Record<string, unknown>;
type CmsData = Record<Collection, JsonItem[]>;

type Target = {
  repo: string;
  branch: string;
};

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  author: "Ahsanul Haque Chowdhury",
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
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function readJson<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(body.error || `Request failed with ${response.status}.`);
  return body;
}

export function ContentCms() {
  const [collection, setCollection] = useState<Collection>("blog");
  const [data, setData] = useState<CmsData>({
    blog: blogSeed as JsonItem[],
    gallery: gallerySeed as JsonItem[],
    portfolio: portfolioSeed as JsonItem[],
  });
  const [form, setForm] = useState<JsonItem>({ ...emptyBlog });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const [status, setStatus] = useState("Ready. Add or edit content, then publish it in one step.");
  const [busy, setBusy] = useState(false);

  const items = data[collection];
  const title = useMemo(
    () => collection === "blog" ? "Blog posts" : collection === "gallery" ? "Gallery images" : "Portfolio case studies",
    [collection],
  );

  function blankFor(type: Collection): JsonItem {
    if (type === "blog") return { ...emptyBlog };
    if (type === "gallery") return { ...emptyGallery };
    return { ...emptyPortfolio };
  }

  function switchCollection(type: Collection) {
    setCollection(type);
    setEditingIndex(null);
    setPendingImage(null);
    setForm(blankFor(type));
    setStatus(`Ready to manage ${type} content.`);
  }

  function update(key: string, value: unknown) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateTitle(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      ...(collection !== "gallery" && !current.slug ? { slug: slugify(value) } : {}),
    }));
  }

  function editItem(index: number) {
    setEditingIndex(index);
    setPendingImage(null);
    setForm({ ...items[index] });
    setStatus("Editing item. Save and publish when the changes are ready.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingIndex(null);
    setPendingImage(null);
    setForm(blankFor(collection));
  }

  function validateDraft(draft: JsonItem) {
    const imageReady = Boolean(String(draft.image ?? "").trim() || pendingImage);
    const required = collection === "gallery" ? ["title", "alt", "description"] : ["title", "slug"];
    const missing = required.filter((key) => !String(draft[key] ?? "").trim());
    if (!imageReady) missing.push("image");
    if (missing.length) throw new Error(`Please complete: ${missing.join(", ")}.`);
  }

  async function loadLatestContent() {
    setBusy(true);
    setStatus("Loading the latest content from GitHub...");
    try {
      const response = await fetch("/api/cms/content", { cache: "no-store" });
      const body = await readJson<{ data: CmsData; target: Target }>(response);
      setData(body.data);
      setTarget(body.target);
      resetForm();
      setStatus("Latest content loaded. You can edit and publish without using the terminal.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not load the latest content.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadPendingImage(file: File) {
    const payload = new FormData();
    payload.append("file", file);
    const response = await fetch("/api/cms/image", { method: "POST", body: payload });
    return readJson<{ image: string }>(response);
  }

  async function cleanupUploadedImage(image: string) {
    if (!image.startsWith("/uploads/")) return;
    await fetch("/api/cms/image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    }).catch(() => undefined);
  }

  async function publishData(nextItems: JsonItem[]) {
    const response = await fetch("/api/cms/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection, data: nextItems }),
    });
    return readJson<{ removedImages: number; cleanupWarnings: string[] }>(response);
  }

  async function saveAndPublish() {
    if (busy) return;
    const draft: JsonItem = { ...form };

    try {
      validateDraft(draft);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Please complete the required fields.");
      return;
    }

    setBusy(true);
    setStatus(pendingImage ? "Uploading the image and publishing the item..." : "Publishing the item...");
    let newlyUploadedImage = "";

    try {
      if (pendingImage) {
        const uploaded = await uploadPendingImage(pendingImage);
        newlyUploadedImage = uploaded.image;
        draft.image = uploaded.image;
      }

      const nextItems = [...items];
      if (editingIndex === null) nextItems.unshift(draft);
      else nextItems[editingIndex] = draft;

      const result = await publishData(nextItems);
      setData((current) => ({ ...current, [collection]: nextItems }));
      resetForm();
      setStatus(
        result.cleanupWarnings.length
          ? `Published successfully. ${result.cleanupWarnings.length} unused image cleanup warning(s) remain.`
          : "Published successfully. Vercel will deploy the new content automatically.",
      );
    } catch (error) {
      if (newlyUploadedImage) await cleanupUploadedImage(newlyUploadedImage);
      setStatus(error instanceof Error ? error.message : "Publishing failed.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem(index: number) {
    if (busy || !window.confirm("Delete this item and publish the change now?")) return;
    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    setBusy(true);
    setStatus("Deleting and publishing the change...");

    try {
      const result = await publishData(nextItems);
      setData((current) => ({ ...current, [collection]: nextItems }));
      if (editingIndex === index) resetForm();
      setStatus(
        result.cleanupWarnings.length
          ? `Item deleted. ${result.cleanupWarnings.length} image cleanup warning(s) remain.`
          : "Item deleted and published. Unused uploaded images were cleaned up automatically.",
      );
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not delete the item.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/cms/logout", { method: "POST" }).catch(() => undefined);
    window.location.reload();
  }

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setPendingImage(file);
    if (file) setStatus(`${file.name} selected. It will upload when you publish.`);
  }

  const actionLabel = editingIndex === null
    ? `Publish new ${collection === "gallery" ? "image" : collection === "blog" ? "blog post" : "case study"}`
    : "Save and publish changes";

  return (
    <div className="space-y-8">
      <section className="surface-panel">
        <p className="eyebrow">Secure publishing</p>
        <h2 className="mt-3 text-2xl font-bold">Publish without GitHub tokens or terminal commands</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 dark:text-slate-200">
          GitHub credentials are stored only in server environment variables. Add, edit, or delete content here and the CMS will commit the change so Vercel can deploy it automatically.
        </p>
        {target ? (
          <p className="mt-4 text-sm font-semibold text-blue-700 dark:text-blue-300">
            Target: {target.repo} / {target.branch}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="button-secondary" type="button" onClick={loadLatestContent} disabled={busy}>Refresh content</button>
          <button className="button-secondary" type="button" onClick={logout} disabled={busy}>Log out</button>
        </div>
        <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-200">
          {busy ? "Working..." : status}
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        {(["blog", "gallery", "portfolio"] as Collection[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => switchCollection(type)}
            className={`rounded-xl px-5 py-3 font-semibold capitalize transition ${collection === type ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100"}`}
          >
            {type}
          </button>
        ))}
      </div>

      <section className="grid gap-8 xl:grid-cols-[1fr_.85fr]">
        <div className="surface-panel">
          <p className="eyebrow">{editingIndex === null ? "Create" : "Edit"}</p>
          <h2 className="mt-3 text-2xl font-bold">
            {editingIndex === null
              ? `Add ${collection === "gallery" ? "image" : collection === "blog" ? "blog post" : "case study"}`
              : "Update item"}
          </h2>
          <div className="mt-6 grid gap-5">
            <Field label="Title" value={String(form.title ?? "")} onChange={updateTitle} />
            {collection !== "gallery" ? <Field label="Slug" value={String(form.slug ?? "")} onChange={(value) => update("slug", slugify(value))} /> : null}
            {collection === "blog" ? <BlogFields form={form} update={update} /> : null}
            {collection === "gallery" ? <GalleryFields form={form} update={update} /> : null}
            {collection === "portfolio" ? <PortfolioFields form={form} update={update} /> : null}
            <div>
              <label className="form-label" htmlFor="cms-image-upload">Choose a new image</label>
              <input
                id="cms-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                onChange={chooseImage}
                className="form-field file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white"
              />
              {pendingImage ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Selected: {pendingImage.name}</p> : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="button-primary" onClick={saveAndPublish} disabled={busy}>{actionLabel}</button>
              {editingIndex !== null ? <button type="button" className="button-secondary" onClick={resetForm} disabled={busy}>Cancel edit</button> : null}
            </div>
          </div>
        </div>

        <div className="surface-panel">
          <p className="eyebrow">Current content</p>
          <h2 className="mt-3 text-2xl font-bold">{title}</h2>
          <div className="mt-5 max-h-[820px] space-y-3 overflow-y-auto pr-1">
            {items.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-300">No items yet.</p>
            ) : items.map((item, index) => (
              <div key={`${String(item.slug ?? item.title)}-${index}`} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                <h3 className="font-bold">{String(item.title ?? "Untitled")}</h3>
                <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{String(item.slug ?? item.image ?? "")}</p>
                <div className="mt-3 flex gap-3">
                  <button type="button" className="text-link" onClick={() => editItem(index)} disabled={busy}>Edit</button>
                  <button type="button" className="font-semibold text-red-600 dark:text-red-400" onClick={() => deleteItem(index)} disabled={busy}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  const id = `cms-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return <div><label className="form-label" htmlFor={id}>{label}</label><input id={id} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="form-field" /></div>;
}

function TextArea({ label, value, onChange, rows = 5 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  const id = `cms-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return <div><label className="form-label" htmlFor={id}>{label}</label><textarea id={id} value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="form-field resize-y" /></div>;
}

function ListField({ label, value, onChange }: { label: string; value: unknown; onChange: (value: string[]) => void }) {
  return <Field label={label} value={Array.isArray(value) ? value.join(", ") : ""} onChange={(text) => onChange(text.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Item one, Item two" />;
}

function BlogFields({ form, update }: { form: JsonItem; update: (key: string, value: unknown) => void }) {
  return <><TextArea label="Excerpt" value={String(form.excerpt ?? "")} onChange={(value) => update("excerpt", value)} rows={3} /><Field label="Publication date" type="date" value={String(form.date ?? "")} onChange={(value) => update("date", value)} /><Field label="Author" value={String(form.author ?? "")} onChange={(value) => update("author", value)} /><Field label="Image URL" value={String(form.image ?? "")} onChange={(value) => update("image", value)} /><Field label="Image alt text" value={String(form.imageAlt ?? "")} onChange={(value) => update("imageAlt", value)} /><Field label="Image title" value={String(form.imageTitle ?? "")} onChange={(value) => update("imageTitle", value)} /><Field label="SEO title" value={String(form.metaTitle ?? "")} onChange={(value) => update("metaTitle", value)} /><TextArea label="Meta description" value={String(form.metaDescription ?? "")} onChange={(value) => update("metaDescription", value)} rows={3} /><ListField label="Tags" value={form.tags} onChange={(value) => update("tags", value)} /><TextArea label="Article content (Markdown)" value={String(form.content ?? "")} onChange={(value) => update("content", value)} rows={14} /></>;
}

function GalleryFields({ form, update }: { form: JsonItem; update: (key: string, value: unknown) => void }) {
  return <><Field label="Image URL" value={String(form.image ?? "")} onChange={(value) => update("image", value)} /><Field label="Alt text" value={String(form.alt ?? "")} onChange={(value) => update("alt", value)} /><Field label="Caption" value={String(form.caption ?? "")} onChange={(value) => update("caption", value)} /><TextArea label="Description" value={String(form.description ?? "")} onChange={(value) => update("description", value)} rows={4} /><ListField label="Keywords" value={form.keywords} onChange={(value) => update("keywords", value)} /></>;
}

function PortfolioFields({ form, update }: { form: JsonItem; update: (key: string, value: unknown) => void }) {
  return <><TextArea label="Summary" value={String(form.summary ?? "")} onChange={(value) => update("summary", value)} rows={3} /><Field label="Category" value={String(form.category ?? "")} onChange={(value) => update("category", value)} /><Field label="Project URL" value={String(form.url ?? "")} onChange={(value) => update("url", value)} /><Field label="Image URL" value={String(form.image ?? "")} onChange={(value) => update("image", value)} /><Field label="Image alt text" value={String(form.alt ?? "")} onChange={(value) => update("alt", value)} /><ListField label="Tags" value={form.tags} onChange={(value) => update("tags", value)} /><TextArea label="Challenge" value={String(form.challenge ?? "")} onChange={(value) => update("challenge", value)} rows={4} /><TextArea label="Solution" value={String(form.solution ?? "")} onChange={(value) => update("solution", value)} rows={4} /><TextArea label="Result" value={String(form.result ?? "")} onChange={(value) => update("result", value)} rows={4} /><Field label="SEO title" value={String(form.metaTitle ?? "")} onChange={(value) => update("metaTitle", value)} /><TextArea label="Meta description" value={String(form.metaDescription ?? "")} onChange={(value) => update("metaDescription", value)} rows={3} /></>;
}
