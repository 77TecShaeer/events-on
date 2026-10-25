"use client";

import { useState } from "react";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { LangTabs, type AdminLang } from "@/components/admin/DualField";
import { SaveBar, useSave } from "@/components/admin/SaveBar";

function nid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

const tones = [
  { id: "pink", label: "وردي" },
  { id: "green", label: "أخضر" },
  { id: "ink", label: "أسود" },
] as const;

export function WorkEditor({
  initial,
  save,
}: {
  initial: import("@/lib/site-types").WorkRecord[];
  save: (items: import("@/lib/site-types").WorkRecord[]) => Promise<void>;
}) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(0);
  const [lang, setLang] = useState<AdminLang>("ar");
  const status = useSave(save);

  function update(index: number, patch: Partial<(typeof items)[number]>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  const featured = items.filter((item) => item.featured).length;

  return (
    <form onSubmit={(event) => status.save(items, event)}>
      <div className="mb-6 border border-line bg-elevated p-5">
        <p className="text-sm text-brand-green">Selected Work</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          المشاريع اللي معلّم عليها «ظهر على الصفحة الرئيسية» هي اللي تظهر في Selected Work. الباقي يظهر في صفحة الأعمال.
          {featured ? ` (${featured} ظاهرين على الرئيسية)` : " علّم مشروع واحد على الأقل عشان الرئيسية متبقاش فاضية."}
        </p>
      </div>
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
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.ar.title || "مشروع جديد"}</p>
                  {item.featured ? <p className="text-sm text-brand-green">ظاهر على الصفحة الرئيسية</p> : null}
                </div>
              </button>
              {expanded ? (
                <div className="grid gap-4 border-t border-line p-5">
                  <ImagePicker value={item.image} onChange={(image) => update(index, { image })} />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={item.featured}
                      onChange={(event) => update(index, { featured: event.target.checked })}
                    />
                    ظهر على الصفحة الرئيسية
                  </label>
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
                    <span>النوع</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      placeholder={lang === "ar" ? "حفل سنوي، تيم داي…" : "Annual night, team day…"}
                      value={loc.category}
                      onChange={(event) => update(index, { [lang]: { ...loc, category: event.target.value } })}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>المكان</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      placeholder={lang === "ar" ? "قاعة، مسرح…" : "Hall, stage…"}
                      value={loc.venue}
                      onChange={(event) => update(index, { [lang]: { ...loc, venue: event.target.value } })}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>لون الكارت</span>
                    <select
                      className="admin-select"
                      value={item.tone}
                      onChange={(event) => update(index, { tone: event.target.value as typeof item.tone })}
                    >
                      {tones.map((tone) => (
                        <option key={tone.id} value={tone.id}>
                          {tone.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="text-start text-sm text-brand-pink"
                    onClick={() => {
                      setItems((current) => current.filter((_, i) => i !== index));
                      setOpen(-1);
                    }}
                  >
                    امسح المشروع
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
              id: nid("w"),
              featured: false,
              tone: "ink",
              image: "",
              ar: { title: "", category: "", venue: "", alt: "" },
              en: { title: "", category: "", venue: "", alt: "" },
            },
          ]);
          setOpen(items.length);
        }}
      >
        أضف مشروع
      </button>
      <SaveBar pending={status.pending} saved={status.saved} error={status.error} />
    </form>
  );
}
