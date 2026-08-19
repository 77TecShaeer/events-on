"use client";

import { useState } from "react";
import { saveCompanyAction } from "@/app/admin/actions";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { SaveBar, useSave } from "@/components/admin/SaveBar";
import type { Company } from "@/lib/site-types";

export function SettingsForm({ initial }: { initial: Company }) {
  const [company, setCompany] = useState(initial);
  const { saved, error, pending, save } = useSave(saveCompanyAction);

  function set<K extends keyof Company>(key: K, value: Company[K]) {
    setCompany((current) => ({ ...current, [key]: value }));
  }

  return (
    <form onSubmit={(event) => save(company, event)} className="grid max-w-2xl gap-8">
      <section className="grid gap-5 border border-line bg-elevated p-5 sm:p-6">
        <h2 className="font-display text-2xl">عشان العملاء يكلموا</h2>
        <label className="grid gap-1 text-sm">
          <span>رقم واتساب</span>
          <input
            className="admin-input"
            dir="ltr"
            inputMode="tel"
            placeholder="201012345678"
            value={company.whatsapp}
            onChange={(event) => set("whatsapp", event.target.value)}
          />
          <span className="text-xs text-muted">اكتب الرقم زي ما هو في واتساب، من غير صفر في الأول. مثال: 201012345678</span>
        </label>
        <label className="grid gap-1 text-sm">
          <span>الإيميل</span>
          <input
            className="admin-input"
            dir="ltr"
            type="email"
            placeholder="hello@email.com"
            value={company.email}
            onChange={(event) => set("email", event.target.value)}
          />
        </label>
      </section>

      <section className="grid gap-5 border border-line bg-elevated p-5 sm:p-6">
        <div>
          <h2 className="font-display text-2xl">صفحات السوشيال</h2>
          <p className="mt-2 text-sm text-muted">الصق لينك الصفحة. لو فاضي، الأيقونة هتظهر من غير ما تتفتح.</p>
        </div>
        {(
          [
            ["instagram", "إنستجرام"],
            ["linkedin", "لينكدإن"],
            ["facebook", "فيسبوك"],
            ["tiktok", "تيك توك"],
            ["youtube", "يوتيوب"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="grid gap-1 text-sm">
            <span>{label}</span>
            <input
              className="admin-input"
              dir="ltr"
              placeholder="الصق اللينك هنا"
              value={company[key]}
              onChange={(event) => set(key, event.target.value)}
            />
          </label>
        ))}
      </section>

      <section className="grid gap-5 border border-line bg-elevated p-5 sm:p-6">
        <div>
          <h2 className="font-display text-2xl">الصورة الكبيرة أول الموقع</h2>
          <p className="mt-2 text-sm text-muted">دي أول صورة الزائر بيشوفها.</p>
        </div>
        <ImagePicker value={company.heroImage} onChange={(src) => set("heroImage", src)} />
      </section>

      <SaveBar pending={pending} saved={saved} error={error} />
    </form>
  );
}
