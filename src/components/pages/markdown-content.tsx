/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ReactNode } from "react";

type MarkdownBlock =
  | {
      type: "h2";
      text: string;
    }
  | {
      type: "h3";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "ul";
      items: string[];
    }
  | {
      type: "ol";
      items: string[];
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
    };

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];

  const regex =
    /(\[([^\]]+)\]\(((?:https?:\/\/|\/|#|mailto:|tel:)[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*|_([^_\n]+)_|`([^`]+)`)/g;

  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index));
    }

    const full = match[0];
    const linkLabel = match[2];
    const href = match[3];
    const bold = match[4];
    const italicStar = match[5];
    const italicUnderscore = match[6];
    const code = match[7];

    if (linkLabel && href) {
      if (href.startsWith("/")) {
        parts.push(
          <Link
            key={`link-${key++}`}
            href={href}
            className="text-link"
          >
            {linkLabel}
          </Link>,
        );
      } else if (
        href.startsWith("http://") ||
        href.startsWith("https://")
      ) {
        parts.push(
          <a
            key={`link-${key++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {linkLabel}
          </a>,
        );
      } else {
        parts.push(
          <a
            key={`link-${key++}`}
            href={href}
            className="text-link"
          >
            {linkLabel}
          </a>,
        );
      }
    } else if (bold) {
      parts.push(
        <strong key={`strong-${key++}`}>
          {bold}
        </strong>,
      );
    } else if (italicStar || italicUnderscore) {
      parts.push(
        <em key={`em-${key++}`}>
          {italicStar || italicUnderscore}
        </em>,
      );
    } else if (code) {
      parts.push(
        <code
          key={`code-${key++}`}
          className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.92em] dark:bg-slate-800"
        >
          {code}
        </code>,
      );
    } else {
      parts.push(full);
    }

    cursor = regex.lastIndex;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
}

function imageFromLine(line: string) {
  const match = line
    .trim()
    .match(
      /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/,
    );

  if (!match) {
    return null;
  }

  return {
    alt: match[1].trim(),
    src: match[2].trim(),
    caption: match[3]?.trim() || "",
  };
}

function isBlockStart(line: string) {
  const trimmed = line.trim();

  return (
    /^#{1,3}\s+/.test(trimmed) ||
    /^[-*]\s+/.test(trimmed) ||
    /^\d+\.\s+/.test(trimmed) ||
    /^>\s?/.test(trimmed) ||
    Boolean(imageFromLine(trimmed))
  );
}

function parseMarkdown(
  content: string,
): MarkdownBlock[] {
  const lines = content
    .replace(/\r\n/g, "\n")
    .split("\n");

  const blocks: MarkdownBlock[] = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const image = imageFromLine(trimmed);

    if (image) {
      blocks.push({
        type: "image",
        ...image,
      });

      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({
        type: "h3",
        text: trimmed.slice(4),
      });

      index += 1;
      continue;
    }

    if (
      trimmed.startsWith("## ") ||
      trimmed.startsWith("# ")
    ) {
      blocks.push({
        type: "h2",
        text: trimmed.replace(
          /^#{1,2}\s+/,
          "",
        ),
      });

      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (
        index < lines.length &&
        /^[-*]\s+/.test(
          lines[index].trim(),
        )
      ) {
        items.push(
          lines[index]
            .trim()
            .replace(
              /^[-*]\s+/,
              "",
            ),
        );

        index += 1;
      }

      blocks.push({
        type: "ul",
        items,
      });

      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];

      while (
        index < lines.length &&
        /^\d+\.\s+/.test(
          lines[index].trim(),
        )
      ) {
        items.push(
          lines[index]
            .trim()
            .replace(
              /^\d+\.\s+/,
              "",
            ),
        );

        index += 1;
      }

      blocks.push({
        type: "ol",
        items,
      });

      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];

      while (
        index < lines.length &&
        /^>\s?/.test(
          lines[index].trim(),
        )
      ) {
        quoteLines.push(
          lines[index]
            .trim()
            .replace(
              /^>\s?/,
              "",
            ),
        );

        index += 1;
      }

      blocks.push({
        type: "quote",
        text: quoteLines.join(" "),
      });

      continue;
    }

    const paragraph: string[] = [
      trimmed,
    ];

    index += 1;

    while (index < lines.length) {
      const next =
        lines[index].trim();

      if (
        !next ||
        isBlockStart(next)
      ) {
        break;
      }

      paragraph.push(next);
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      text: paragraph.join(" "),
    });
  }

  return blocks;
}

export function MarkdownContent({
  content,
}: {
  content: string;
}) {
  const blocks =
    parseMarkdown(content);

  return (
    <div className="reading-copy max-w-none">
      {blocks.map(
        (block, index) => {
          if (block.type === "h2") {
            return (
              <h2
                key={index}
                className="scroll-mt-28"
              >
                {renderInline(
                  block.text,
                )}
              </h2>
            );
          }

          if (block.type === "h3") {
            return (
              <h3
                key={index}
                className="scroll-mt-28"
              >
                {renderInline(
                  block.text,
                )}
              </h3>
            );
          }

          if (block.type === "ul") {
            return (
              <ul
                key={index}
                className="my-6 list-disc space-y-2 pl-6"
              >
                {block.items.map(
                  (
                    item,
                    itemIndex,
                  ) => (
                    <li
                      key={
                        itemIndex
                      }
                    >
                      {renderInline(
                        item,
                      )}
                    </li>
                  ),
                )}
              </ul>
            );
          }

          if (block.type === "ol") {
            return (
              <ol
                key={index}
                className="my-6 list-decimal space-y-2 pl-6"
              >
                {block.items.map(
                  (
                    item,
                    itemIndex,
                  ) => (
                    <li
                      key={
                        itemIndex
                      }
                    >
                      {renderInline(
                        item,
                      )}
                    </li>
                  ),
                )}
              </ol>
            );
          }

          if (block.type === "quote") {
            return (
              <blockquote
                key={index}
                className="my-7 border-l-4 border-blue-500 bg-slate-50 px-5 py-4 italic text-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {renderInline(
                  block.text,
                )}
              </blockquote>
            );
          }

          if (block.type === "image") {
            return (
              <figure
                key={index}
                className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950"
              >
                <img
                  src={block.src}
                  alt={block.alt}
                  title={
                    block.caption ||
                    undefined
                  }
                  loading="lazy"
                  decoding="async"
                  className="mx-auto max-h-[620px] w-full rounded-xl object-contain"
                />

                {block.caption ? (
                  <figcaption className="px-3 pb-1 pt-4 text-center text-sm text-slate-600 dark:text-slate-300">
                    {
                      block.caption
                    }
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          return (
            <p key={index}>
              {renderInline(
                block.text,
              )}
            </p>
          );
        },
      )}
    </div>
  );
}