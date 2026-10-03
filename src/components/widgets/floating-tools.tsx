"use client";

import Link from "next/link";
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

type DailyUsage = {
  date: string;
  count: number;
};

const greeting: Message = {
  role: "assistant",
  text: "Hi, I’m Ahsan’s portfolio assistant. Ask me anything about his work, skills, experience, projects, or services.",
};

const suggestedQuestions = [
  "What services does Ahsan provide?",
  "Ahsan er main skills ki ki?",
  "Show me Ahsan's WordPress experience.",
  "How can I contact Ahsan?",
];

const chatStorageKey =
  "ahsan-portfolio-chat-v1";

const usageStorageKey =
  "ahsan-portfolio-chat-usage-v1";

const browserDailyLimit = 30;

function todayKey() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(
      now.getMonth() + 1,
    ).padStart(2, "0"),
    String(
      now.getDate(),
    ).padStart(2, "0"),
  ].join("-");
}

function readDailyUsage(): DailyUsage {
  try {
    const raw =
      window.localStorage.getItem(
        usageStorageKey,
      );

    if (!raw) {
      return {
        date: todayKey(),
        count: 0,
      };
    }

    const parsed =
      JSON.parse(
        raw,
      ) as Partial<DailyUsage>;

    if (
      parsed.date !==
        todayKey() ||
      typeof parsed.count !==
        "number"
    ) {
      return {
        date: todayKey(),
        count: 0,
      };
    }

    return {
      date: parsed.date,
      count: Math.max(
        0,
        parsed.count,
      ),
    };
  } catch {
    return {
      date: todayKey(),
      count: 0,
    };
  }
}

function incrementDailyUsage() {
  const current =
    readDailyUsage();

  const next: DailyUsage = {
    date: todayKey(),
    count: current.count + 1,
  };

  window.localStorage.setItem(
    usageStorageKey,
    JSON.stringify(next),
  );

  return next;
}

function validStoredMessages(
  value: unknown,
): Message[] | null {
  if (
    !Array.isArray(value) ||
    value.length < 1
  ) {
    return null;
  }

  const messages: Message[] =
    [];

  for (const item of value) {
    if (
      !item ||
      typeof item !==
        "object" ||
      Array.isArray(item)
    ) {
      return null;
    }

    const raw =
      item as Record<
        string,
        unknown
      >;

    if (
      raw.role !== "user" &&
      raw.role !==
        "assistant"
    ) {
      return null;
    }

    if (
      typeof raw.text !==
      "string"
    ) {
      return null;
    }

    const text =
      raw.text.trim();

    if (
      !text ||
      text.length > 2000
    ) {
      return null;
    }

    messages.push({
      role: raw.role,
      text,
    });
  }

  return messages.slice(-20);
}

