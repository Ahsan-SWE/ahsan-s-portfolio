import type { Metadata } from "next";
import { ContentCms } from "@/components/cms/content-cms";

export const metadata: Metadata = {
  title: "Portfolio Content CMS",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="page-container pb-20 pt-32">
      <p className="eyebrow">Private publishing workspace</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">Ahsanul Haque Chowdhury Content CMS</h1>
      <p className="mt-4 max-w-3xl text-slate-700 dark:text-slate-200">Add and edit blog posts, gallery images, image SEO metadata, and portfolio case studies. Publishing commits the selected collection to GitHub so Vercel can rebuild the live website.</p>
      <div className="mt-10"><ContentCms /></div>
    </main>
  );
}
