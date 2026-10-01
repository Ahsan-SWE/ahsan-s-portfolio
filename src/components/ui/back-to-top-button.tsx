"use client";

export function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="mr-5 cursor-pointer border-0 bg-transparent p-0 font-medium text-gray-500 underline underline-offset-4 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300"
    >
      Back to top
    </button>
  );
}
