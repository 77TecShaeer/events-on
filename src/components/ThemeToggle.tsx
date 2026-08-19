"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/components/ThemeProvider";
import clsx from "clsx";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const t = useTranslations("nav");
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx("header-icon", className)}
      aria-label={isDark ? t("useLight") : t("useDark")}
      title={isDark ? t("useLight") : t("useDark")}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M6.2 17.8l1.4-1.4M16.4 7.6l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M18 14.5A6.5 6.5 0 0 1 9.5 6 7 7 0 1 0 18 14.5Z" />
        </svg>
      )}
    </button>
  );
}
