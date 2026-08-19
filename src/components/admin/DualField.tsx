"use client";

export type AdminLang = "ar" | "en";

export function LangTabs({
  value,
  onChange,
}: {
  value: AdminLang;
  onChange: (value: AdminLang) => void;
}) {
  return (
    <div className="admin-tabs" role="tablist" aria-label="اللغة">
      <button type="button" role="tab" aria-selected={value === "ar"} className={value === "ar" ? "is-active" : undefined} onClick={() => onChange("ar")}>
        عربي
      </button>
      <button type="button" role="tab" aria-selected={value === "en"} className={value === "en" ? "is-active" : undefined} onClick={() => onChange("en")}>
        English
      </button>
    </div>
  );
}

export function DualField({
  label,
  hint,
  ar,
  en,
  onAr,
  onEn,
  lang,
  area,
}: {
  label: string;
  hint?: string;
  ar: string;
  en: string;
  onAr: (value: string) => void;
  onEn: (value: string) => void;
  lang: AdminLang;
  area?: boolean;
}) {
  const value = lang === "ar" ? ar : en;
  const onChange = lang === "ar" ? onAr : onEn;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <label className="grid gap-2 text-sm">
      <span className="flex flex-wrap items-baseline justify-between gap-2">
        <span>{label}</span>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </span>
      {area ? (
        <textarea className="admin-area" dir={dir} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="admin-input" dir={dir} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
