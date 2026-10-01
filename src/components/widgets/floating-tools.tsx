"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { FaPaperPlane, FaWhatsapp, FaXmark } from "react-icons/fa6";
import { siteConfig } from "@/data/portfolio";

type Message = { role: "assistant" | "user"; text: string };

const answers = [
  {
    terms: ["who", "about", "ahsan", "yourself"],
    text: "Ahsanul Haque Chowdhury is a software engineering graduate based in Dhaka. He works across frontend development, custom WordPress and ACF development, SEO, ORM, website performance, and AI-assisted content strategy.",
  },
  {
    terms: ["skill", "technology", "tech", "stack", "react", "next", "wordpress"],
    text: "Ahsan works with HTML, CSS, JavaScript, Tailwind CSS, React, Next.js, WordPress, ACF, technical SEO, Core Web Vitals, and online reputation management.",
  },
  {
    terms: ["experience", "job", "work", "company", "aan-nahl", "role"],
    text: "Ahsan works at Aan-Nahl Software. His experience includes website management, SEO, ORM, and custom website development. His current role is Senior Executive Software Development.",
  },
  {
    terms: ["education", "university", "degree", "study"],
    text: "Ahsan completed a B.Sc. in Software Engineering from Daffodil International University, studying from 2020 to 2023.",
  },
  {
    terms: ["service", "hire", "project", "build", "website"],
    text: "Ahsan can help with custom WordPress websites, frontend development, SEO and ORM, website performance optimization, CMS workflows, and AI-assisted content strategy.",
  },
  {
    terms: ["contact", "email", "phone", "whatsapp", "reach"],
    text: `You can reach Ahsan at ${siteConfig.email} or ${siteConfig.phoneDisplay}. The WhatsApp button beside this chat opens a direct conversation.`,
  },
  {
    terms: ["location", "where", "based", "dhaka", "bangladesh"],
    text: "Ahsan is based in Uttara, Dhaka, Bangladesh.",
  },
  {
    terms: ["portfolio", "case study", "project", "work sample"],
    text: "You can review Ahsan's website projects and case studies on the Portfolio page. New case studies can also be published through the built-in CMS.",
  },
  {
    terms: ["blog", "article", "post"],
    text: "The Blog page contains Ahsan's articles on development, WordPress, SEO, ORM, and website performance. New posts can be published from the CMS.",
  },
];

function getAnswer(question: string) {
  const q = question.toLowerCase();
  let best = { score: 0, text: "" };
  for (const item of answers) {
    const score = item.terms.reduce((total, term) => total + (q.includes(term) ? 1 : 0), 0);
    if (score > best.score) best = { score, text: item.text };
  }
  return best.score > 0
    ? best.text
    : "I can answer questions about Ahsan's skills, experience, education, services, portfolio, blog, location, and contact details. Try asking, ‘What technologies does Ahsan use?’";
}

export function FloatingTools() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi, I’m Ahsan’s portfolio assistant. Ask me anything about his work, skills, experience, or services." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const whatsappUrl = useMemo(() => `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", text: getAnswer(question) }]);
    setInput("");
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section className="pointer-events-auto w-[min(92vw,380px)] overflow-hidden rounded-3xl border border-blue-400/30 bg-[#0d1728]/95 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
          <header className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
            <div>
              <p className="font-heading text-base font-bold text-white">Ask about Ahsan</p>
              <p className="mt-0.5 text-xs text-slate-300">Portfolio assistant</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-slate-200 transition hover:bg-slate-800" aria-label="Close portfolio assistant">
              <FaXmark />
            </button>
          </header>
          <div className="max-h-[380px] space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-blue-600 text-white" : "bg-slate-800 text-slate-100"}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-slate-700 p-3">
            <label className="sr-only" htmlFor="portfolio-chat-input">Ask a question</label>
            <input ref={inputRef} id="portfolio-chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about skills, work, SEO..." className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-950 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400" />
            <button type="submit" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500" aria-label="Send question">
              <FaPaperPlane />
            </button>
          </form>
        </section>
      ) : null}

      <div className="pointer-events-auto flex items-center gap-3">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Ahsan on WhatsApp" className="floating-action whatsapp-action">
          <FaWhatsapp aria-hidden="true" />
        </a>
        <button type="button" onClick={() => { setOpen((value) => !value); window.setTimeout(() => inputRef.current?.focus(), 120); }} aria-label="Open portfolio assistant" className="floating-action chat-action">
          <span className="absolute inset-0 rounded-full bg-blue-500/30 motion-safe:animate-ping" aria-hidden="true" />
          <span className="agentic-robot-mark relative" aria-hidden="true"><FaRobot /></span>
        </button>
      </div>
    </div>
  );
}
