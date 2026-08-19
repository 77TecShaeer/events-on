import type { Service, WorkItem, TeamMember, HistoryBeat } from "@/content/en";

export type Tone = "pink" | "green" | "ink";

export type Company = {
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  heroImage: string;
};

export type ServiceRecord = {
  id: string;
  ar: { title: string; body: string };
  en: { title: string; body: string };
};

export type WorkRecord = {
  id: string;
  featured: boolean;
  tone: Tone;
  image: string;
  ar: { title: string; category: string; venue: string; alt: string };
  en: { title: string; category: string; venue: string; alt: string };
};

export type TeamRecord = {
  id: string;
  tone: Tone;
  image: string;
  ar: { role: string; focus: string; alt: string };
  en: { role: string; focus: string; alt: string };
};

export type HistoryRecord = {
  id: string;
  index: string;
  image: string;
  ar: { title: string; body: string; alt: string };
  en: { title: string; body: string; alt: string };
};

export type SiteMessages = {
  ar: Record<string, unknown>;
  en: Record<string, unknown>;
};

export const SEO_PAGES = ["home", "about", "services", "work", "team", "history", "contact"] as const;
export type SeoPageId = (typeof SEO_PAGES)[number];

export const SEO_PAGE_META: Record<SeoPageId, { path: string; label: string; hint: string }> = {
  home: { path: "", label: "الرئيسية", hint: "أول نتيجة لما حد يدور على الاسم." },
  about: { path: "/about", label: "عنّا", hint: "صفحة الاستوديو." },
  services: { path: "/services", label: "الخدمات", hint: "إيه اللي بتسلّموه." },
  work: { path: "/work", label: "الأعمال", hint: "معرض الشغل." },
  team: { path: "/team", label: "الفريق", hint: "الناس اللي بتسلّم الليلة." },
  history: { path: "/history", label: "التاريخ", hint: "قصة البيت." },
  contact: { path: "/contact", label: "تواصل", hint: "صفحة الموجز والواتساب." },
};

export type SeoCopy = {
  title: string;
  description: string;
  keywords: string;
};

export type SeoPage = {
  ar: SeoCopy;
  en: SeoCopy;
};

export type Seo = {
  siteUrl: string;
  siteName: string;
  ogImage: string;
  index: boolean;
  googleVerification: string;
  pages: Record<SeoPageId, SeoPage>;
};

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
  read: boolean;
  contacted: boolean;
  contactedAt: string;
  notes: string;
};

export type Site = {
  company: Company;
  seo: Seo;
  messages: SiteMessages;
  services: ServiceRecord[];
  work: WorkRecord[];
  team: TeamRecord[];
  history: HistoryRecord[];
};

export type LocaleCatalog = {
  services: Service[];
  work: WorkItem[];
  featuredWorkIds: string[];
  team: TeamMember[];
  history: HistoryBeat[];
  company: Company;
};
