import "server-only";

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { revalidatePath } from "next/cache";
import type { Locale } from "@/i18n/routing";
import { defaultSite, resolveSeo, SAMPLE_COMPANY } from "@/lib/site-defaults";
import type { Company, LocaleCatalog, Site } from "@/lib/site-types";

const SITE_PATH = join(process.cwd(), "data", "site.json");

export function readSite(): Site {
  const fallback = defaultSite();
  if (!existsSync(SITE_PATH)) return fallback;
  try {
    const parsed = JSON.parse(readFileSync(SITE_PATH, "utf8")) as Partial<Site>;
    return {
      company: { ...fallback.company, ...parsed.company },
      seo: resolveSeo(parsed.seo),
      messages: parsed.messages ?? fallback.messages,
      services: parsed.services?.length ? parsed.services : fallback.services,
      work: parsed.work?.length ? parsed.work : fallback.work,
      team: parsed.team?.length ? parsed.team : fallback.team,
      history: parsed.history?.length ? parsed.history : fallback.history,
    };
  } catch {
    return fallback;
  }
}

export function writeSite(site: Site) {
  try {
    mkdirSync(dirname(SITE_PATH), { recursive: true });
    const tmp = `${SITE_PATH}.${process.pid}.tmp`;
    writeFileSync(tmp, `${JSON.stringify(site, null, 2)}\n`, "utf8");
    renameSync(tmp, SITE_PATH);
  } catch {
    throw new Error("التعذر كتابة الملف. الداشبورد بتحتاج سيرفر يقدر يحفظ على الديسك.");
  }
}

export function revalidateSite() {
  revalidatePath("/[locale]", "layout");
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
      id: item.id,
      title: item[locale].title,
      body: item[locale].body,
    })),
    work: site.work.map((item) => ({
      id: item.id,
      tone: item.tone,
      image: item.image,
      title: item[locale].title,
      category: item[locale].category,
      venue: item[locale].venue,
      alt: item[locale].alt,
    })),
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
