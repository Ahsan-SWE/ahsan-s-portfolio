"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaRobot } from "react-icons/fa";
import {
  FaPaperPlane,
  FaWhatsapp,
  FaXmark,
} from "react-icons/fa6";

import { siteConfig } from "@/data/portfolio";

type Message = {
  role: "assistant" | "user";
  text: string;
};

type ChatResponse = {
  ok: boolean;
  answer?: string;
  message?: string;
};

export function FloatingTools() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        text: "Hi, I’m Ahsan’s portfolio assistant. Ask me anything about his work, skills, experience, or services.",
      },
    ]);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const whatsappUrl = useMemo(
    () =>
      `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`,
    [],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, pending, open]);

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (pending) {
      return;
    }

    const question = input.trim();

    if (!question) {
      return;
    }

    const nextMessages: Message[] = [
      ...messages,
      {
        role: "user",
        text: question,
      },
    ];

    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            messages:
              nextMessages.slice(-10),
          }),
          signal:
            AbortSignal.timeout(30_000),
        },
      );

      const data =
        (await response.json()) as ChatResponse;

      if (
        !response.ok ||
        data.ok !== true ||
        typeof data.answer !== "string"
      ) {
        throw new Error(
          typeof data.message === "string"
            ? data.message
            : "The assistant could not answer right now.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: data.answer!,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            error instanceof Error &&
            error.name !== "TimeoutError"
              ? error.message
              : `I could not answer right now. You can contact Ahsan directly at ${siteConfig.email}.`,
        },
      ]);
    } finally {
      setPending(false);

      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section className="pointer-events-auto w-[min(92vw,380px)] overflow-hidden rounded-3xl border border-blue-400/30 bg-[#0d1728]/95 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
          <header className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
            <div>
              <p className="font-heading text-base font-bold text-white">
                Ask about Ahsan
              </p>

              <p className="mt-0.5 text-xs text-slate-300">
                Portfolio assistant
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="grid h-9 w-9 place-items-center rounded-full text-slate-200 transition hover:bg-slate-800"
              aria-label="Close portfolio assistant"
            >
              <FaXmark />
            </button>
          </header>

          <div
            className="max-h-[380px] space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {messages.map(
              (message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {message.text}
                </div>
              ),
            )}

            {pending ? (
              <div className="max-w-[88%] rounded-2xl bg-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-100">
                Thinking...
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={submit}
            className="flex gap-2 border-t border-slate-700 p-3"
          >
            <label
              className="sr-only"
              htmlFor="portfolio-chat-input"
            >
              Ask a question
            </label>

            <input
              ref={inputRef}
              id="portfolio-chat-input"
              value={input}
              onChange={(event) =>
                setInput(
                  event.target.value,
                )
              }
              maxLength={500}
              disabled={pending}
              placeholder="Ask about skills, work, SEO..."
              className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-950 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400 disabled:cursor-wait disabled:opacity-70"
            />

            <button
              type="submit"
              disabled={pending}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-70"
              aria-label="Send question"
            >
              <FaPaperPlane />
            </button>
          </form>
        </section>
      ) : null}

      <div className="pointer-events-auto flex items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Ahsan on WhatsApp"
          className="floating-action whatsapp-action"
        >
          <FaWhatsapp aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => {
            setOpen((value) => !value);

            window.setTimeout(() => {
              inputRef.current?.focus();
            }, 120);
          }}
          aria-label="Open portfolio assistant"
          className="floating-action chat-action"
        >
          <span
            className="absolute inset-0 rounded-full bg-blue-500/30 motion-safe:animate-ping"
            aria-hidden="true"
          />

          <span
            className="agentic-robot-mark relative"
            aria-hidden="true"
          >
            <FaRobot />
          </span>
        </button>
      </div>
    </div>
  );
}