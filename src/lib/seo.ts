import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { readSite } from "@/lib/site";
import type { Seo, SeoCopy, SeoPageId } from "@/lib/site-types";
import { SEO_PAGES, SEO_PAGE_META } from "@/lib/site-types";
export { defaultSeo, resolveSeo } from "@/lib/site-defaults";

export function localeOf(value: string): Locale {
  return routing.locales.includes(value as Locale) ? (value as Locale) : routing.defaultLocale;
}

function originOf(seo: Seo) {
  const saved = seo.siteUrl.replace(/\/+$/, "");
  if (saved) return saved;
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ?? "";
  if (!env) return "";
  return /^https?:\/\//i.test(env) ? env : `https://${env}`;
}

function absoluteUrl(origin: string, path: string) {
  if (path.startsWith("http")) return path;
  const base = origin.replace(/\/+$/, "");
  const next = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${next}` : next;
}

export function localizedPath(locale: string, page: SeoPageId) {
  return `/${localeOf(locale)}${SEO_PAGE_META[page].path}`;
}

export function pageCopy(seo: Seo, locale: string, page: SeoPageId): SeoCopy {
  return seo.pages[page][localeOf(locale)];
}

function keywordList(value: string) {
  return value
    .split(/[،,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildPageMetadata(locale: string, page: SeoPageId): Metadata {
  const site = readSite();
  const seo = site.seo;
  const copy = pageCopy(seo, locale, page);
  const path = localizedPath(locale, page);
  const origin = originOf(seo);
  const ogImage = seo.ogImage || site.company.heroImage;
  const ogAbs = ogImage ? absoluteUrl(origin, ogImage) : "";
  const languages = {
    ar: localizedPath("ar", page),
    en: localizedPath("en", page),
    "x-default": localizedPath("en", page),
  };
  const metadata: Metadata = {
    title: { absolute: copy.title },
    description: copy.description,
    keywords: keywordList(copy.keywords),
    robots: seo.index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type: page === "contact" ? "website" : "website",
      siteName: seo.siteName,
      locale: localeOf(locale) === "ar" ? "ar_AR" : "en_US",
      alternateLocale: localeOf(locale) === "ar" ? ["en_US"] : ["ar_AR"],
      title: copy.title,
      description: copy.description,
      url: path,
      images: ogAbs ? [{ url: ogAbs, alt: seo.siteName, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ogAbs ? [ogAbs] : undefined,
    },
  };

  if (origin) {
    try {
      metadata.metadataBase = new URL(origin);
    } catch {
      /* ignore */
    }
  }
  if (seo.googleVerification) {
    metadata.verification = { google: seo.googleVerification };
  }

  return metadata;
}

export function pageSeo(page: SeoPageId) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    return buildPageMetadata(locale, page);
  };
}

export function sitemapEntries() {
  const seo = readSite().seo;
  const origin = originOf(seo);
  if (!origin || !seo.index) return [];
  const lastModified = new Date();
  return SEO_PAGES.flatMap((page) =>
    routing.locales.map((locale) => {
      const path = localizedPath(locale, page);
      return {
        url: absoluteUrl(origin, path),
        lastModified,
        changeFrequency: page === "home" ? ("weekly" as const) : ("monthly" as const),
        priority: page === "home" ? 1 : page === "contact" || page === "services" ? 0.8 : 0.6,
        alternates: {
          languages: {
            ar: absoluteUrl(origin, localizedPath("ar", page)),
            en: absoluteUrl(origin, localizedPath("en", page)),
            "x-default": absoluteUrl(origin, localizedPath("en", page)),
          },
        },
      };
    }),
  );
}

export function jsonLd(locale: string, page: SeoPageId = "home") {
  const site = readSite();
  const seo = site.seo;
  const company = site.company;
  const origin = originOf(seo);
  const lang = localeOf(locale);
  const copy = pageCopy(seo, lang, page);
  const path = localizedPath(lang, page);
  const pageUrl = origin ? absoluteUrl(origin, path) : path;
  const homeUrl = origin ? absoluteUrl(origin, localizedPath(lang, "home")) : localizedPath(lang, "home");
  const image = absoluteUrl(origin, seo.ogImage || company.heroImage);
  const phone = company.whatsapp.replace(/\D/g, "");
  const sameAs = [company.instagram, company.linkedin, company.facebook, company.tiktok, company.youtube].filter(
    Boolean,
  );
  const studioId = origin ? `${origin}/#studio` : "#studio";
  const siteId = origin ? `${origin}/#website` : "#website";
  const services = site.services.map((item) => item[lang]).filter((item) => item.title);

  const pageType =
    page === "contact" ? "ContactPage" : page === "about" ? "AboutPage" : page === "work" ? "CollectionPage" : "WebPage";

  const graph: Record<string, unknown>[] = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": studioId,
      name: seo.siteName,
      alternateName: "إيڤنتس أون",
      url: origin || undefined,
      image,
      logo: origin ? absoluteUrl(origin, "/favicon.svg") : "/favicon.svg",
      email: company.email || undefined,
      telephone: phone ? `+${phone}` : undefined,
      slogan: "Keep your event ON!",
      description: pageCopy(seo, lang, "home").description,
      knowsLanguage: ["ar", "en"],
      sameAs: sameAs.length ? sameAs : undefined,
      contactPoint: phone
        ? {
            "@type": "ContactPoint",
            telephone: `+${phone}`,
            contactType: "sales",
            availableLanguage: ["ar", "en"],
          }
        : undefined,
      hasOfferCatalog: services.length
        ? {
            "@type": "OfferCatalog",
            name: lang === "ar" ? "خدمات إنتاج الإيفنتات" : "Event production services",
            itemListElement: services.map((item) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: item.title,
                description: item.body,
                provider: { "@id": studioId },
              },
            })),
          }
        : undefined,
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      name: seo.siteName,
      url: origin || homeUrl,
      inLanguage: lang === "ar" ? "ar" : "en",
      description: pageCopy(seo, lang, "home").description,
      publisher: { "@id": studioId },
    },
    {
      "@type": pageType,
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: copy.title,
      description: copy.description,
      inLanguage: lang === "ar" ? "ar" : "en",
      isPartOf: { "@id": siteId },
      about: { "@id": studioId },
      primaryImageOfPage: image || undefined,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: seo.siteName,
          item: homeUrl,
        },
        ...(page === "home"
          ? []
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: copy.title,
                item: pageUrl,
              },
            ]),
      ],
    },
  ];

  if (page === "work") {
    graph.push({
      "@type": "ItemList",
      name: copy.title,
      itemListElement: site.work.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item[lang].title,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph.map(stripEmpty),
  };
}

function stripEmpty(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== ""));
}
