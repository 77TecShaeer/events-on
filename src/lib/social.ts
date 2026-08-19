import "server-only";

import { readSite, resolveCompany } from "@/lib/site";

export type SocialId =
  | "instagram"
  | "linkedin"
  | "facebook"
  | "tiktok"
  | "youtube";

export type SocialNetwork = {
  id: SocialId;
  href: string | null;
};

function href(value: string) {
  return value.trim() ? value.trim() : null;
}

export function getSocial(): SocialNetwork[] {
  const company = resolveCompany(readSite().company);
  return [
    { id: "instagram", href: href(company.instagram) },
    { id: "linkedin", href: href(company.linkedin) },
    { id: "facebook", href: href(company.facebook) },
    { id: "tiktok", href: href(company.tiktok) },
    { id: "youtube", href: href(company.youtube) },
  ];
}

export function companyEmail() {
  return href(resolveCompany(readSite().company).email);
}

export function socialHref(id: SocialId) {
  return getSocial().find((network) => network.id === id)?.href ?? null;
}

export function whatsappDigits() {
  return resolveCompany(readSite().company).whatsapp.replace(/\D/g, "");
}

export function displayPhone() {
  const digits = whatsappDigits();
  return digits ? `+${digits}` : null;
}
