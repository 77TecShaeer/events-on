"use client";

import { useState } from "react";
import { LangTabs, type AdminLang } from "@/components/admin/DualField";
import { SaveBar, useSave } from "@/components/admin/SaveBar";
import type { ServiceRecord } from "@/lib/site-types";

const icons = [
  { id: "events", label: "إيفنتات" },
  { id: "exhibitions", label: "حفلات سنوية" },
  { id: "booths", label: "تيم داي" },
  { id: "conference", label: "كيك أوف" },
  { id: "management", label: "إدارة إيفنت" },
  { id: "hospitality", label: "ضيافة" },
  { id: "production", label: "إنتاج" },
  { id: "stage", label: "مسرح" },
  { id: "av", label: "صوت وصورة" },
  { id: "led", label: "شاشات" },
  { id: "lighting", label: "إضاءة" },
  { id: "fabrication", label: "تصنيع" },
  { id: "installation", label: "تركيب" },
  { id: "projects", label: "إدارة مشروع" },
  { id: "structure", label: "إنشاءات" },
  { id: "printing", label: "طباعة" },
  { id: "signage", label: "لافتات" },
  { id: "branding", label: "براندنج" },
  { id: "logistics", label: "لوجستيات" },
  { id: "transport", label: "نقل" },
  { id: "warehouse", label: "مخزن" },
  { id: "packaging", label: "تغليف" },
  { id: "registration", label: "تسجيل" },
  { id: "maintenance", label: "صيانة" },
];

export function ServicesEditor({
  initial,
  save,
}: {
  initial: ServiceRecord[];
  save: (items: ServiceRecord[]) => Promise<void>;
}) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(0);
  const [lang, setLang] = useState<AdminLang>("ar");
  const status = useSave(save);

  function update(index: number, patch: Partial<ServiceRecord>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  return (
    <form onSubmit={(event) => status.save(items, event)}>
      <div className="mb-6 border border-line bg-elevated p-5">
        <p className="text-sm text-brand-green">Services</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          كل الخدمات هنا تظهر في صفحة الخدمات. الرئيسية بتاخد أول أربع خدمات بس كعيّنة.
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
            <article key={`${item.id}-${index}`} className="border border-line bg-elevated">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-4 text-start"
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                <span className="font-medium">{item.ar.title || "خدمة جديدة"}</span>
                <span className="text-sm text-muted">{icons.find((icon) => icon.id === item.id)?.label}</span>
              </button>
              {expanded ? (
                <div className="grid gap-4 border-t border-line p-5">
                  <label className="grid gap-1 text-sm">
                    <span>شكل الأيقونة</span>
                    <select
                      className="admin-select"
                      value={item.id}
                      onChange={(event) => update(index, { id: event.target.value })}
                    >
                      {icons.map((icon) => (
                        <option key={icon.id} value={icon.id}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>الاسم</span>
                    <input
                      className="admin-input"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      value={loc.title}
                      onChange={(event) => update(index, { [lang]: { ...loc, title: event.target.value } })}
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span>الشرح</span>
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
                    امسح الخدمة
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
          setItems((current) => [...current, { id: "events", ar: { title: "", body: "" }, en: { title: "", body: "" } }]);
          setOpen(items.length);
        }}
      >
        أضف خدمة
      </button>
      <SaveBar pending={status.pending} saved={status.saved} error={status.error} />
    </form>
  );
}
