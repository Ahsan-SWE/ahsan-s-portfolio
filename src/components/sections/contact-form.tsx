"use client";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { siteConfig, services } from "@/data/portfolio";
import { validateContact } from "@/lib/contact-validation";
const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    min: 2,
    max: 100,
    placeholder: "Your full name",
    autocomplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    min: 5,
    max: 254,
    placeholder: "you@example.com",
    autocomplete: "email",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    min: 3,
    max: 160,
    placeholder: "A short description of your project",
    autocomplete: "off",
  },
];
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      "service",
    );
    const select = formRef.current?.elements.namedItem(
      "service",
    ) as HTMLSelectElement | null;
    if (requested && select) {
      const match = services.find((service) =>
        requested.startsWith(service.title.split(" &")[0]),
      );
      if (match) select.value = match.title;
      else if (requested.includes("WordPress"))
        select.value = "WordPress & CMS";
    }
  }, []);
  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const result = validateContact({ ...data, consent: data.consent === "on" });
    if ("error" in result) {
      setStatus({ ok: false, message: result.error });
      return;
    }
    busy.current = true;
    setPending(true);
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(30_000),
      });
      const responseData = await response.json();
      if (!response.ok || responseData.ok !== true)
        throw new Error(
          typeof responseData.message === "string"
            ? responseData.message
            : "Your message could not be sent. Please try again.",
        );
      setStatus({ ok: true, message: responseData.message });
      form.reset();
    } catch (error) {
      setStatus({
        ok: false,
        message:
          error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
            ? error.message
            : `I could not confirm delivery. Please email ${siteConfig.email} directly. Your message is still in the form.`,
      });
    } finally {
      busy.current = false;
      setPending(false);
    }
  };
  return (
    <form
      ref={formRef}
      className={compact ? "space-y-4" : "space-y-5"}
      onSubmit={submit}
      aria-busy={pending}
    >
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2"}>
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.name === "subject" ? "sm:col-span-2" : ""}
          >
            <label htmlFor={`contact-${field.name}`} className="form-label">
              {field.label} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              required
              minLength={field.min}
              maxLength={field.max}
              autoComplete={field.autocomplete}
              className={`form-field ${compact ? "!py-3" : ""}`}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="contact-service" className="form-label">
          Service (optional)
        </label>
        <select
          id="contact-service"
          name="service"
          className={`form-field ${compact ? "!py-3" : ""}`}
          defaultValue=""
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Other">Other / Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="form-label">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={compact ? 4 : 6}
          required
          minLength={20}
          maxLength={5000}
          className={`form-field resize-y ${compact ? "!py-3" : ""}`}
          placeholder="Tell me about your goals, current website, and what you need help with."
          aria-describedby="message-help"
        />
        <p
          id="message-help"
          className={`text-sm text-slate-600 dark:text-slate-400 ${compact ? "mt-1.5" : "mt-2"}`}
        >
          20 to 5,000 characters. Please do not include passwords or sensitive
          information.
        </p>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-5 w-5 shrink-0 accent-blue-600"
        />
        <label
          htmlFor="contact-consent"
          className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          I agree that my details may be used to respond to this inquiry.{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy notice
          </Link>
          .
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className={`button-primary w-full disabled:cursor-wait disabled:opacity-70 ${compact ? "!min-h-11 !py-2.5" : ""}`}
      >
        {pending ? "Sending message..." : "Send Message"}
      </button>
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={
          status
            ? `rounded-xl p-4 text-sm leading-relaxed ${status.ok ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200" : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"}`
            : "sr-only"
        }
      >
        {status?.message}
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Prefer email?{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="break-all underline underline-offset-4"
        >
          {siteConfig.email}
        </a>
      </p>
      <noscript>
        <p>
          JavaScript is required for the form. Please use the email link above
          to get in touch.
        </p>
      </noscript>
    </form>
  );
}
