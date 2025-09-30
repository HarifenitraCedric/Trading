"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evite les erreurs de hydration
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-white transition"
    >
      {theme === "light" ? "🌙 " : "☀️"}
    </button>
  );
}
