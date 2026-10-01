import type { Metadata } from "next";
import { AdminLogin } from "@/components/cms/admin-login";
import { ContentCms } from "@/components/cms/content-cms";
import { isCmsAuthConfigured, isCmsAuthenticated } from "@/lib/cms-auth";

export const metadata: Metadata = {
  title: "Portfolio Content CMS",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authenticated = await isCmsAuthenticated();
  const configured = isCmsAuthConfigured();

  return (
    <main className="page-container pb-20 pt-32">
      <p className="eyebrow">Private publishing workspace</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">Ahsanul Haque Chowdhury Content CMS</h1>
      <p className="mt-4 max-w-3xl text-slate-700 dark:text-slate-200">
        Add, edit, and delete blog posts, gallery images, image SEO metadata, and portfolio case studies. Publishing updates GitHub securely from the server so Vercel can deploy the live website automatically.
      </p>
      <div className="mt-10">
        {authenticated ? <ContentCms /> : <AdminLogin configured={configured} />}
      </div>
    </main>
  );
}
