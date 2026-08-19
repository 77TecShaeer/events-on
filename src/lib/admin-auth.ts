import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "events_on_admin";
const WEEK = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SECRET?.trim() || process.env.ADMIN_PASSWORD?.trim() || "";
}

export function adminConfigured() {
  return Boolean(adminEmail() && process.env.ADMIN_PASSWORD?.trim());
}

export function adminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function same(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function isAdmin() {
  if (!secret()) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!same(mac, sign(exp))) return false;
  return Date.now() < Number(exp);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function createAdminSession() {
  const exp = String(Date.now() + WEEK * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE);
}

export function credentialsMatch(email: string, password: string) {
  const expectedEmail = adminEmail();
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim() ?? "";
  if (!expectedEmail || !expectedPassword) return false;
  const emailOk = same(sign(`em:${email.trim().toLowerCase()}`), sign(`em:${expectedEmail}`));
  const passwordOk = same(sign(`pw:${password}`), sign(`pw:${expectedPassword}`));
  return emailOk && passwordOk;
}
