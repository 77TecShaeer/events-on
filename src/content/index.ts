import type { Locale } from "@/i18n/routing";
import { getContent as readCatalog } from "@/lib/site";

export type { HistoryBeat, Service, TeamMember, WorkItem } from "./en";

export function getContent(locale: Locale) {
  return readCatalog(locale);
}
