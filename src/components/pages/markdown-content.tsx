"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import {
  type ReactNode,
  useMemo,
  useState,
} from "react";

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

const RAW_GITHUB_BASE =
  "https://raw.githubusercontent.com/Ahsan-SWE/ahsan-s-portfolio/main/public";

function renderInline(
  text: string,
): ReactNode[] {
  const parts: ReactNode[] =
    [];

  const regex =
    /(\[([^\]]+)\]\(((?:https?:\/\/|\/|#|mailto:|tel:)[^\s)]+)\)|\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|_([^_\n]+)_|`([^`\n]+)`)/g;

  let cursor = 0;

  let match:
    | RegExpExecArray
    | null;

  let key = 0;

  while (
    (match =
      regex.exec(
        text,
      )) !== null
  ) {
    if (
      match.index >
      cursor
    ) {
      parts.push(
        text.slice(
          cursor,
          match.index,
        ),
      );
    }

    const full =
      match[0];

    const linkLabel =
      match[2];

    const href =
      match[3];

    const bold =
      match[4];

    const italicStar =
      match[5];

    const italicUnderscore =
      match[6];

    const code =
      match[7];

    if (
      linkLabel &&
      href
    ) {
      if (
        href.startsWith(
          "/",
        )
      ) {
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
        href.startsWith(
          "http://",
        ) ||
        href.startsWith(
          "https://",
        )
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
    } else if (
      bold
    ) {
      parts.push(
        <strong
          key={`strong-${key++}`}
        >
          {bold}
        </strong>,
      );
    } else if (
      italicStar ||
      italicUnderscore
    ) {
      parts.push(
        <em
          key={`em-${key++}`}
        >
          {italicStar ||
            italicUnderscore}
        </em>,
      );
    } else if (
      code
    ) {
      parts.push(
        <code
          key={`code-${key++}`}
          className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.92em] dark:bg-slate-800"
        >
          {code}
        </code>,
      );
    } else {
      parts.push(
        full,
      );
    }

    cursor =
      regex.lastIndex;
  }

  if (
    cursor <
    text.length
  ) {
    parts.push(
      text.slice(
        cursor,
      ),
    );
  }

  return parts;
}

function parseImageLine(
  line: string,
) {
  const trimmed =
    line.trim();

  const match =
    trimmed.match(
      /^!\[([^\]]*)\]\(([\s\S]+)\)$/,
    );

  if (!match) {
    return null;
  }

  const alt =
    match[1].trim();

  let inner =
    match[2].trim();

  if (!inner) {
    return null;
  }

  let caption =
    "";

  const titleMatch =
    inner.match(
      /^(.*)\s+"([^"]*)"$/,
    );

  if (titleMatch) {
    inner =
      titleMatch[1].trim();

    caption =
      titleMatch[2].trim();
  }

  if (
    inner.startsWith(
      "<",
    ) &&
    inner.endsWith(
      ">",
    )
  ) {
    inner =
      inner
        .slice(
          1,
          -1,
        )
        .trim();
  }

  const validSource =
    inner.startsWith(
      "/",
    ) ||
    inner.startsWith(
      "https://",
    ) ||
    inner.startsWith(
      "http://",
    );

  if (!validSource) {
    return null;
  }

  return {
    alt,
    src: inner,
    caption,
  };
}

function isBlockStart(
  line: string,
) {
  const trimmed =
    line.trim();

  return (
    /^#{1,3}\s+/.test(
      trimmed,
    ) ||
    /^[-*+]\s+/.test(
      trimmed,
    ) ||
    /^\d+\.\s+/.test(
      trimmed,
    ) ||
    /^>\s?/.test(
      trimmed,
    ) ||
    Boolean(
      parseImageLine(
        trimmed,
      ),
    )
  );
}

function nextNonEmptyLine(
  lines: string[],
  start: number,
) {
  let index =
    start;

  while (
    index <
      lines.length &&
    !lines[
      index
    ].trim()
  ) {
    index += 1;
  }

  return index;
}

