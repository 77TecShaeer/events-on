"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("nav");
  const next: Locale = locale === "en" ? "ar" : "en";

  return (
    <Link href={pathname} locale={next} className="lang-link" aria-label={t("switchTo")}>
      {t("switchTo")}
    </Link>
  );
}
