import * as en from "@/content/en";
import * as ar from "@/content/ar";
import enMessages from "../../messages/en.json";
import arMessages from "../../messages/ar.json";
import type { Company, Seo, SeoCopy, Site } from "@/lib/site-types";
import { SEO_PAGES } from "@/lib/site-types";

function env(key: string) {
  return process.env[key]?.trim() ?? "";
}

/** Demo contact until the studio replaces it from the dashboard. */
export const SAMPLE_COMPANY: Company = {
  email: "hello@eventson.com",
  whatsapp: "201012345678",
  instagram: "https://www.instagram.com/eventson",
  linkedin: "https://www.linkedin.com/company/eventson",
  facebook: "https://www.facebook.com/eventson",
  tiktok: "https://www.tiktok.com/@eventson",
  youtube: "https://www.youtube.com/@eventson",
  heroImage: "/media/work/w3.jpg",
};

export const SAMPLE_SITE_URL = "https://www.eventson.com";

function byId<T extends { id: string }>(items: T[], id: string) {
  return items.find((item) => item.id === id);
}

export function defaultCompany(): Company {
  return {
    email: env("NEXT_PUBLIC_EMAIL") || SAMPLE_COMPANY.email,
    whatsapp: env("NEXT_PUBLIC_WHATSAPP") || SAMPLE_COMPANY.whatsapp,
    instagram: env("NEXT_PUBLIC_INSTAGRAM") || SAMPLE_COMPANY.instagram,
    linkedin: env("NEXT_PUBLIC_LINKEDIN") || SAMPLE_COMPANY.linkedin,
    facebook: env("NEXT_PUBLIC_FACEBOOK") || SAMPLE_COMPANY.facebook,
    tiktok: env("NEXT_PUBLIC_TIKTOK") || SAMPLE_COMPANY.tiktok,
    youtube: env("NEXT_PUBLIC_YOUTUBE") || SAMPLE_COMPANY.youtube,
    heroImage: env("NEXT_PUBLIC_HERO") || SAMPLE_COMPANY.heroImage,
  };
}

function seoCopy(title: string, description: string, keywords: string): SeoCopy {
  return { title, description, keywords };
}

export function defaultSeo(): Seo {
  const arKw = "إيفنتات شركات, إنتاج إيفنتات, حفلات سنوية للشركات, تيم داي, كيك أوف, حفل جوائز موظفين";
  const enKw = "corporate events, employee events production, annual nights, team days, kickoffs, awards nights";

  return {
    siteUrl: env("NEXT_PUBLIC_SITE_URL") || SAMPLE_SITE_URL,
    siteName: "EVENTS ON",
    ogImage: "/media/work/w3.jpg",
    index: true,
    googleVerification: env("GOOGLE_SITE_VERIFICATION") || env("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"),
    pages: {
      home: {
        ar: seoCopy(
          "إيفنتات الشركات: حفلات سنوية وتيم دايز | EVENTS ON",
          "بيت إنتاج لإيفنتات موظفي الشركات: حفلات سنوية، تيم دايز، كيك أوف، وجوائز. من الموجز لحد ما القاعة تفضى.",
          arKw,
        ),
        en: seoCopy(
          "Corporate employee events | EVENTS ON",
          "EVENTS ON produces corporate events for employees: annual nights, team days, kickoffs, and awards. From the brief to a clean strike.",
          enKw,
        ),
      },
      about: {
        ar: seoCopy(
          "عن بيت إنتاج إيفنتات الشركات | EVENTS ON",
          "EVENTS ON بيت إنتاج: نكتشف الموجز، نصمم الليلة، ننفّذ، ونفك بعد آخر موظف. حفلات سنوية وتيم دايز وكيك أوف وجوائز.",
          arKw,
        ),
        en: seoCopy(
          "About the studio | EVENTS ON",
          "EVENTS ON is a production house for corporate employee events. Discover, design, produce, and strike — annual nights, team days, kickoffs, awards.",
          enKw,
        ),
      },
      services: {
        ar: seoCopy(
          "خدمات إنتاج إيفنتات الشركات | EVENTS ON",
          "إنتاج، صوت وصورة، ضيافة، ولوجستيات — فريق واحد من أول موجز لحد الفك. اطلب موجز إيفنت شركتك.",
          "إنتاج إيفنتات, صوت وصورة إيفنتات, ضيافة شركات, لوجستيات إيفنتات, " + arKw,
        ),
        en: seoCopy(
          "Corporate event production services | EVENTS ON",
          "Production, AV, hospitality, and logistics — one team from the first brief to strike. Send a short brief for your employee night.",
          "event production, AV, hospitality, event logistics, " + enKw,
        ),
      },
      work: {
        ar: seoCopy(
          "أعمال إيفنتات الشركات | EVENTS ON",
          "ليالي شركات من إنتاج EVENTS ON. شوف نوع الشغل، وبعدين ابعت موجز ليلة موظفينكم.",
          arKw,
        ),
        en: seoCopy(
          "Corporate events work | EVENTS ON",
          "Nights produced for companies. See the kind of work, then send a brief for your employee event.",
          enKw,
        ),
      },
      team: {
        ar: seoCopy(
          "فريق إنتاج الإيفنتات | EVENTS ON",
          "التيم اللي بيسلّم الليلة: إنتاج، تصميم، تصنيع، صوت وصورة، ولوجستيات.",
          arKw,
        ),
        en: seoCopy(
          "Event production team | EVENTS ON",
          "The people who deliver the night: production, design, fabrication, AV, and logistics.",
          enKw,
        ),
      },
      history: {
        ar: seoCopy(
          "قصة البيت | EVENTS ON",
          "إزاي EVENTS ON اتبنى كبيت إنتاج لإيفنتات الشركات. فصول الشغل من غير تواريخ وهمية.",
          arKw,
        ),
        en: seoCopy(
          "The house story | EVENTS ON",
          "How EVENTS ON was built as a production house for corporate employee events. Chapters of the work, without invented dates.",
          enKw,
        ),
      },
      contact: {
        ar: seoCopy(
          "اطلب موجز إيفنت شركتك | EVENTS ON",
          "ابعت المكان والتاريخ وعدد الناس. نرجع لك على الموبايل. فورم قصير أو واتساب — إنتاج إيفنتات الشركات.",
          "طلب إيفنت شركات, موجز إيفنت, تنظيم حفل شركات, " + arKw,
        ),
        en: seoCopy(
          "Send your employee event brief | EVENTS ON",
          "Place, date, and headcount is enough. We'll call the mobile you leave. A short form or WhatsApp.",
          "corporate event brief, book event production, " + enKw,
        ),
      },
    },
  };
}

