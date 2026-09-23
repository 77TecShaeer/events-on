import "server-only";

import { revalidatePath } from "next/cache";
import { readJson, remember, remembered, writeJson } from "@/lib/persist";
import type { Lead } from "@/lib/site-types";

export type LeadPatch = Partial<Pick<Lead, "read" | "contacted" | "contactedAt" | "notes">>;

function asLead(value: unknown): Lead | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== "string" || !item.id) return null;
  return {
    id: item.id,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : "",
    name: typeof item.name === "string" ? item.name : "",
    company: typeof item.company === "string" ? item.company : "",
    email: typeof item.email === "string" ? item.email : "",
    phone: typeof item.phone === "string" ? item.phone : "",
    message: typeof item.message === "string" ? item.message : "",
    locale: item.locale === "en" ? "en" : "ar",
    read: Boolean(item.read),
    contacted: Boolean(item.contacted),
    contactedAt: typeof item.contactedAt === "string" ? item.contactedAt : "",
    notes: typeof item.notes === "string" ? item.notes : "",
  };
}

export function readLeads(): Lead[] {
  const cached = remembered("leads");
  if (Array.isArray(cached)) return cached as Lead[];
  const parsed = readJson<unknown>("leads.json", []);
  const leads = Array.isArray(parsed) ? parsed.map(asLead).filter((item): item is Lead => Boolean(item)) : [];
  remember("leads", leads);
  return leads;
}

export function writeLeads(leads: Lead[]) {
  remember("leads", leads);
  writeJson("leads.json", leads);
}

export function addLead(lead: Lead) {
  writeLeads([lead, ...readLeads()].slice(0, 500));
  revalidatePath("/admin", "layout");
}

export function unreadLeadCount() {
  return readLeads().filter((lead) => !lead.read && !lead.contacted).length;
}

export function patchLead(id: string, patch: LeadPatch) {
  writeLeads(
    readLeads().map((lead) => {
      if (lead.id !== id) return lead;
      const next: Lead = { ...lead, ...patch };
      if (patch.contacted === true) {
        next.read = true;
        next.contactedAt = patch.contactedAt || new Date().toISOString();
      }
      if (patch.contacted === false) {
        next.contactedAt = "";
      }
      return next;
    }),
  );
  revalidatePath("/admin", "layout");
}

export function removeLead(id: string) {
  writeLeads(readLeads().filter((lead) => lead.id !== id));
  revalidatePath("/admin", "layout");
}
