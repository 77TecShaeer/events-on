import "server-only";

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { extname, join } from "path";

const MEDIA_ROOT = join(process.cwd(), "public", "media");
const UPLOADS = join(MEDIA_ROOT, "uploads");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

export function listMedia(): string[] {
  if (!existsSync(MEDIA_ROOT)) return [];
  const out: string[] = [];

  function walk(dir: string, prefix: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const next = join(dir, entry.name);
      const web = `${prefix}/${entry.name}`;
      if (entry.isDirectory()) walk(next, web);
      else if (ALLOWED.has(extname(entry.name).toLowerCase())) out.push(web);
    }
  }

  walk(MEDIA_ROOT, "/media");
  return out.sort();
}

export async function saveUpload(file: File) {
  const ext = extname(file.name).toLowerCase();
  if (!ALLOWED.has(ext) || ext === ".svg") {
    throw new Error("نوع الصورة غير مسموح");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("الصورة أكبر من 8 ميجا");
  }
  mkdirSync(UPLOADS, { recursive: true });
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  const name = `${Date.now()}-${safe}`.slice(0, 120);
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(join(UPLOADS, name), buffer);
  return `/media/uploads/${name}`;
}
