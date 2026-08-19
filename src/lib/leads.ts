import "server-only";

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { revalidatePath } from "next/cache";
import type { Lead } from "@/lib/site-types";

const LEADS_PATH = join(process.cwd(), "data", "leads.json");

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
  if (!existsSync(LEADS_PATH)) return [];
  try {
    const parsed = JSON.parse(readFileSync(LEADS_PATH, "utf8")) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(asLead).filter((item): item is Lead => Boolean(item));
  } catch {
    return [];
  }
}

export function writeLeads(leads: Lead[]) {
  mkdirSync(dirname(LEADS_PATH), { recursive: true });
  const tmp = `${LEADS_PATH}.${process.pid}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
  renameSync(tmp, LEADS_PATH);
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