export function FloatingTools() {
  const [open, setOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [pending, setPending] =
    useState(false);

  const [hydrated, setHydrated] =
    useState(false);

  const [
    remainingToday,
    setRemainingToday,
  ] = useState(
    browserDailyLimit,
  );

  const [messages, setMessages] =
    useState<Message[]>([
      greeting,
    ]);

  const inputRef =
    useRef<HTMLInputElement>(
      null,
    );

  const messagesEndRef =
    useRef<HTMLDivElement>(
      null,
    );

  const whatsappUrl =
    useMemo(
      () =>
        `https://wa.me/${siteConfig.phone.replace(
          /\D/g,
          "",
        )}`,
      [],
    );

  useEffect(() => {
    try {
      const raw =
        window.localStorage.getItem(
          chatStorageKey,
        );

      if (raw) {
        const parsed =
          JSON.parse(raw);

        const stored =
          validStoredMessages(
            parsed,
          );

        if (stored) {
          setMessages(stored);
        }
      }

      const usage =
        readDailyUsage();

      setRemainingToday(
        Math.max(
          0,
          browserDailyLimit -
            usage.count,
        ),
      );
    } catch {
      setMessages([
        greeting,
      ]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      chatStorageKey,
      JSON.stringify(
        messages.slice(-20),
      ),
    );
  }, [
    messages,
    hydrated,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "nearest",
      },
    );
  }, [
    messages,
    pending,
    open,
  ]);

  function clearChat() {
    setMessages([greeting]);
    setInput("");

    window.localStorage.removeItem(
      chatStorageKey,
    );

    window.setTimeout(
      () => {
        inputRef.current?.focus();
      },
      100,
    );
  }

  async function sendQuestion(
    rawQuestion: string,
  ) {
    if (pending) {
      return;
    }

    const question =
      rawQuestion.trim();

    if (!question) {
      return;
    }

    const usage =
      readDailyUsage();

    if (
      usage.count >=
      browserDailyLimit
    ) {
      setRemainingToday(0);

      setMessages(
        (current) => [
          ...current,
          {
            role: "assistant",
            text: `The browser's daily chat limit has been reached. You can contact Ahsan directly at ${siteConfig.email}.`,
          },
        ],
      );

      return;
    }

    const nextMessages: Message[] =
      [
        ...messages,
        {
          role: "user",
          text: question,
        },
      ];

    setMessages(
      nextMessages,
    );

    setInput("");
    setPending(true);

    const updatedUsage =
      incrementDailyUsage();

    setRemainingToday(
      Math.max(
        0,
        browserDailyLimit -
          updatedUsage.count,
      ),
    );

    const apiMessages =
      nextMessages
        .filter(
          (
            message,
            index,
          ) =>
            !(
              index === 0 &&
              message.role ===
                "assistant"
            ),
        )
        .slice(-8);

    try {
      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              {
                messages:
                  apiMessages,
              },
            ),
            signal:
              AbortSignal.timeout(
                30_000,
              ),
          },
        );

      const data =
        (await response.json()) as ChatResponse;

      if (
        !response.ok ||
        data.ok !== true ||
        typeof data.answer !==
          "string"
      ) {
        throw new Error(
          typeof data.message ===
            "string"
            ? data.message
            : "The assistant could not answer right now.",
        );
      }

      setMessages(
        (current) => [
          ...current,
          {
            role:
              "assistant",
            text: data.answer!,
          },
        ],
      );
    } catch (error) {
      setMessages(
        (current) => [
          ...current,
          {
            role:
              "assistant",
            text:
              error instanceof
                  Error &&
                error.name !==
                  "TimeoutError"
                ? error.message
                : `I could not answer right now. You can contact Ahsan directly at ${siteConfig.email}.`,
          },
        ],
      );
    } finally {
      setPending(false);

      window.setTimeout(
        () => {
          inputRef.current?.focus();
        },
        100,
      );
    }
  }

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    await sendQuestion(input);
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

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={
                  clearChat
                }
                className="rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                aria-label="Clear chat"
              >
                Clear
              </button>

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
            </div>
          </header>

          <div
            className="max-h-[380px] space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {messages.map(
              (
                message,
                index,
              ) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role ===
                    "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {message.text}
                </div>
              ),
            )}

            {messages.length ===
              1 &&
            !pending ? (
              <div className="grid gap-2">
                {suggestedQuestions.map(
                  (
                    question,
                  ) => (
                    <button
                      key={
                        question
                      }
                      type="button"
                      onClick={() =>
                        sendQuestion(
                          question,
                        )
                      }
                      className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-left text-xs leading-relaxed text-slate-300 transition hover:border-blue-500 hover:text-white"
                    >
                      {
                        question
                      }
                    </button>
                  ),
                )}
              </div>
            ) : null}

            {pending ? (
              <div className="max-w-[88%] rounded-2xl bg-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-100">
                <span>
                  Thinking
                </span>
                <span
                  className="ml-1 inline-block motion-safe:animate-pulse"
                  aria-hidden="true"
                >
                  ...
                </span>
              </div>
            ) : null}

            <div
              ref={
                messagesEndRef
              }
            />
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
              onChange={(
                event,
              ) =>
                setInput(
                  event.target
                    .value,
                )
              }
              maxLength={500}
              disabled={
                pending ||
                remainingToday <=
                  0
              }
              placeholder="Ask about skills, work, SEO..."
              className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-950 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400 disabled:cursor-wait disabled:opacity-70"
            />

            <button
              type="submit"
              disabled={
                pending ||
                !input.trim() ||
                remainingToday <=
                  0
              }
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Send question"
            >
              <FaPaperPlane />
            </button>
          </form>

          <div className="flex items-center justify-between gap-3 border-t border-slate-700/70 px-4 py-2.5 text-[11px] text-slate-400">
            <span>
              {remainingToday}{" "}
              questions remaining
              today
            </span>

            <Link
              href="/contact"
              onClick={() =>
                setOpen(false)
              }
              className="font-semibold text-blue-300 transition hover:text-blue-200"
            >
              Contact Ahsan
            </Link>
          </div>
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
            setOpen(
              (value) =>
                !value,
            );

            window.setTimeout(
              () => {
                inputRef.current?.focus();
              },
              120,
            );
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