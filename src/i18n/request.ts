import { hasLocale } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { readSite } from "@/lib/site";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const catalog = readSite().messages;
  const messages = (catalog[locale] ?? catalog[routing.defaultLocale] ?? {}) as AbstractIntlMessages;

  return {
    locale,
    messages,
  };
});
