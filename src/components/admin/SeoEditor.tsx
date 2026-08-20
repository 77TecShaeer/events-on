"use client";

import { useMemo, useState } from "react";
import { saveSeoAction } from "@/app/admin/actions";
import { DualField, LangTabs, type AdminLang } from "@/components/admin/DualField";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { SaveBar, useSave } from "@/components/admin/SaveBar";
import { defaultSeo } from "@/lib/site-defaults";
import { SEO_PAGES, SEO_PAGE_META, type Seo, type SeoPageId } from "@/lib/site-types";
import clsx from "clsx";

function count(value: string) {
  return value.trim().length;
}

function CountHint({ value, min, max, unit }: { value: string; min: number; max: number; unit: string }) {
  const n = count(value);
  const tone = n === 0 ? "muted" : n < min ? "warn" : n > max ? "warn" : "ok";
  return (
    <span className={clsx("seo-count", `is-${tone}`)}>
      {n} {unit} — الأفضل {min}–{max}
    </span>
  );
}

export function SeoEditor({ initial }: { initial: Seo }) {
  const [seo, setSeo] = useState(initial);
  const [lang, setLang] = useState<AdminLang>("ar");
  const [page, setPage] = useState<SeoPageId>("home");
  const { saved, error, pending, save } = useSave(saveSeoAction);
  const current = seo.pages[page][lang];
  const recommended = defaultSeo().pages[page];

  const host = (seo.siteUrl || "events-on.com").replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const path = lang === "ar" ? `/ar${SEO_PAGE_META[page].path}` : `/en${SEO_PAGE_META[page].path}`;

  const checks = useMemo(() => {
    const items: Array<{ ok: boolean; text: string }> = [
      { ok: Boolean(seo.siteUrl), text: seo.siteUrl ? "رابط الموقع متسجل — السايتماب يقدر يشتغل." : "حط رابط الموقع على الإنترنت. من غيره جوجل مش هيلاقي السايتماب." },
      { ok: seo.index, text: seo.index ? "الموقع مفتوح لجوجل." : "الظهور في جوجل مقفول. فعّله تحت." },
      { ok: Boolean(seo.googleVerification), text: seo.googleVerification ? "كود سيرش كونسول موجود." : "اربط Google Search Console بالكود. من غيره مش هتشوف الكلمات اللي جابتك." },
      { ok: Boolean(seo.ogImage), text: "صورة المشاركة جاهزة لواتساب ولينكدإن." },
    ];
    return items;
  }, [seo.googleVerification, seo.index, seo.ogImage, seo.siteUrl]);

  function patchPage(locale: "ar" | "en", key: "title" | "description" | "keywords", value: string) {
    setSeo((currentSeo) => ({
      ...currentSeo,
      pages: {
        ...currentSeo.pages,
        [page]: {
          ...currentSeo.pages[page],
          [locale]: { ...currentSeo.pages[page][locale], [key]: value },
        },
      },
    }));
  }

  function useRecommended() {
    setSeo((currentSeo) => ({
      ...currentSeo,
      pages: { ...currentSeo.pages, [page]: recommended },
    }));
  }

  return (
    <form onSubmit={(event) => save(seo, event)} className="grid gap-8">
      <ul className="grid gap-2 border border-line bg-elevated p-4 text-sm">
        {checks.map((item) => (
          <li key={item.text} className={item.ok ? "text-muted" : "text-brand-pink"}>
            {item.ok ? "• " : "! "}
            {item.text}
          </li>
        ))}
      </ul>

      <section className="grid gap-5 border border-line bg-elevated p-5 sm:p-6">
        <div>
          <h2 className="font-display text-2xl">عشان جوجل يلاقي الموقع</h2>
          <p className="mt-2 text-sm text-muted">الرابط والكود أهم من أي كلمة مفتاحية. من غيرهم العنوان لوحده مش كفاية.</p>
        </div>
        <label className="grid gap-1 text-sm">
          <span>رابط الموقع على الإنترنت</span>
          <input
            className="admin-input"
            dir="ltr"
            placeholder="https://events-on.com"
            value={seo.siteUrl}
            onChange={(event) => setSeo((currentSeo) => ({ ...currentSeo, siteUrl: event.target.value }))}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span>كود Google Search Console</span>
          <input
            className="admin-input"
            dir="ltr"
            placeholder="الصق الكود من جوجل هنا"
            value={seo.googleVerification}
            onChange={(event) => setSeo((currentSeo) => ({ ...currentSeo, googleVerification: event.target.value }))}
          />
          <span className="text-xs text-muted">من Search Console → ملكية الموقع → HTML tag. حط القيمة اللي جوه content بس.</span>
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={seo.index}
            onChange={(event) => setSeo((currentSeo) => ({ ...currentSeo, index: event.target.checked }))}
          />
          <span>خلّي الموقع يظهر في جوجل</span>
        </label>
      </section>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-xl text-sm text-muted">اختار الصفحة، اكتب العنوان والجملة. ده اللي الناس بتشوفه في نتيجة البحث.</p>
        <LangTabs value={lang} onChange={setLang} />
      </div>

      <div className="admin-pills">
        {SEO_PAGES.map((id) => (
          <button
            key={id}
            type="button"
            className={page === id ? "is-active" : undefined}
            onClick={() => setPage(id)}
          >
            {SEO_PAGE_META[id].label}
          </button>
        ))}
      </div>

      <div className="seo-preview" dir={lang === "ar" ? "rtl" : "ltr"}>
        <p className="seo-preview-url">{host}{path}</p>
        <p className="seo-preview-title">{current.title || "العنوان هيظهر هنا"}</p>
        <p className="seo-preview-desc">{current.description || "الجملة اللي تحت العنوان في جوجل."}</p>
      </div>

      <div className="grid gap-5 border border-line bg-elevated p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">{SEO_PAGE_META[page].hint}</p>
          <button type="button" className="text-sm text-brand-green" onClick={useRecommended}>
            استخدم النص الجاهز للبحث
          </button>
        </div>
        <label className="grid gap-2 text-sm">
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span>العنوان في جوجل</span>
            <CountHint value={current.title} min={45} max={65} unit="حرف" />
          </span>
          <input
            className="admin-input"
            dir={lang === "ar" ? "rtl" : "ltr"}
            value={current.title}
            onChange={(event) => patchPage(lang, "title", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span>الجملة اللي تحت العنوان</span>
            <CountHint value={current.description} min={140} max={165} unit="حرف" />
          </span>
          <textarea
            className="admin-area"
            dir={lang === "ar" ? "rtl" : "ltr"}
            value={current.description}
            onChange={(event) => patchPage(lang, "description", event.target.value)}
          />
        </label>
        <DualField
          label="كلمات الناس بتدور بيها"
          hint="فاصلة بين كل كلمة. مش أهم حاجة، بس بتساعدكم تفتكروا النية."
          lang={lang}
          ar={seo.pages[page].ar.keywords}
          en={seo.pages[page].en.keywords}
          onAr={(value) => patchPage("ar", "keywords", value)}
          onEn={(value) => patchPage("en", "keywords", value)}
        />
      </div>

      <section className="grid gap-5 border border-line bg-elevated p-5 sm:p-6">
        <div>
          <h2 className="font-display text-2xl">صورة المشاركة</h2>
          <p className="mt-2 text-sm text-muted">لما حد يبعت لينك الموقع على واتساب أو لينكدإن.</p>
        </div>
        <ImagePicker value={seo.ogImage} onChange={(ogImage) => setSeo((currentSeo) => ({ ...currentSeo, ogImage }))} />
      </section>

      <details className="admin-extra">
        <summary>الاسم اللي يظهر مع اللينك</summary>
        <label className="mt-5 grid gap-1 text-sm">
          <span>اسم الاستوديو</span>
          <input
            className="admin-input"
            dir="ltr"
            value={seo.siteName}
            onChange={(event) => setSeo((currentSeo) => ({ ...currentSeo, siteName: event.target.value }))}
          />
        </label>
      </details>

      <SaveBar pending={pending} saved={saved} error={error} />
    </form>
  );
}
