import "server-only";

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { extname, join } from "path";
import { uploadsDir } from "@/lib/persist";

const PUBLIC_MEDIA = join(process.cwd(), "public", "media");
const PUBLIC_UPLOADS = join(PUBLIC_MEDIA, "uploads");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function collect(dir: string, prefix: string, out: string[]) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const next = join(dir, entry.name);
    const web = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) collect(next, web, out);
    else if (ALLOWED.has(extname(entry.name).toLowerCase())) out.push(web);
  }
}

export function listMedia(): string[] {
  const out: string[] = [];
  collect(PUBLIC_MEDIA, "/media", out);
  collect(uploadsDir(), "/media/uploads", out);
  return [...new Set(out)].sort();
}

export async function saveUpload(file: File) {
  const ext = extname(file.name).toLowerCase();
  if (!ALLOWED.has(ext) || ext === ".svg") {
    throw new Error("نوع الصورة غير مسموح");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("الصورة أكبر من 8 ميجا");
  }
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  const name = `${Date.now()}-${safe}`.slice(0, 120);
  const buffer = Buffer.from(await file.arrayBuffer());
  const durable = join(uploadsDir(), name);
  writeFileSync(durable, buffer);
  try {
    mkdirSync(PUBLIC_UPLOADS, { recursive: true });
    writeFileSync(join(PUBLIC_UPLOADS, name), buffer);
  } catch {
    /* Hostinger may lock public/; the /media/uploads route still serves the file. */
  }
  return `/media/uploads/${name}`;
}
