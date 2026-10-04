"use client";

import {
  type ChangeEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type BlogMarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

type Selection = {
  start: number;
  end: number;
};

type RecentImage = {
  previewUrl: string;
  path: string;
  alt: string;
};

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

function safeFilenameLabel(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSelection(
  selection: Selection,
  valueLength: number,
): Selection {
  const start = Math.max(
    0,
    Math.min(selection.start, valueLength),
  );

  const end = Math.max(
    start,
    Math.min(selection.end, valueLength),
  );

  return {
    start,
    end,
  };
}

function imageError(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return `${file.name}: unsupported image format.`;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return `${file.name}: image must be 4 MB or smaller.`;
  }

  return "";
}

export function BlogMarkdownEditor({
  value,
  onChange,
  disabled = false,
}: BlogMarkdownEditorProps) {
  const textareaRef =
    useRef<HTMLTextAreaElement | null>(null);

  const imageInputRef =
    useRef<HTMLInputElement | null>(null);

  const valueRef =
    useRef<string>(value);

  const selectionRef =
    useRef<Selection>({
      start: 0,
      end: 0,
    });

  const [status, setStatus] =
    useState(
      "Select text and choose a formatting option.",
    );

  const [uploading, setUploading] =
    useState(false);

  const [
    recentImages,
    setRecentImages,
  ] = useState<RecentImage[]>([]);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  function getValue() {
    return valueRef.current;
  }

  function rememberSelection() {
    const textarea =
      textareaRef.current;

    if (!textarea) {
      return;
    }

    selectionRef.current =
      normalizeSelection(
        {
          start:
            textarea.selectionStart,
          end:
            textarea.selectionEnd,
        },
        textarea.value.length,
      );
  }

  function getSelection() {
    return normalizeSelection(
      selectionRef.current,
      getValue().length,
    );
  }

  function restoreSelection(
    start: number,
    end: number,
  ) {
    const normalized =
      normalizeSelection(
        {
          start,
          end,
        },
        getValue().length,
      );

    selectionRef.current =
      normalized;

    requestAnimationFrame(() => {
      const textarea =
        textareaRef.current;

      if (!textarea) {
        return;
      }

      textarea.focus();

      textarea.setSelectionRange(
        normalized.start,
        normalized.end,
      );
    });
  }

  function commitValue(
    nextValue: string,
    start: number,
    end: number,
  ) {
    valueRef.current =
      nextValue;

    const normalized =
      normalizeSelection(
        {
          start,
          end,
        },
        nextValue.length,
      );

    selectionRef.current =
      normalized;

    onChange(nextValue);

    requestAnimationFrame(() => {
      const textarea =
        textareaRef.current;

      if (!textarea) {
        return;
      }

      textarea.focus();

      textarea.setSelectionRange(
        normalized.start,
        normalized.end,
      );
    });
  }

  function preserveSelection(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    rememberSelection();
  }

  function wrapInline(
    before: string,
    after: string,
    placeholder: string,
  ) {
    const text =
      getValue();

    const {
      start,
      end,
    } = getSelection();

    const selected =
      end > start
        ? text.slice(
            start,
            end,
          )
        : placeholder;

    const nextValue =
      text.slice(
        0,
        start,
      ) +
      before +
      selected +
      after +
      text.slice(end);

    const nextStart =
      start +
      before.length;

    const nextEnd =
      nextStart +
      selected.length;

    commitValue(
      nextValue,
      nextStart,
      nextEnd,
    );

    setStatus(
      "Formatting applied to the selected text.",
    );
  }

  function selectedLineRange() {
    const text =
      getValue();

    const {
      start,
      end,
    } = getSelection();

    const lineStart =
      text.lastIndexOf(
        "\n",
        Math.max(
          0,
          start - 1,
        ),
      ) + 1;

    const searchFrom =
      end > start
        ? end
        : start;

    const nextNewline =
      text.indexOf(
        "\n",
        searchFrom,
      );

    const lineEnd =
      nextNewline === -1
        ? text.length
        : nextNewline;

    return {
      lineStart,
      lineEnd,
      text: text.slice(
        lineStart,
        lineEnd,
      ),
    };
  }

  function replaceSelectedLines(
    transform: (
      lines: string[],
    ) => string[],
  ) {
    const text =
      getValue();

    const range =
      selectedLineRange();

    const transformed =
      transform(
        range.text.split(
          "\n",
        ),
      ).join("\n");

    const nextValue =
      text.slice(
        0,
        range.lineStart,
      ) +
      transformed +
      text.slice(
        range.lineEnd,
      );

    commitValue(
      nextValue,
      range.lineStart,
      range.lineStart +
        transformed.length,
    );
  }

  function heading(
    level: 2 | 3,
  ) {
    const prefix =
      `${"#".repeat(level)} `;

    replaceSelectedLines(
      (lines) =>
        lines.map(
          (line) => {
            if (!line.trim()) {
              return line;
            }

            const content =
              line.replace(
                /^\s*#{1,6}\s+/,
                "",
              );

            return `${prefix}${content}`;
          },
        ),
    );

    setStatus(
      `Heading ${level} applied.`,
    );
  }

  function quoteExactSelection() {
    const text =
      getValue();

    const {
      start,
      end,
    } = getSelection();

    if (end <= start) {
      setStatus(
        "Select the exact text you want to quote.",
      );

      restoreSelection(
        start,
        end,
      );

      return;
    }

    const selected =
      text.slice(
        start,
        end,
      );

    const quoteLines =
      selected
        .replace(/\r\n/g, "\n")
        .split("\n");

    const quoted =
      quoteLines
        .map((line) =>
          line.trim()
            ? `> ${line.replace(
                /^\s*>\s?/,
                "",
              )}`
            : ">",
        )
        .join("\n");

    const before =
      text.slice(
        0,
        start,
      );

    const after =
      text.slice(end);

    const leadingBreak =
      before &&
      !before.endsWith(
        "\n\n",
      )
        ? "\n\n"
        : "";

    const trailingBreak =
      after &&
      !after.startsWith(
        "\n\n",
      )
        ? "\n\n"
        : "";

    const replacement =
      `${leadingBreak}${quoted}${trailingBreak}`;

    const nextValue =
      before +
      replacement +
      after;

    const quoteStart =
      before.length +
      leadingBreak.length;

    const quoteEnd =
      quoteStart +
      quoted.length;

    commitValue(
      nextValue,
      quoteStart,
      quoteEnd,
    );

    setStatus(
      "Selected text converted to a quote.",
    );
  }

  function transformSelectedLines(
    type:
      | "bullet"
      | "number",
  ) {
    const text =
      getValue();

    const {
      start,
      end,
    } = getSelection();

    if (end <= start) {
      setStatus(
        "Select the lines you want to format.",
      );

      restoreSelection(
        start,
        end,
      );

      return;
    }

    const selected =
      text.slice(
        start,
        end,
      );

    const rawLines =
      selected
        .replace(
          /\r\n/g,
          "\n",
        )
        .split("\n");

    const cleanLines =
      rawLines
        .map((line) =>
          line
            .replace(
              /^\s*(?:[-*+]\s+|\d+\.\s+)/,
              "",
            )
            .trim(),
        )
        .filter(Boolean);

    if (
      cleanLines.length ===
      0
    ) {
      setStatus(
        "No text lines were found in the selection.",
      );

      restoreSelection(
        start,
        end,
      );

      return;
    }

    const formattedLines =
      cleanLines.map(
        (
          line,
          index,
        ) => {
          if (
            type ===
            "number"
          ) {
            return `${index + 1}. ${line}`;
          }

          return `- ${line}`;
        },
      );

    const formatted =
      formattedLines.join(
        "\n",
      );

    const nextValue =
      text.slice(
        0,
        start,
      ) +
      formatted +
      text.slice(end);

    commitValue(
      nextValue,
      start,
      start +
        formatted.length,
    );

    setStatus(
      type === "number"
        ? `${cleanLines.length} line(s) numbered successfully.`
        : `${cleanLines.length} line(s) converted to bullets.`,
    );
  }

  function addLink() {
    const text =
      getValue();

    const {
      start,
      end,
    } = getSelection();

    const selected =
      end > start
        ? text.slice(
            start,
            end,
          )
        : "link text";

    const href =
      window.prompt(
        "Enter the link URL. Internal links can start with /.",
        "https://",
      );

    if (!href?.trim()) {
      restoreSelection(
        start,
        end,
      );

      return;
    }

    const markdown =
      `[${selected}](${href.trim()})`;

    const nextValue =
      text.slice(
        0,
        start,
      ) +
      markdown +
      text.slice(end);

    commitValue(
      nextValue,
      start + 1,
      start +
        1 +
        selected.length,
    );

    setStatus(
      "Link added.",
    );
  }

  function openImagePicker() {
    imageInputRef.current?.click();
  }

  async function uploadImage(
    file: File,
  ) {
    const payload =
      new FormData();

    payload.append(
      "file",
      file,
    );

    const response =
      await fetch(
        "/api/cms/image",
        {
          method: "POST",
          body: payload,
        },
      );

    const body =
      (await response
        .json()
        .catch(
          () => ({}),
        )) as {
        image?: string;
        error?: string;
      };

    const imagePath =
      typeof body.image ===
      "string"
        ? body.image.trim()
        : "";

    if (
      !response.ok ||
      !imagePath
    ) {
      throw new Error(
        body.error ||
          `Could not upload ${file.name}.`,
      );
    }

    return imagePath;
  }

  async function addImage(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] ??
      null;

    event.target.value =
      "";

    if (!file) {
      return;
    }

    const validationError =
      imageError(file);

    if (validationError) {
      setStatus(
        validationError,
      );

      return;
    }

    const savedPosition =
      getSelection();

    const suggestedAlt =
      safeFilenameLabel(
        file.name,
      ) ||
      "Article image";

    const alt =
      window
        .prompt(
          "Image alt text",
          suggestedAlt,
        )
        ?.trim();

    if (!alt) {
      restoreSelection(
        savedPosition.start,
        savedPosition.end,
      );

      return;
    }

    const caption =
      window
        .prompt(
          "Image caption (optional)",
          "",
        )
        ?.trim() ?? "";

    setUploading(true);

    setStatus(
      "Uploading article image...",
    );

    try {
      const imagePath =
        await uploadImage(
          file,
        );

      const latestText =
        getValue();

      const insertAt =
        Math.min(
          savedPosition.start,
          latestText.length,
        );

      const before =
        latestText.slice(
          0,
          insertAt,
        );

      const after =
        latestText.slice(
          insertAt,
        );

      const safeAlt =
        alt
          .replace(
            /\]/g,
            "",
          )
          .trim();

      const safeCaption =
        caption
          .replace(
            /"/g,
            "'",
          )
          .trim();

      const imageMarkdown =
        safeCaption
          ? `![${safeAlt}](${imagePath} "${safeCaption}")`
          : `![${safeAlt}](${imagePath})`;

      const leadingBreak =
        before.length > 0 &&
        !before.endsWith(
          "\n\n",
        )
          ? "\n\n"
          : "";

      const trailingBreak =
        after.length > 0 &&
        !after.startsWith(
          "\n\n",
        )
          ? "\n\n"
          : "";

      const inserted =
        `${leadingBreak}${imageMarkdown}${trailingBreak}`;

      const nextValue =
        before +
        inserted +
        after;

      const cursor =
        before.length +
        inserted.length;

      const previewUrl =
        URL.createObjectURL(
          file,
        );

      setRecentImages(
        (current) => [
          ...current,
          {
            previewUrl,
            path:
              imagePath,
            alt:
              safeAlt,
          },
        ],
      );

      commitValue(
        nextValue,
        cursor,
        cursor,
      );

      setStatus(
        "Image added successfully. Move the cursor and click Add Image again to insert another image.",
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Image upload failed.",
      );

      restoreSelection(
        savedPosition.start,
        savedPosition.end,
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <div>
        <p className="form-label">
          Article content
        </p>

        <div className="flex flex-wrap gap-2 rounded-t-xl border border-b-0 border-slate-300 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
          <ToolbarButton
            label="H2"
            title="Heading 2"
            onMouseDown={
              preserveSelection
            }
            onClick={() =>
              heading(2)
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label="H3"
            title="Heading 3"
            onMouseDown={
              preserveSelection
            }
            onClick={() =>
              heading(3)
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label="Bold"
            title="Bold selected text"
            onMouseDown={
              preserveSelection
            }
            onClick={() =>
              wrapInline(
                "**",
                "**",
                "bold text",
              )
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label="Italic"
            title="Italic selected text"
            onMouseDown={
              preserveSelection
            }
            onClick={() =>
              wrapInline(
                "*",
                "*",
                "italic text",
              )
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label="Link"
            title="Add link to selected text"
            onMouseDown={
              preserveSelection
            }
            onClick={
              addLink
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label="Bullets"
            title="Convert every selected line to a bullet"
            onMouseDown={
              preserveSelection
            }
            onClick={() =>
              transformSelectedLines(
                "bullet",
              )
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label="Numbering"
            title="Number every selected line"
            onMouseDown={
              preserveSelection
            }
            onClick={() =>
              transformSelectedLines(
                "number",
              )
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label="Quote"
            title="Quote only the selected text"
            onMouseDown={
              preserveSelection
            }
            onClick={
              quoteExactSelection
            }
            disabled={
              disabled ||
              uploading
            }
          />

          <ToolbarButton
            label={
              uploading
                ? "Uploading..."
                : "Add Image"
            }
            title="Insert an image at the current cursor position"
            onMouseDown={
              preserveSelection
            }
            onClick={
              openImagePicker
            }
            disabled={
              disabled ||
              uploading
            }
          />
        </div>

        <textarea
          ref={
            textareaRef
          }
          value={value}
          rows={24}
          disabled={
            disabled ||
            uploading
          }
          onChange={(
            event,
          ) => {
            const nextValue =
              event.target.value;

            valueRef.current =
              nextValue;

            onChange(
              nextValue,
            );

            selectionRef.current =
              {
                start:
                  event
                    .target
                    .selectionStart,
                end:
                  event
                    .target
                    .selectionEnd,
              };
          }}
          onSelect={
            rememberSelection
          }
          onClick={
            rememberSelection
          }
          onKeyUp={
            rememberSelection
          }
          onMouseUp={
            rememberSelection
          }
          className="form-field min-h-[620px] resize-y rounded-t-none font-mono text-sm leading-7"
          placeholder="Write or paste the complete article here..."
        />

        <input
          ref={
            imageInputRef
          }
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={
            addImage
          }
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {recentImages.length >
      0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Recently added article images
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {recentImages.length} image(s) added
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {recentImages.map(
              (
                image,
                index,
              ) => (
                <div
                  key={`${image.path}-${index}`}
                  className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      image.previewUrl
                    }
                    alt={
                      image.alt
                    }
                    className="max-h-64 w-full rounded-lg object-contain"
                  />

                  <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
                    {image.alt}
                  </p>

                  <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">
                    {image.path}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {status}
      </p>
    </div>
  );
}

type ToolbarButtonProps = {
  label: string;
  title: string;
  onClick: () => void;
  onMouseDown: (
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
  disabled: boolean;
};

function ToolbarButton({
  label,
  title,
  onClick,
  onMouseDown,
  disabled,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={
        onMouseDown
      }
      onClick={
        onClick
      }
      disabled={
        disabled
      }
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:text-blue-300"
    >
      {label}
    </button>
  );
}