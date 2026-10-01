"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className={`${compact ? "p-2" : "p-2.5"} rounded-full bg-gray-200/80 text-gray-800 transition duration-300 hover:rotate-45 hover:bg-gray-300 dark:bg-gray-800/80 dark:text-yellow-400 dark:hover:bg-gray-700`}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <FaMoon aria-hidden="true" className="dark:hidden" />
      <FaSun aria-hidden="true" className="hidden dark:block" />
    </button>
  );
}
