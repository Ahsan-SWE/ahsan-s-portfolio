"use client";

import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

type UploadResponse = {
  image?: string;
  error?: string;
};

const maxImageSize =
  4 * 1024 * 1024;

function safeLabel(value: string) {
  return value
    .replace(/\]/g, "")
    .trim();
}

function safeCaption(value: string) {
  return value
    .replace(/"/g, "'")
    .trim();
}

export function BlogMarkdownEditor({
  value,
  onChange,
  disabled = false,
}: Props) {
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [editorStatus, setEditorStatus] =
    useState("");

  function selection() {
    const element =
      textareaRef.current;

    return {
      start:
        element?.selectionStart ??
        value.length,
      end:
        element?.selectionEnd ??
        value.length,
    };
  }

  function replaceRange(
    start: number,
    end: number,
    replacement: string,
    selectionStartOffset =
      replacement.length,
    selectionEndOffset =
      selectionStartOffset,
  ) {
    const next =
      value.slice(0, start) +
      replacement +
      value.slice(end);

    onChange(next);

    window.requestAnimationFrame(
      () => {
        const element =
          textareaRef.current;

        if (!element) {
          return;
        }

        element.focus();

        element.setSelectionRange(
          start +
            selectionStartOffset,
          start +
            selectionEndOffset,
        );
      },
    );
  }

  function insertBlock(
    block: string,
  ) {
    const { start, end } =
      selection();

    const before =
      value.slice(0, start);

    const after =
      value.slice(end);

    const leading =
      before.length > 0 &&
      !before.endsWith("\n")
        ? "\n\n"
        : before.endsWith(
              "\n",
            ) &&
            !before.endsWith(
              "\n\n",
            )
          ? "\n"
          : "";

    const trailing =
      after.length > 0 &&
      !after.startsWith("\n")
        ? "\n\n"
        : after.startsWith(
              "\n",
            ) &&
            !after.startsWith(
              "\n\n",
            )
          ? "\n"
          : "";

    const replacement = `${leading}${block}${trailing}`;

    replaceRange(
      start,
      end,
      replacement,
      leading.length,
      leading.length +
        block.length,
    );
  }

  function wrapSelection(
    before: string,
    after: string,
    placeholder: string,
  ) {
    const { start, end } =
      selection();

    const selected =
      value.slice(start, end);

    const text =
      selected || placeholder;

    const replacement = `${before}${text}${after}`;

    replaceRange(
      start,
      end,
      replacement,
      before.length,
      before.length +
        text.length,
    );
  }

  function insertHeading(
    level: 2 | 3,
  ) {
    const { start, end } =
      selection();

    const selected =
      value
        .slice(start, end)
        .replace(/\n+/g, " ")
        .replace(
          /^#{1,6}\s*/,
          "",
        )
        .trim();

    const heading =
      selected ||
      (level === 2
        ? "Section heading"
        : "Subheading");

    insertBlock(
      `${"#".repeat(level)} ${heading}`,
    );
  }

  function formatList(
    type:
      | "bullet"
      | "numbered",
  ) {
    const { start, end } =
      selection();

    const selected =
      value.slice(start, end);

    const source =
      selected.trim() ||
      "List item";

    const lines = source
      .split("\n")
      .map((line) =>
        line
          .replace(
            /^[-*]\s+/,
            "",
          )
          .replace(
            /^\d+\.\s+/,
            "",
          )
          .trim(),
      )
      .filter(Boolean);

    const output = lines
      .map((line, index) =>
        type === "bullet"
          ? `- ${line}`
          : `${index + 1}. ${line}`,
      )
      .join("\n");

    insertBlock(output);
  }

  function insertQuote() {
    const { start, end } =
      selection();

    const selected =
      value.slice(start, end);

    const source =
      selected.trim() ||
      "Quote text";

    const output = source
      .split("\n")
      .map(
        (line) =>
          `> ${line.replace(/^>\s*/, "")}`,
      )
      .join("\n");

    insertBlock(output);
  }

  function insertLink() {
    const { start, end } =
      selection();

    const selected =
      value
        .slice(start, end)
        .trim();

    const label =
      selected ||
      window
        .prompt(
          "Enter link text:",
          "Learn more",
        )
        ?.trim();

    if (!label) {
      return;
    }

    const href =
      window
        .prompt(
          "Enter URL or internal path:",
          "https://",
        )
        ?.trim() || "";

    if (
      !/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(
        href,
      )
    ) {
      setEditorStatus(
        "Please use a valid URL, internal path, email, phone link, or anchor.",
      );

      return;
    }

    const markdown = `[${safeLabel(
      label,
    )}](${href})`;

    replaceRange(
      start,
      end,
      markdown,
    );

    setEditorStatus(
      "Link inserted.",
    );
  }

  async function uploadInlineImage(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      setEditorStatus(
        "Please choose a valid image file.",
      );

      return;
    }

    if (
      file.size > maxImageSize
    ) {
      setEditorStatus(
        "Please choose an image smaller than 4 MB.",
      );

      return;
    }

    const alt =
      window
        .prompt(
          "Enter image alt text:",
        )
        ?.trim();

    if (!alt) {
      setEditorStatus(
        "Image upload cancelled because alt text is required.",
      );

      return;
    }

    const caption =
      window.prompt(
        "Enter an optional image caption:",
        "",
      ) || "";

    setUploadingImage(true);

    setEditorStatus(
      "Uploading article image...",
    );

    try {
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
          )) as UploadResponse;

      if (
        !response.ok ||
        typeof body.image !==
          "string"
      ) {
        throw new Error(
          body.error ||
            "Image upload failed.",
        );
      }

      const cleanAlt =
        safeLabel(alt);

      const cleanCaption =
        safeCaption(caption);

      const markdown =
        cleanCaption
          ? `![${cleanAlt}](${body.image} "${cleanCaption}")`
          : `![${cleanAlt}](${body.image})`;

      insertBlock(markdown);

      setEditorStatus(
        "Image uploaded and inserted into the article.",
      );
    } catch (error) {
      setEditorStatus(
        error instanceof Error
          ? error.message
          : "Could not upload the image.",
      );
    } finally {
      setUploadingImage(false);
    }
  }

  const inactive =
    disabled ||
    uploadingImage;

  return (
    <div>
      <label
        className="form-label"
        htmlFor="cms-article-content"
      >
        Article content
      </label>

      <div className="mb-3 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
        <button
          type="button"
          disabled={inactive}
          onClick={() =>
            insertHeading(2)
          }
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs"
        >
          H2
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={() =>
            insertHeading(3)
          }
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs"
        >
          H3
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={() =>
            wrapSelection(
              "**",
              "**",
              "Bold text",
            )
          }
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs font-bold"
        >
          Bold
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={() =>
            wrapSelection(
              "*",
              "*",
              "Italic text",
            )
          }
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs italic"
        >
          Italic
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={() =>
            formatList(
              "bullet",
            )
          }
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs"
        >
          Bullets
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={() =>
            formatList(
              "numbered",
            )
          }
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs"
        >
          Numbering
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={insertQuote}
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs"
        >
          Quote
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={insertLink}
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs"
        >
          Link
        </button>

        <button
          type="button"
          disabled={inactive}
          onClick={() =>
            imageInputRef.current?.click()
          }
          className="button-secondary !min-h-0 !px-3 !py-2 text-xs"
        >
          {uploadingImage
            ? "Uploading..."
            : "Add Image"}
        </button>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={
            uploadInlineImage
          }
          disabled={inactive}
          className="hidden"
        />
      </div>

      <textarea
        ref={textareaRef}
        id="cms-article-content"
        value={value}
        rows={18}
        disabled={inactive}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        placeholder="Write the article here. Use the toolbar for headings, formatting, lists, links, quotes, and images."
        className="form-field resize-y font-mono leading-relaxed"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>
          Select text before using Bold, Italic, Link, or list tools.
        </span>

        <span>
          {value.length.toLocaleString()} characters
        </span>
      </div>

      {editorStatus ? (
        <p className="mt-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300">
          {editorStatus}
        </p>
      ) : null}
    </div>
  );
}