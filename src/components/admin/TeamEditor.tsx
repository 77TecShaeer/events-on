"use client";

import { useState } from "react";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { LangTabs, type AdminLang } from "@/components/admin/DualField";
import { SaveBar, useSave } from "@/components/admin/SaveBar";
import type { TeamRecord } from "@/lib/site-types";

function nid() {
  return `t-${Math.random().toString(36).slice(2, 8)}`;
}

export function TeamEditor({
  initial,
  save,
}: {
  initial: TeamRecord[];
  save: (items: TeamRecord[]) => Promise<void>;
}) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(0);
  const [lang, setLang] = useState<AdminLang>("ar");
  const status = useSave(save);

  function update(index: number, patch: Partial<TeamRecord>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  return (
    <form onSubmit={(event) => status.save(items, event)}>
      <div className="mb-5 flex justify-end">
        <LangTabs value={lang} onChange={setLang} />
      </div>
      <div className="grid gap-3">
        {items.map((item, index) => {
          const expanded = open === index;
          const loc = item[lang];
          return (
            <article key={item.id} className="border border-line bg-elevated">
              <button
                type="button"
                className="flex w-full items-center gap-4 p-4 text-start"
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="size-14 object-cover" />
                ) : (
                  <span className="flex size-14 items-center justify-center bg-inset text-xs text-muted">صورة</span>
                )}
                <p className="truncate font-medium">{item.ar.role || "دور جديد"}</p>
              </button>
              {expanded ? (
                <div className="grid gap-4 border-t border-line p-5">
                  <ImagePicker value={item.image} onChange={(image) => update(index, { image })} />
                  <label className="grid gap-1 text-sm">
                    <span>الدور</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      placeholder={lang === "ar" ? "إنتاج، تصميم…" : "Production, design…"}
                      value={loc.role}
                      onChange={(event) => update(index, { [lang]: { ...loc, role: event.target.value } })}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>جملة قصيرة عنه</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      value={loc.focus}
                      onChange={(event) => update(index, { [lang]: { ...loc, focus: event.target.value } })}
                    />
                  </label>
                  <button
                    type="button"
                    className="text-start text-sm text-brand-pink"
                    onClick={() => {
                      setItems((current) => current.filter((_, i) => i !== index));
                      setOpen(-1);
                    }}
                  >
                    امسح الدور
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-secondary btn-sm mt-6"
        onClick={() => {
          setItems((current) => [
            ...current,
            {
              id: nid(),
              tone: "ink",
              image: "",
              ar: { role: "", focus: "", alt: "" },
              en: { role: "", focus: "", alt: "" },
            },
          ]);
          setOpen(items.length);
        }}
      >
        أضف دور
      </button>
      <SaveBar pending={status.pending} saved={status.saved} error={status.error} />
    </form>
  );
}