function mergeCopy(base: SeoCopy, incoming?: Partial<SeoCopy>): SeoCopy {
  const legacyTitles = new Set([
    "EVENTS ON — Keep your event ON",
    "عنّا — EVENTS ON",
    "الخدمات — EVENTS ON",
    "الأعمال — EVENTS ON",
    "الفريق — EVENTS ON",
    "تاريخنا — EVENTS ON",
    "تواصل — EVENTS ON",
    "About — EVENTS ON",
    "Services — EVENTS ON",
    "Work — EVENTS ON",
    "Team — EVENTS ON",
    "History — EVENTS ON",
    "Contact — EVENTS ON",
  ]);
  const incomingTitle = incoming?.title?.trim() ?? "";
  const title = !incomingTitle || legacyTitles.has(incomingTitle) ? base.title : incomingTitle;
  const incomingDesc = incoming?.description?.trim() ?? "";
  const description = incomingDesc || base.description;
  return {
    title,
    description,
    keywords: incoming?.keywords?.trim() ? incoming.keywords : base.keywords,
  };
}

function normalizeUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function resolveSeo(incoming?: Partial<Seo> | null): Seo {
  const fallback = defaultSeo();
  const pages = { ...fallback.pages };
  for (const id of SEO_PAGES) {
    const next = incoming?.pages?.[id];
    pages[id] = {
      ar: mergeCopy(fallback.pages[id].ar, next?.ar),
      en: mergeCopy(fallback.pages[id].en, next?.en),
    };
  }
  return {
    siteUrl: normalizeUrl(incoming?.siteUrl || fallback.siteUrl),
    siteName: incoming?.siteName?.trim() || fallback.siteName,
    ogImage: incoming?.ogImage?.trim() || fallback.ogImage,
    index: incoming?.index ?? fallback.index,
    googleVerification: incoming?.googleVerification?.trim() ?? fallback.googleVerification,
    pages,
  };
}

export function defaultSite(): Site {
  return {
    company: defaultCompany(),
    seo: defaultSeo(),
    messages: {
      ar: arMessages as unknown as Record<string, unknown>,
      en: enMessages as unknown as Record<string, unknown>,
    },
    services: en.services.map((item) => {
      const localized = byId(ar.services, item.id) ?? item;
      return {
        id: item.id,
        ar: { title: localized.title, body: localized.body },
        en: { title: item.title, body: item.body },
      };
    }),
    work: en.work.map((item) => {
      const localized = byId(ar.work, item.id) ?? item;
      return {
        id: item.id,
        featured: (en.featuredWorkIds as readonly string[]).includes(item.id),
        tone: item.tone,
        image: item.image,
        ar: {
          title: localized.title,
          category: localized.category,
          venue: localized.venue,
          alt: localized.alt,
        },
        en: {
          title: item.title,
          category: item.category,
          venue: item.venue,
          alt: item.alt,
        },
      };
    }),
    team: en.team.map((item) => {
      const localized = byId(ar.team, item.id) ?? item;
      return {
        id: item.id,
        tone: item.tone,
        image: item.image,
        ar: { role: localized.role, focus: localized.focus, alt: localized.alt },
        en: { role: item.role, focus: item.focus, alt: item.alt },
      };
    }),
    history: en.history.map((item) => {
      const localized = byId(ar.history, item.id) ?? item;
      return {
        id: item.id,
        index: item.index,
        image: item.image,
        ar: { title: localized.title, body: localized.body, alt: localized.alt },
        en: { title: item.title, body: item.body, alt: item.alt },
      };
    }),
  };
}
