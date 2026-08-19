"use client";

import { useState } from "react";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { LangTabs, type AdminLang } from "@/components/admin/DualField";
import { SaveBar, useSave } from "@/components/admin/SaveBar";
import type { HistoryRecord } from "@/lib/site-types";

function nid() {
  return `h-${Math.random().toString(36).slice(2, 8)}`;
}

export function HistoryEditor({
  initial,
  save,
}: {
  initial: HistoryRecord[];
  save: (items: HistoryRecord[]) => Promise<void>;
}) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(0);
  const [lang, setLang] = useState<AdminLang>("ar");
  const status = useSave(save);

  function update(index: number, patch: Partial<HistoryRecord>) {
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
                <div className="min-w-0">
                  <p className="text-xs text-muted">{item.index}</p>
                  <p className="truncate font-medium">{item.ar.title || "فصل جديد"}</p>
                </div>
              </button>
              {expanded ? (
                <div className="grid gap-4 border-t border-line p-5">
                  <label className="grid gap-1 text-sm">
                    <span>الترتيب</span>
                    <input
                      className="admin-input max-w-24"
                      value={item.index}
                      onChange={(event) => update(index, { index: event.target.value })}
                    />
                  </label>
                  <ImagePicker value={item.image} onChange={(image) => update(index, { image })} />
                  <label className="grid gap-1 text-sm">
                    <span>العنوان</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      value={loc.title}
                      onChange={(event) => update(index, { [lang]: { ...loc, title: event.target.value } })}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>الكلام</span>
                    <textarea
                      className="admin-area"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      value={loc.body}
                      onChange={(event) => update(index, { [lang]: { ...loc, body: event.target.value } })}
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
                    امسح الفصل
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
              index: String(current.length + 1).padStart(2, "0"),
              image: "",
              ar: { title: "", body: "", alt: "" },
              en: { title: "", body: "", alt: "" },
            },
          ]);
          setOpen(items.length);
        }}
      >
        أضف فصل
      </button>
      <SaveBar pending={status.pending} saved={status.saved} error={status.error} />
    </form>
  );
}
