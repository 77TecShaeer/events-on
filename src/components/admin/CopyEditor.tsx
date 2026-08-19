"use client";

import { useMemo, useState } from "react";
import { saveMessagesAction } from "@/app/admin/actions";
import { DualField, LangTabs, type AdminLang } from "@/components/admin/DualField";
import { SaveBar, useSave } from "@/components/admin/SaveBar";
import { COPY_SECTIONS, type CopyField } from "@/lib/copy-fields";
import type { SiteMessages } from "@/lib/site-types";

function getPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

function setPath(source: unknown, path: string[], value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(source)) {
    const next = [...source];
    const index = Number(head);
    next[index] = setPath(next[index], rest, value);
    return next;
  }
  const record = { ...((source as Record<string, unknown>) ?? {}) };
  record[head] = setPath(record[head], rest, value);
  return record;
}

function asText(value: unknown, list?: boolean) {
  if (list && Array.isArray(value)) return value.map(String).join("\n");
  return typeof value === "string" ? value : "";
}

function matches(field: CopyField, ar: string, en: string, query: string) {
  if (!query) return true;
  return `${field.label} ${field.hint ?? ""} ${ar} ${en}`.toLowerCase().includes(query.toLowerCase());
}

export function CopyEditor({ initial }: { initial: SiteMessages }) {
  const [ar, setAr] = useState(initial.ar);
  const [en, setEn] = useState(initial.en);
  const [lang, setLang] = useState<AdminLang>("ar");
  const [sectionId, setSectionId] = useState("home");
  const [query, setQuery] = useState("");
  const [showExtra, setShowExtra] = useState(false);
  const { saved, error, pending, save } = useSave(saveMessagesAction);

  function patchAr(path: string, value: unknown) {
    setAr((current) => setPath(current, path.split("."), value) as Record<string, unknown>);
  }
  function patchEn(path: string, value: unknown) {
    setEn((current) => setPath(current, path.split("."), value) as Record<string, unknown>);
  }

  const visible = useMemo(() => {
    const q = query.trim();
    return COPY_SECTIONS.filter((section) => showExtra || !section.extra).map((section) => ({
      ...section,
      fields: section.fields.filter((field) => {
        if (!showExtra && field.extra) return false;
        return matches(
          field,
          asText(getPath(ar, field.path), field.list),
          asText(getPath(en, field.path), field.list),
          q,
        );
      }),
    })).filter((section) => section.fields.length);
  }, [ar, en, query, showExtra]);

  const active = visible.find((section) => section.id === sectionId) ?? visible[0];

  const groups = active
    ? active.fields.reduce<Array<{ name: string; fields: CopyField[] }>>((acc, field) => {
        const name = field.group ?? "";
        const last = acc[acc.length - 1];
        if (last && last.name === name) last.fields.push(field);
        else acc.push({ name, fields: [field] });
        return acc;
      }, [])
    : [];

  return (
    <form onSubmit={(event) => save({ ar, en }, event)}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          className="admin-input max-w-md"
          placeholder="دور على كلمة…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <LangTabs value={lang} onChange={setLang} />
      </div>

      <div className="admin-pills mb-6">
        {visible.map((section) => (
          <button
            key={section.id}
            type="button"
            className={active?.id === section.id ? "is-active" : undefined}
            onClick={() => setSectionId(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {active ? (
        <div className="grid gap-8">
          {active.hint ? <p className="text-sm text-muted">{active.hint}</p> : null}
          {groups.map((group) => (
            <div key={group.name || "main"} className="grid gap-5 border border-line bg-elevated p-5 sm:p-6">
              {group.name ? <h2 className="font-display text-xl">{group.name}</h2> : null}
              {group.fields.map((field) => (
                <DualField
                  key={field.path}
                  label={field.label}
                  hint={field.hint}
                  lang={lang}
                  area={field.area || field.list}
                  ar={asText(getPath(ar, field.path), field.list)}
                  en={asText(getPath(en, field.path), field.list)}
                  onAr={(value) =>
                    patchAr(field.path, field.list ? value.split("\n").map((line) => line.trim()).filter(Boolean) : value)
                  }
                  onEn={(value) =>
                    patchEn(field.path, field.list ? value.split("\n").map((line) => line.trim()).filter(Boolean) : value)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">مفيش حاجة بالكلمة دي.</p>
      )}

      <button type="button" className="mt-8 text-sm text-muted" onClick={() => setShowExtra((value) => !value)}>
        {showExtra ? "خبّي التفاصيل الزيادة" : "تفاصيل زيادة"}
      </button>

      <SaveBar pending={pending} saved={saved} error={error} />
    </form>
  );
}
