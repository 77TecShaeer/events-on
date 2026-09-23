import "server-only";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir, tmpdir } from "os";
import { join } from "path";

type Bag = {
  dir?: string;
  site?: unknown;
  leads?: unknown;
};

const g = globalThis as typeof globalThis & { __eventsOn?: Bag };

function bag(): Bag {
  if (!g.__eventsOn) g.__eventsOn = {};
  return g.__eventsOn;
}

function writable(dir: string) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, ".writable"), "1");
  return dir;
}

export function dataDir() {
  const current = bag();
  if (current.dir && existsSync(current.dir)) return current.dir;

  const candidates = [
    process.env.DATA_DIR?.trim(),
    join(homedir(), "events-on-data"),
    join(process.cwd(), "data"),
    join(process.cwd(), ".data"),
    join(tmpdir(), "events-on-data"),
  ].filter(Boolean) as string[];

  let lastError: unknown;
  for (const dir of candidates) {
    try {
      current.dir = writable(dir);
      migrateFromRepo(dir);
      return dir;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("التعذر كتابة الملف. الداشبورد بتحتاج سيرفر يقدر يحفظ على الديسك.");
}

function migrateFromRepo(dir: string) {
  for (const name of ["site.json", "leads.json"] as const) {
    const dest = join(dir, name);
    const source = join(process.cwd(), "data", name);
    if (existsSync(dest) || !existsSync(source) || source === dest) continue;
    writeFileSync(dest, readFileSync(source));
  }
}

export function readJson<T>(name: string, fallback: T): T {
  try {
    const path = join(dataDir(), name);
    if (!existsSync(path)) return fallback;
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(name: string, value: unknown) {
  const path = join(dataDir(), name);
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function remember<K extends keyof Bag>(key: K, value: Bag[K]) {
  bag()[key] = value;
}

export function remembered<K extends keyof Bag>(key: K): Bag[K] {
  return bag()[key];
}

export function uploadsDir() {
  const dir = join(dataDir(), "uploads");
  mkdirSync(dir, { recursive: true });
  return dir;
}
