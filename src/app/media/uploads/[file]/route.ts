import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { uploadsDir } from "@/lib/persist";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const name = file.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!name) return new Response("Not found", { status: 404 });
  const path = join(uploadsDir(), name);
  if (!existsSync(path)) return new Response("Not found", { status: 404 });
  const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
  return new Response(readFileSync(path), {
    headers: {
      "Content-Type": TYPES[ext] || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
