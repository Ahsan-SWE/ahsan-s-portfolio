"use client";

import { ChangeEvent, useMemo, useState } from "react";
import blogSeed from "@/content/blog.json";
import gallerySeed from "@/content/gallery.json";
import portfolioSeed from "@/content/portfolio.json";

type Collection = "blog" | "gallery" | "portfolio";
type JsonItem = Record<string, unknown>;

type Config = {
  repo: string;
  branch: string;
  token: string;
};

const paths: Record<Collection, string> = {
  blog: "src/content/blog.json",
  gallery: "src/content/gallery.json",
  portfolio: "src/content/portfolio.json",
};

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  author: "Ahsanul Haque Chowdhury",
  image: "/images/profile-image.webp",
  imageAlt: "",
  imageTitle: "",
  metaTitle: "",
  metaDescription: "",
  tags: [] as string[],
  content: "",
};

const emptyGallery = {
  title: "",
  image: "https://ahsanulhaquechowdhury.vercel.app/images/profile-image.svg",
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
  image: "https://ahsanulhaquechowdhury.vercel.app/images/profile-image.svg",
  alt: "",
  tags: [] as string[],
  challenge: "",
  solution: "",
  result: "",
  metaTitle: "",
  metaDescription: "",
};

function encodeBase64(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value: string) {
  return decodeURIComponent(escape(atob(value.replace(/\n/g, ""))));
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ContentCms() {
  const [collection, setCollection] = useState<Collection>("blog");
  const [data, setData] = useState<Record<Collection, JsonItem[]>>({
    blog: blogSeed as JsonItem[],
    gallery: gallerySeed as JsonItem[],
    portfolio: portfolioSeed as JsonItem[],
  });
  const [config, setConfig] = useState<Config>({ repo: "Ahsan-SWE/ahsan-s-portfolio", branch: "main", token: "" });
  const [form, setForm] = useState<JsonItem>({ ...emptyBlog });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [status, setStatus] = useState("Connect GitHub to publish changes.");
  const [busy, setBusy] = useState(false);

  const items = data[collection];
  const configReady = config.repo.includes("/") && config.branch && config.token;
  const title = useMemo(() => collection === "blog" ? "Blog posts" : collection === "gallery" ? "Gallery images" : "Portfolio case studies", [collection]);

  function blankFor(type: Collection): JsonItem {
    if (type === "blog") return { ...emptyBlog };
    if (type === "gallery") return { ...emptyGallery };
    return { ...emptyPortfolio };
  }

  function switchCollection(type: Collection) {
    setCollection(type);
    setEditingIndex(null);
    setForm(blankFor(type));
    setStatus("Ready to edit local content. Connect GitHub to publish.");
  }

  function update(key: string, value: unknown) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateTitle(value: string) {
    setForm((current) => ({ ...current, title: value, ...(collection !== "gallery" && !current.slug ? { slug: slugify(value) } : {}) }));
  }

  function editItem(index: number) {
    setEditingIndex(index);
    setForm({ ...items[index] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingIndex(null);
    setForm(blankFor(collection));
  }

  function applyForm() {
    const required = collection === "gallery" ? ["title", "image", "alt", "description"] : ["title", "slug", "image"];
    if (required.some((key) => !String(form[key] ?? "").trim())) {
      setStatus(`Please complete: ${required.join(", ")}.`);
      return;
    }
    setData((current) => {
      const next = [...current[collection]];
      if (editingIndex === null) next.unshift({ ...form });
      else next[editingIndex] = { ...form };
      return { ...current, [collection]: next };
    });
    setStatus(editingIndex === null ? "Item added locally. Click Publish to GitHub to make it live." : "Item updated locally. Click Publish to GitHub to make it live.");
    resetForm();
  }

  function deleteItem(index: number) {
    if (!window.confirm("Delete this item from the local CMS list?")) return;
    setData((current) => ({ ...current, [collection]: current[collection].filter((_, itemIndex) => itemIndex !== index) }));
    if (editingIndex === index) resetForm();
    setStatus("Item removed locally. Click Publish to GitHub to apply the deletion.");
  }

  async function githubRequest(path: string, options?: RequestInit) {
    const response = await fetch(`https://api.github.com/repos/${config.repo}/contents/${path}`, {
      ...options,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(options?.headers || {}),
      },
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || `GitHub request failed with ${response.status}`);
    }
    return response.json();
  }

  async function loadFromGitHub() {
    if (!configReady) return setStatus("Enter repository, branch, and a fine-grained GitHub token first.");
    setBusy(true);
    try {
      const loaded: Record<Collection, JsonItem[]> = { blog: [], gallery: [], portfolio: [] };
      for (const type of ["blog", "gallery", "portfolio"] as Collection[]) {
        const file = await githubRequest(`${paths[type]}?ref=${encodeURIComponent(config.branch)}`);
        loaded[type] = JSON.parse(decodeBase64(file.content));
      }
      setData(loaded);
      setStatus("Latest content loaded from GitHub.");
      resetForm();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not load content from GitHub.");
    } finally {
      setBusy(false);
    }
  }

  async function publishCollection() {
    if (!configReady) return setStatus("Enter repository, branch, and a fine-grained GitHub token first.");
    setBusy(true);
    try {
      const path = paths[collection];
      const current = await githubRequest(`${path}?ref=${encodeURIComponent(config.branch)}`);
      await githubRequest(path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Update ${collection} content from portfolio CMS`,
          content: encodeBase64(`${JSON.stringify(data[collection], null, 2)}\n`),
          sha: current.sha,
          branch: config.branch,
        }),
      });
      setStatus("Published to GitHub. Vercel will rebuild the site from the new commit.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Publishing failed.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!configReady) {
      setStatus("Connect GitHub before uploading an image.");
      event.target.value = "";
      return;
    }
    setBusy(true);
    try {
      const safeName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-")}`;
      const path = `public/uploads/${safeName}`;
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
      await githubRequest(path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Upload ${safeName} from portfolio CMS`, content: btoa(binary), branch: config.branch }),
      });
      update("image", `/uploads/${safeName}`);
      setStatus("Image uploaded. Complete the image title, alt text, caption, and description, then save the item.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-8">
      <section className="surface-panel">
        <p className="eyebrow">GitHub connection</p>
        <h2 className="mt-3 text-2xl font-bold">Publish content without editing code</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 dark:text-slate-200">Use a fine-grained GitHub personal access token with Contents read/write permission for this repository only. The token is kept in this browser state and is never written into the project.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-[1.3fr_.7fr_1fr]">
          <Field label="Repository" value={config.repo} onChange={(value) => setConfig({ ...config, repo: value })} placeholder="owner/repository" />
          <Field label="Branch" value={config.branch} onChange={(value) => setConfig({ ...config, branch: value })} placeholder="main" />
          <Field label="GitHub token" type="password" value={config.token} onChange={(value) => setConfig({ ...config, token: value })} placeholder="github_pat_..." />
        </div>
        <div className="mt-5 flex flex-wrap gap-3"><button className="button-secondary" type="button" onClick={loadFromGitHub} disabled={busy}>Load latest content</button><button className="button-primary" type="button" onClick={publishCollection} disabled={busy}>Publish {title}</button></div>
        <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-200">{busy ? "Working..." : status}</p>
      </section>

      <div className="flex flex-wrap gap-2">{(["blog", "gallery", "portfolio"] as Collection[]).map((type) => <button key={type} type="button" onClick={() => switchCollection(type)} className={`rounded-xl px-5 py-3 font-semibold capitalize transition ${collection === type ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100"}`}>{type}</button>)}</div>

      <section className="grid gap-8 xl:grid-cols-[1fr_.85fr]">
        <div className="surface-panel">
          <p className="eyebrow">{editingIndex === null ? "Create" : "Edit"}</p>
          <h2 className="mt-3 text-2xl font-bold">{editingIndex === null ? `Add ${collection === "gallery" ? "image" : collection === "blog" ? "blog post" : "case study"}` : "Update item"}</h2>
          <div className="mt-6 grid gap-5">
            <Field label="Title" value={String(form.title ?? "")} onChange={updateTitle} />
            {collection !== "gallery" ? <Field label="Slug" value={String(form.slug ?? "")} onChange={(value) => update("slug", slugify(value))} /> : null}
            {collection === "blog" ? <BlogFields form={form} update={update} /> : null}
            {collection === "gallery" ? <GalleryFields form={form} update={update} /> : null}
            {collection === "portfolio" ? <PortfolioFields form={form} update={update} /> : null}
            <div><label className="form-label" htmlFor="cms-image-upload">Upload image to GitHub</label><input id="cms-image-upload" type="file" accept="image/*" onChange={uploadImage} className="form-field file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white" /></div>
            <div className="flex flex-wrap gap-3"><button type="button" className="button-primary" onClick={applyForm}>{editingIndex === null ? "Add to collection" : "Save changes"}</button>{editingIndex !== null ? <button type="button" className="button-secondary" onClick={resetForm}>Cancel edit</button> : null}</div>
          </div>
        </div>

        <div className="surface-panel">
          <p className="eyebrow">Current content</p><h2 className="mt-3 text-2xl font-bold">{title}</h2>
          <div className="mt-5 max-h-[820px] space-y-3 overflow-y-auto pr-1">
            {items.length === 0 ? <p className="text-slate-600 dark:text-slate-300">No items yet.</p> : items.map((item, index) => <div key={`${String(item.slug ?? item.title)}-${index}`} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><h3 className="font-bold">{String(item.title ?? "Untitled")}</h3><p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{String(item.slug ?? item.image ?? "")}</p><div className="mt-3 flex gap-3"><button type="button" className="text-link" onClick={() => editItem(index)}>Edit</button><button type="button" className="font-semibold text-red-600 dark:text-red-400" onClick={() => deleteItem(index)}>Delete</button></div></div>)}
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
