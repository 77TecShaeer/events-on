"use client";

import { useState } from "react";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { LangTabs, type AdminLang } from "@/components/admin/DualField";
import { SaveBar, useSave } from "@/components/admin/SaveBar";
import type { WorkCopy, WorkRecord, WorkVisualRecord } from "@/lib/site-types";

function nid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

const tones = [
  { id: "pink", label: "وردي" },
  { id: "green", label: "أخضر" },
  { id: "ink", label: "أسود" },
] as const;

function blankCopy(): WorkCopy {
  return { title: "", category: "", venue: "", alt: "", summary: "", brief: "", approach: "", outcome: "" };
}

function blankVisual(src = ""): WorkVisualRecord {
  return { src, ar: { alt: "", caption: "" }, en: { alt: "", caption: "" } };
}

export function WorkEditor({
  initial,
  save,
}: {
  initial: WorkRecord[];
  save: (items: WorkRecord[]) => Promise<void>;
}) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(0);
  const [lang, setLang] = useState<AdminLang>("ar");
  const status = useSave(save);

  function patch(index: number, recipe: (item: WorkRecord) => WorkRecord) {
    setItems((current) => current.map((item, i) => (i === index ? recipe(item) : item)));
  }

  function update(index: number, next: Partial<WorkRecord>) {
    patch(index, (item) => ({ ...item, ...next }));
  }

  function setCopy(index: number, key: keyof WorkCopy, value: string) {
    patch(index, (item) => ({ ...item, [lang]: { ...item[lang], [key]: value } }));
  }

  const featured = items.filter((item) => item.featured).length;

  return (
    <form onSubmit={(event) => status.save(items, event)}>
      <div className="mb-6 border border-line bg-elevated p-5">
        <p className="text-sm text-brand-green">Selected Work</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          كل مشروع كيس ستادي: القصة، المطلوب، التنفيذ، النتيجة، وأكتر من صورة. الصورة الأولى هي الغلاف. اللي معلّم عليه
          «ظهر على الصفحة الرئيسية» يظهر في Selected Work، والباقي في صفحة الأعمال.
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
          const visuals = item.visuals ?? [];
          return (
            <article key={item.id} className="border border-line bg-elevated">
              <button
                type="button"
                className="flex w-full items-center gap-4 p-4 text-start"
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.image || visuals[0]?.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image || visuals[0]?.src} alt="" className="size-14 object-cover" />
                ) : (
                  <span className="flex size-14 items-center justify-center bg-inset text-xs text-muted">صورة</span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.ar.title || "مشروع جديد"}</p>
                  <p className="text-sm text-muted">
                    {visuals.length ? `${visuals.length} صور` : "لسه من غير صور"}
                    {item.featured ? " · ظاهر على الصفحة الرئيسية" : ""}
                  </p>
                </div>
              </button>
              {expanded ? (
                <div className="grid gap-4 border-t border-line p-5">
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
                      onChange={(event) => setCopy(index, "title", event.target.value)}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>النوع</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      placeholder={lang === "ar" ? "حفل سنوي، تيم داي…" : "Annual night, team day…"}
                      value={loc.category}
                      onChange={(event) => setCopy(index, "category", event.target.value)}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>المكان</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      placeholder={lang === "ar" ? "قاعة، مسرح…" : "Hall, stage…"}
                      value={loc.venue}
                      onChange={(event) => setCopy(index, "venue", event.target.value)}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>القصة</span>
                    <textarea
                      className="admin-area"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      placeholder={lang === "ar" ? "الليلة دي كانت عن إيه، في سطرين." : "What the night was, in a few lines."}
                      value={loc.summary}
                      onChange={(event) => setCopy(index, "summary", event.target.value)}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>المطلوب</span>
                    <textarea
                      className="admin-area"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      value={loc.brief}
                      onChange={(event) => setCopy(index, "brief", event.target.value)}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>التنفيذ</span>
                    <textarea
                      className="admin-area"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      value={loc.approach}
                      onChange={(event) => setCopy(index, "approach", event.target.value)}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>النتيجة</span>
                    <textarea
                      className="admin-area"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      value={loc.outcome}
                      onChange={(event) => setCopy(index, "outcome", event.target.value)}
                    />
                  </label>
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm">صور الكيس ستادي</p>
                      <p className="mt-1 text-xs text-muted">الصورة الأولى هي الغلاف. زود صور للقاعة والمسرح والتفاصيل.</p>
                    </div>
                    {visuals.map((visual, visualIndex) => (
                      <div key={`${item.id}-visual-${visualIndex}`} className="grid gap-3 border border-line p-3">
                        <ImagePicker
                          value={visual.src}
                          onChange={(src) =>
                            patch(index, (current) => {
                              const next = current.visuals.map((entry, i) =>
                                i === visualIndex ? { ...entry, src } : entry,
                              );
                              return { ...current, visuals: next, image: next[0]?.src || "" };
                            })
                          }
                        />
                        <label className="grid gap-1 text-sm">
                          <span>وصف الصورة</span>
                          <input
                            className="admin-input"
                            dir={lang === "ar" ? "rtl" : "ltr"}
                            value={visual[lang].caption}
                            onChange={(event) =>
                              patch(index, (current) => ({
                                ...current,
                                visuals: current.visuals.map((entry, i) =>
                                  i === visualIndex
                                    ? {
                                        ...entry,
                                        [lang]: {
                                          caption: event.target.value,
                                          alt: event.target.value || entry[lang].alt,
                                        },
                                      }
                                    : entry,
                                ),
                              }))
                            }
                          />
                        </label>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <button
                            type="button"
                            className="text-muted disabled:opacity-40"
                            disabled={visualIndex === 0}
                            onClick={() =>
                              patch(index, (current) => {
                                const next = [...current.visuals];
                                const [moved] = next.splice(visualIndex, 1);
                                next.splice(visualIndex - 1, 0, moved);
                                return { ...current, visuals: next, image: next[0]?.src || "" };
                              })
                            }
                          >
                            فوق
                          </button>
                          <button
                            type="button"
                            className="text-muted disabled:opacity-40"
                            disabled={visualIndex === visuals.length - 1}
                            onClick={() =>
                              patch(index, (current) => {
                                const next = [...current.visuals];
                                const [moved] = next.splice(visualIndex, 1);
                                next.splice(visualIndex + 1, 0, moved);
                                return { ...current, visuals: next, image: next[0]?.src || "" };
                              })
                            }
                          >
                            تحت
                          </button>
                          <button
                            type="button"
                            className="text-brand-pink"
                            onClick={() =>
                              patch(index, (current) => {
                                const next = current.visuals.filter((_, i) => i !== visualIndex);
                                return { ...current, visuals: next, image: next[0]?.src || "" };
                              })
                            }
                          >
                            امسح الصورة
                          </button>
                        </div>
                      </div>
                    ))}
                    <ImagePicker
                      value=""
                      onChange={(src) =>
                        patch(index, (current) => {
                          const next = [...(current.visuals ?? []), blankVisual(src)];
                          return { ...current, visuals: next, image: next[0]?.src || "" };
                        })
                      }
                    />
                  </div>
                  <label className="grid gap-1 text-sm">
                    <span>لون الكارت</span>
                    <select
                      className="admin-select"
                      value={item.tone}
                      onChange={(event) => update(index, { tone: event.target.value as WorkRecord["tone"] })}
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
              visuals: [],
              ar: blankCopy(),
              en: blankCopy(),
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
