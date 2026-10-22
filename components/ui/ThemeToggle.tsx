"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, bindSystemTheme, THEME_KEY, type Theme } from "@/lib/theme";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  useEffect(() => bindSystemTheme(), []);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Switch color theme"
      onClick={() => {
        const next: Theme = currentTheme() === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          /* The choice still applies for this visit when storage is blocked. */
        }
        applyTheme(next);
      }}
    >
      <Moon className="theme-icon theme-icon-moon" size={16} strokeWidth={1.75} aria-hidden />
      <Sun className="theme-icon theme-icon-sun" size={16} strokeWidth={1.75} aria-hidden />
    </button>
  );
}
