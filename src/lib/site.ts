import "server-only";

import { revalidatePath } from "next/cache";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { readJson, remember, remembered, writeJson } from "@/lib/persist";
import { defaultSite, resolveSeo, SAMPLE_COMPANY } from "@/lib/site-defaults";
import { SEO_PAGES, SEO_PAGE_META } from "@/lib/site-types";
import type {
  Company,
  LocaleCatalog,
  ServiceRecord,
  Site,
  WorkCopy,
  WorkRecord,
  WorkVisualRecord,
} from "@/lib/site-types";

function mergeMessages(fallback: Record<string, unknown>, saved?: Record<string, unknown>) {
  if (!saved) return fallback;
  const merged: Record<string, unknown> = { ...fallback };
  for (const [key, value] of Object.entries(saved)) {
    const base = fallback[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base &&
      typeof base === "object" &&
      !Array.isArray(base)
    ) {
      merged[key] = mergeMessages(base as Record<string, unknown>, value as Record<string, unknown>);
    } else if (value !== undefined) {
      merged[key] = value;
    }
  }
  return merged;
}

function copyOf(loc: Partial<WorkCopy> | undefined): WorkCopy {
  return {
    title: loc?.title ?? "",
    category: loc?.category ?? "",
    venue: loc?.venue ?? "",
    alt: loc?.alt ?? "",
    summary: loc?.summary ?? "",
    brief: loc?.brief ?? "",
    approach: loc?.approach ?? "",
    outcome: loc?.outcome ?? "",
  };
}

export function normalizeWork(item: Partial<WorkRecord> & { id?: string }): WorkRecord {
  const ar = copyOf(item.ar);
  const en = copyOf(item.en);
  const visuals = (item.visuals ?? [])
    .filter((visual) => visual?.src?.trim())
    .map((visual) => ({
      src: visual.src.trim(),
      ar: { alt: visual.ar?.alt ?? "", caption: visual.ar?.caption ?? "" },
      en: { alt: visual.en?.alt ?? "", caption: visual.en?.caption ?? "" },
    }));
  if (!visuals.length && item.image?.trim()) {
    visuals.push({
      src: item.image.trim(),
      ar: { alt: ar.alt, caption: "" },
      en: { alt: en.alt, caption: "" },
    });
  }
  const cover = visuals[0];
  if (cover) {
    ar.alt = cover.ar.alt || cover.ar.caption || ar.alt || ar.title;
    en.alt = cover.en.alt || cover.en.caption || en.alt || en.title;
    cover.ar.alt = ar.alt;
    cover.en.alt = en.alt;
  }
  return {
    id: item.id?.trim() || `w-${Math.random().toString(36).slice(2, 8)}`,
    featured: Boolean(item.featured),
    tone: item.tone === "pink" || item.tone === "green" || item.tone === "ink" ? item.tone : "ink",
    image: cover?.src || "",
    visuals,
    ar,
    en,
  };
}

export function normalizeServices(items: Array<Partial<ServiceRecord>>): ServiceRecord[] {
  const seen = new Set<string>();
  return items.map((item, index) => {
    const icon = (item.icon || item.id || "events").trim() || "events";
    let uid = (item.uid || "").trim();
    if (!uid || seen.has(uid)) {
      uid = `${icon}-${index + 1}`;
      while (seen.has(uid)) uid = `${uid}-x`;
    }
    seen.add(uid);
    return {
      uid,
      id: icon,
      icon,
      ar: { title: item.ar?.title ?? "", body: item.ar?.body ?? "" },
      en: { title: item.en?.title ?? "", body: item.en?.body ?? "" },
    };
  });
}

