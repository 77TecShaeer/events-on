"use server";

import { redirect } from "next/navigation";
import type { SiteMessages } from "@/lib/site-types";
import {
  adminConfigured,
  clearAdminSession,
  createAdminSession,
  credentialsMatch,
  requireAdmin,
} from "@/lib/admin-auth";
import { listMedia, saveUpload } from "@/lib/media";
import { addLead, patchLead, removeLead } from "@/lib/leads";
import { validateBrief } from "@/lib/brief";
import { readSite, revalidateSite, writeSite } from "@/lib/site";
import type {
  Company,
  HistoryRecord,
  Seo,
  ServiceRecord,
  TeamRecord,
  WorkRecord,
} from "@/lib/site-types";
import { resolveSeo } from "@/lib/site-defaults";

export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  if (!adminConfigured()) {
    return { error: "حط ADMIN_EMAIL و ADMIN_PASSWORD في .env.local بعدين شغّل السيرفر تاني." };
  }
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!credentialsMatch(email, password)) {
    return { error: "الإيميل أو كلمة السر غلط." };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

function clip(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitLeadAction(_prev: { ok?: boolean; error?: string } | null, formData: FormData) {
  if (clip(formData.get("website"), 200)) {
    return { ok: true };
  }

  const { issues, values } = validateBrief({
    name: clip(formData.get("name"), 80),
    company: clip(formData.get("company"), 80),
    email: clip(formData.get("email"), 120),
    phone: clip(formData.get("phone"), 24),
    message: clip(formData.get("message"), 2000),
  });
  const locale = clip(formData.get("locale"), 8) === "en" ? "en" : "ar";

  if (!values) {
    if (issues.phone === "required") return { error: locale === "en" ? "Mobile number is required." : "رقم الموبايل مطلوب." };
    if (issues.phone) return { error: locale === "en" ? "Enter a valid mobile number." : "رقم الموبايل مش مظبوط." };
    return { error: locale === "en" ? "Check the fields and try again." : "راجع الخانات وجرّب تاني." };
  }

  try {
    addLead({
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      message: values.message,
      locale,
      read: false,
      contacted: false,
      contactedAt: "",
      notes: "",
    });
  } catch {
    return { error: "الطلب ما اتسجلش. جرّب واتساب." };
  }

  return { ok: true };
}

export async function setLeadReadAction(id: string, read: boolean) {
  await requireAdmin();
  patchLead(id, { read });
}

export async function setLeadContactedAction(id: string, contacted: boolean) {
  await requireAdmin();
  patchLead(id, { contacted });
}

export async function saveLeadNotesAction(id: string, notes: string) {
  await requireAdmin();
  patchLead(id, { notes: notes.trim().slice(0, 2000) });
}

export async function deleteLeadAction(id: string) {
  await requireAdmin();
  removeLead(id);
}

export async function saveCompanyAction(company: Company) {
  await requireAdmin();
  const site = readSite();
  site.company = {
    email: company.email.trim(),
    whatsapp: company.whatsapp.replace(/\D/g, ""),
    instagram: company.instagram.trim(),
    linkedin: company.linkedin.trim(),
    facebook: company.facebook.trim(),
    tiktok: company.tiktok.trim(),
    youtube: company.youtube.trim(),
    heroImage: company.heroImage.trim() || "/media/work/w3.jpg",
  };
  writeSite(site);
  revalidateSite();
}

export async function saveSeoAction(incoming: Seo) {
  await requireAdmin();
  const site = readSite();
  const seo = resolveSeo(incoming);
  site.seo = seo;
  const arMeta = site.messages.ar.meta;
  const enMeta = site.messages.en.meta;
  if (arMeta && typeof arMeta === "object") {
    site.messages.ar = {
      ...site.messages.ar,
      meta: {
        ...(arMeta as Record<string, unknown>),
        title: seo.pages.home.ar.title,
        description: seo.pages.home.ar.description,
      },
    };
  }
  if (enMeta && typeof enMeta === "object") {
    site.messages.en = {
      ...site.messages.en,
      meta: {
        ...(enMeta as Record<string, unknown>),
        title: seo.pages.home.en.title,
        description: seo.pages.home.en.description,
      },
    };
  }
  writeSite(site);
  revalidateSite();
}

export async function saveMessagesAction(messages: SiteMessages) {
  await requireAdmin();
  const site = readSite();
  site.messages = messages;
  writeSite(site);
  revalidateSite();
}

export async function saveServicesAction(services: ServiceRecord[]) {
  await requireAdmin();
  const site = readSite();
  site.services = services;
  writeSite(site);
  revalidateSite();
}

export async function saveWorkAction(work: WorkRecord[]) {
  await requireAdmin();
  const site = readSite();
  site.work = work;
  writeSite(site);
  revalidateSite();
}

export async function saveTeamAction(team: TeamRecord[]) {
  await requireAdmin();
  const site = readSite();
  site.team = team;
  writeSite(site);
  revalidateSite();
}

export async function saveHistoryAction(history: HistoryRecord[]) {
  await requireAdmin();
  const site = readSite();
  site.history = history;
  writeSite(site);
  revalidateSite();
}

export async function uploadMediaAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("اختار صورة");
  }
  const path = await saveUpload(file);
  revalidateSite();
  return path;
}

export async function mediaLibraryAction() {
  await requireAdmin();
  return listMedia();
}