function parseMarkdown(
  content: string,
): MarkdownBlock[] {
  const lines =
    content
      .replace(
        /\r\n/g,
        "\n",
      )
      .split("\n");

  const blocks:
    MarkdownBlock[] =
    [];

  let index = 0;

  while (
    index <
    lines.length
  ) {
    const trimmed =
      lines[
        index
      ].trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const image =
      parseImageLine(
        trimmed,
      );

    if (image) {
      blocks.push({
        type: "image",
        ...image,
      });

      index += 1;
      continue;
    }

    if (
      trimmed.startsWith(
        "### ",
      )
    ) {
      blocks.push({
        type: "h3",
        text:
          trimmed.slice(
            4,
          ),
      });

      index += 1;
      continue;
    }

    if (
      trimmed.startsWith(
        "## ",
      ) ||
      trimmed.startsWith(
        "# ",
      )
    ) {
      blocks.push({
        type: "h2",
        text:
          trimmed.replace(
            /^#{1,2}\s+/,
            "",
          ),
      });

      index += 1;
      continue;
    }

    if (
      /^[-*+]\s+/.test(
        trimmed,
      )
    ) {
      const items:
        string[] = [];

      while (
        index <
        lines.length
      ) {
        const current =
          lines[
            index
          ].trim();

        if (
          /^[-*+]\s+/.test(
            current,
          )
        ) {
          items.push(
            current.replace(
              /^[-*+]\s+/,
              "",
            ),
          );

          index += 1;
          continue;
        }

        if (!current) {
          const nextIndex =
            nextNonEmptyLine(
              lines,
              index + 1,
            );

          if (
            nextIndex <
              lines.length &&
            /^[-*+]\s+/.test(
              lines[
                nextIndex
              ].trim(),
            )
          ) {
            index =
              nextIndex;

            continue;
          }
        }

        break;
      }

      blocks.push({
        type: "ul",
        items,
      });

      continue;
    }

    if (
      /^\d+\.\s+/.test(
        trimmed,
      )
    ) {
      const items:
        string[] = [];

      while (
        index <
        lines.length
      ) {
        const current =
          lines[
            index
          ].trim();

        if (
          /^\d+\.\s+/.test(
            current,
          )
        ) {
          items.push(
            current.replace(
              /^\d+\.\s+/,
              "",
            ),
          );

          index += 1;
          continue;
        }

        if (!current) {
          const nextIndex =
            nextNonEmptyLine(
              lines,
              index + 1,
            );

          if (
            nextIndex <
              lines.length &&
            /^\d+\.\s+/.test(
              lines[
                nextIndex
              ].trim(),
            )
          ) {
            index =
              nextIndex;

            continue;
          }
        }

        break;
      }

      blocks.push({
        type: "ol",
        items,
      });

      continue;
    }

    if (
      /^>\s?/.test(
        trimmed,
      )
    ) {
      const quoteLines:
        string[] = [];

      while (
        index <
          lines.length &&
        /^>\s?/.test(
          lines[
            index
          ].trim(),
        )
      ) {
        quoteLines.push(
          lines[
            index
          ]
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
        text:
          quoteLines.join(
            " ",
          ),
      });

      continue;
    }

    const paragraph:
      string[] = [
      trimmed,
    ];

    index += 1;

    while (
      index <
      lines.length
    ) {
      const next =
        lines[
          index
        ].trim();

      if (
        !next ||
        isBlockStart(
          next,
        )
      ) {
        break;
      }

      paragraph.push(
        next,
      );

      index += 1;
    }

    blocks.push({
      type: "paragraph",
      text:
        paragraph.join(
          " ",
        ),
    });
  }

  return blocks;
}

function browserImageSource(
  src: string,
) {
  return src.replace(
    / /g,
    "%20",
  );
}

function imageCandidates(
  src: string,
) {
  const encoded =
    browserImageSource(
      src,
    );

  if (
    !src.startsWith(
      "/uploads/",
    )
  ) {
    return [
      encoded,
    ];
  }

  return [
    encoded,
    `${RAW_GITHUB_BASE}${encoded}`,
  ];
}

function MarkdownImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const candidates =
    useMemo(
      () =>
        imageCandidates(
          src,
        ),
      [src],
    );

  const [
    candidateIndex,
    setCandidateIndex,
  ] = useState(0);

  const [failed, setFailed] =
    useState(false);

  const currentSrc =
    candidates[
      Math.min(
        candidateIndex,
        candidates.length -
          1,
      )
    ];

  if (failed) {
    return (
      <div className="my-8 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
        Image could not be loaded:{" "}
        {src}
      </div>
    );
  }

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
      <img
        src={
          currentSrc
        }
        alt={alt}
        title={
          caption ||
          undefined
        }
        loading="lazy"
        decoding="async"
        onError={() => {
          setCandidateIndex(
            (current) => {
              if (
                current <
                candidates.length -
                  1
              ) {
                return (
                  current + 1
                );
              }

              setFailed(
                true,
              );

              return current;
            },
          );
        }}
        className="mx-auto max-h-[680px] w-full rounded-xl object-contain"
      />

      {caption ? (
        <figcaption className="px-3 pb-1 pt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function MarkdownContent({
  content,
}: {
  content: string;
}) {
  const blocks =
    parseMarkdown(
      content,
    );

  return (
    <div className="reading-copy max-w-none">
      {blocks.map(
        (
          block,
          index,
        ) => {
          if (
            block.type ===
            "h2"
          ) {
            return (
              <h2
                key={
                  index
                }
                className="scroll-mt-28"
              >
                {renderInline(
                  block.text,
                )}
              </h2>
            );
          }

          if (
            block.type ===
            "h3"
          ) {
            return (
              <h3
                key={
                  index
                }
                className="scroll-mt-28"
              >
                {renderInline(
                  block.text,
                )}
              </h3>
            );
          }

          if (
            block.type ===
            "ul"
          ) {
            return (
              <ul
                key={
                  index
                }
                className="my-6 list-disc space-y-2 pl-6"
              >
                {block.items.map(
                  (
                    item,
                    itemIndex,
                  ) => (
                    <li
                      key={`${itemIndex}-${item}`}
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

          if (
            block.type ===
            "ol"
          ) {
            return (
              <ol
                key={
                  index
                }
                className="my-6 list-decimal space-y-3 pl-6"
              >
                {block.items.map(
                  (
                    item,
                    itemIndex,
                  ) => (
                    <li
                      key={`${itemIndex}-${item}`}
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

          if (
            block.type ===
            "quote"
          ) {
            return (
              <blockquote
                key={
                  index
                }
                className="my-7 border-l-4 border-blue-500 bg-slate-50 px-5 py-4 italic text-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {renderInline(
                  block.text,
                )}
              </blockquote>
            );
          }

          if (
            block.type ===
            "image"
          ) {
            return (
              <MarkdownImage
                key={`${block.src}-${index}`}
                src={
                  block.src
                }
                alt={
                  block.alt
                }
                caption={
                  block.caption
                }
              />
            );
          }

          return (
            <p
              key={
                index
              }
            >
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