function hydrate(parsed: Partial<Site> | undefined): Site {
  const fallback = defaultSite();
  if (!parsed) return fallback;
  return {
    company: { ...fallback.company, ...parsed.company },
    seo: resolveSeo(parsed.seo),
    messages: {
      ar: mergeMessages(fallback.messages.ar, parsed.messages?.ar),
      en: mergeMessages(fallback.messages.en, parsed.messages?.en),
    },
    services: normalizeServices(Array.isArray(parsed.services) ? parsed.services : fallback.services),
    work: (parsed.work?.length ? parsed.work : fallback.work).map((item) => normalizeWork(item)),
    team: parsed.team?.length ? parsed.team : fallback.team,
    history: parsed.history?.length ? parsed.history : fallback.history,
  };
}

export function readSite(): Site {
  const cached = remembered("site") as Partial<Site> | undefined;
  const site = hydrate(cached ?? readJson<Partial<Site>>("site.json", {}));
  remember("site", site);
  return site;
}

export function writeSite(site: Site) {
  remember("site", site);
  try {
    writeJson("site.json", site);
  } catch {
    throw new Error("التعذر كتابة الملف. الداشبورد بتحتاج سيرفر يقدر يحفظ على الديسك.");
  }
}

export function revalidateSite() {
  revalidatePath("/", "layout");
  for (const locale of routing.locales) {
    for (const page of SEO_PAGES) {
      revalidatePath(`/${locale}${SEO_PAGE_META[page].path}`, "layout");
    }
  }
  revalidatePath("/admin", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
}

export function resolveCompany(company: Company): Company {
  return {
    email: company.email.trim() || process.env.NEXT_PUBLIC_EMAIL?.trim() || SAMPLE_COMPANY.email,
    whatsapp:
      company.whatsapp.replace(/\D/g, "") ||
      process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") ||
      SAMPLE_COMPANY.whatsapp,
    instagram: company.instagram.trim() || process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || SAMPLE_COMPANY.instagram,
    linkedin: company.linkedin.trim() || process.env.NEXT_PUBLIC_LINKEDIN?.trim() || SAMPLE_COMPANY.linkedin,
    facebook: company.facebook.trim() || process.env.NEXT_PUBLIC_FACEBOOK?.trim() || SAMPLE_COMPANY.facebook,
    tiktok: company.tiktok.trim() || process.env.NEXT_PUBLIC_TIKTOK?.trim() || SAMPLE_COMPANY.tiktok,
    youtube: company.youtube.trim() || process.env.NEXT_PUBLIC_YOUTUBE?.trim() || SAMPLE_COMPANY.youtube,
    heroImage: company.heroImage.trim() || SAMPLE_COMPANY.heroImage,
  };
}

export function projectContent(locale: Locale, site = readSite()): LocaleCatalog {
  const company = resolveCompany(site.company);
  return {
    company,
    featuredWorkIds: site.work.filter((item) => item.featured).map((item) => item.id),
    services: site.services.map((item) => ({
      id: item.uid,
      icon: item.icon || item.id,
      title: item[locale].title,
      body: item[locale].body,
    })),
    work: site.work.map((item) => {
      const copy = item[locale];
      const visuals = (item.visuals ?? []).map((visual: WorkVisualRecord) => ({
        src: visual.src,
        alt: visual[locale].alt || visual[locale].caption || copy.alt || copy.title,
        caption: visual[locale].caption,
      }));
      return {
        id: item.id,
        tone: item.tone,
        image: item.image || visuals[0]?.src || "",
        title: copy.title,
        category: copy.category,
        venue: copy.venue,
        alt: copy.alt,
        summary: copy.summary,
        brief: copy.brief,
        approach: copy.approach,
        outcome: copy.outcome,
        visuals,
      };
    }),
    team: site.team.map((item) => ({
      id: item.id,
      tone: item.tone,
      image: item.image,
      role: item[locale].role,
      focus: item[locale].focus,
      alt: item[locale].alt,
    })),
    history: site.history.map((item) => ({
      id: item.id,
      index: item.index,
      image: item.image,
      title: item[locale].title,
      body: item[locale].body,
      alt: item[locale].alt,
    })),
  };
}

export function getContent(locale: Locale) {
  return projectContent(locale);
}
