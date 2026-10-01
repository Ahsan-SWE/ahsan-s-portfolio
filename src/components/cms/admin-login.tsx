"use client";

import { FormEvent, useState } from "react";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(
    configured
      ? "Enter the admin password to open the publishing workspace."
      : "Set ADMIN_PASSWORD and CMS_SESSION_SECRET before using the CMS.",
  );
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || !password) return;
    setBusy(true);
    setStatus("Signing in...");

    try {
      const response = await fetch("/api/cms/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Could not sign in.");
      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="surface-panel mx-auto max-w-xl">
      <p className="eyebrow">Secure admin</p>
      <h2 className="mt-3 text-2xl font-bold">Sign in to the content CMS</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
        Blog, gallery, and portfolio publishing is protected by a server-side admin session. GitHub credentials are never entered in the browser.
      </p>
      <form className="mt-6 space-y-5" onSubmit={submit}>
        <div>
          <label className="form-label" htmlFor="cms-admin-password">Admin password</label>
          <input
            id="cms-admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-field"
            autoComplete="current-password"
            disabled={!configured || busy}
          />
        </div>
        <button type="submit" className="button-primary" disabled={!configured || busy || !password}>
          {busy ? "Signing in..." : "Open CMS"}
        </button>
      </form>
      <p className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        {status}
      </p>
    </section>
  );
}
