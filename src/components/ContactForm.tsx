"use client";

import { useActionState, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitLeadAction } from "@/app/admin/actions";
import { Button } from "@/components/Button";
import { validateBrief, sanitizeCompanyInput, sanitizeEmailInput, sanitizeNameInput, sanitizePhoneInput, type BriefField, type BriefIssue } from "@/lib/brief";
import clsx from "clsx";

type Errors = Partial<Record<BriefField, string>>;

const FALLBACK: Record<string, Record<BriefIssue, string>> = {
  ar: {
    required: "الخانة دي مطلوبة.",
    nameShort: "الاسم قصير زيادة.",
    badEmail: "الإيميل مش مظبوط.",
    badPhone: "اكتب رقم موبايل صحيح، زي 01012345678",
    messageShort: "اكتب تفاصيل أكتر شوية عن الإيفنت.",
  },
  en: {
    required: "This field is required.",
    nameShort: "That name is too short.",
    badEmail: "That email doesn't look right.",
    badPhone: "Enter a valid mobile number, like 01012345678",
    messageShort: "Add a bit more about the night.",
  },
};

export function ContactForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitLeadAction, null);
  const [errors, setErrors] = useState<Errors>({});

  function issueText(issue: BriefIssue) {
    const key = issue === "nameShort" || issue === "messageShort" || issue === "badPhone" || issue === "badEmail" || issue === "required" ? issue : "required";
    if (t.has(key)) return t(key);
    return FALLBACK[locale === "ar" ? "ar" : "en"][issue];
  }

  function read(form: HTMLFormElement, name: BriefField) {
    return String(new FormData(form).get(name) ?? "");
  }

  function check(form: HTMLFormElement): Errors {
    const { issues } = validateBrief({
      name: read(form, "name"),
      company: read(form, "company"),
      email: read(form, "email"),
      phone: read(form, "phone"),
      message: read(form, "message"),
    });
    const next: Errors = {};
    (Object.keys(issues) as BriefField[]).forEach((field) => {
      const issue = issues[field];
      if (issue) next[field] = issueText(issue);
    });
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const next = check(event.currentTarget);
    setErrors(next);
    if (Object.keys(next).length) {
      event.preventDefault();
      event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }
  }

  function clear(field: BriefField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  if (state?.ok) {
    return (
      <div className="brief-form brief-success">
        <div className="brief-bars" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <p className="font-display text-4xl sm:text-5xl">{t.has("successTitle") ? t("successTitle") : t("success")}</p>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={onSubmit} noValidate className="brief-form">
      <div className="brief-bars" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <input type="hidden" name="locale" value={locale} />
      <p className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          الموقع
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <label className={clsx("brief-field brief-phone", errors.phone && "has-error")}>
        <span className="brief-label">
          <span dir="ltr">01</span>
          {t("phone")}
        </span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={22}
          dir="ltr"
          placeholder={locale === "ar" ? "01012345678" : "01012345678"}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby="phone-hint"
          className={clsx("brief-input", errors.phone && "is-error")}
          onInput={(event) => {
            applyFilter(event.currentTarget, sanitizePhoneInput);
            clear("phone");
          }}
          onBlur={(event) => {
            applyFilter(event.currentTarget, sanitizePhoneInput);
            const next = check(event.currentTarget.form!);
            if (next.phone) setErrors((current) => ({ ...current, phone: next.phone }));
          }}
        />
        <span id="phone-hint" className={errors.phone ? "brief-error" : "brief-hint"}>
          {errors.phone ?? (t.has("phoneHint") ? t("phoneHint") : locale === "ar" ? "الأهم. رقم الموبايل اللي نكلمك عليه." : "The number we'll call or WhatsApp.")}
        </span>
      </label>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <Field
          id="name"
          index="02"
          label={t("name")}
          error={errors.name}
          autoComplete="name"
          filter={sanitizeNameInput}
          onClear={() => clear("name")}
          onBlurCheck={(form) => {
            const next = check(form);
            if (next.name) setErrors((current) => ({ ...current, name: next.name }));
          }}
        />
        <Field
          id="company"
          index="03"
          label={`${t("company")} (${locale === "ar" ? "اختياري" : "optional"})`}
          error={errors.company}
          autoComplete="organization"
          filter={sanitizeCompanyInput}
          onClear={() => clear("company")}
        />
        <Field
          id="email"
          index="04"
          label={`${t("email")} (${locale === "ar" ? "اختياري" : "optional"})`}
          error={errors.email}
          type="email"
          dir="ltr"
          autoComplete="email"
          inputMode="email"
          filter={sanitizeEmailInput}
          className="sm:col-span-2"
          onClear={() => clear("email")}
          onBlurCheck={(form) => {
            const next = check(form);
            if (next.email) setErrors((current) => ({ ...current, email: next.email }));
          }}
        />
        <Field
          id="message"
          index="05"
          label={t("message")}
          error={errors.message}
          area
          dir="auto"
          className="sm:col-span-2"
          onClear={() => clear("message")}
          onBlurCheck={(form) => {
            const next = check(form);
            if (next.message) setErrors((current) => ({ ...current, message: next.message }));
          }}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? t("sending") : t("submit")}
        </Button>
        {state?.error ? <p className="text-sm text-brand-pink">{state.error}</p> : null}
      </div>
    </form>
  );
}

function applyFilter(input: HTMLInputElement | HTMLTextAreaElement, filter?: (value: string) => string) {
  if (!filter) return;
  const next = filter(input.value);
  if (next !== input.value) input.value = next;
}

function Field({
  id,
  index,
  label,
  error,
  area,
  dir,
  type = "text",
  autoComplete,
  inputMode,
  className,
  filter,
  onClear,
  onBlurCheck,
}: {
  id: BriefField;
  index: string;
  label: string;
  error?: string;
  area?: boolean;
  dir?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  className?: string;
  filter?: (value: string) => string;
  onClear: () => void;
  onBlurCheck?: (form: HTMLFormElement) => void;
}) {
  const shared = {
    name: id,
    dir,
    "aria-invalid": Boolean(error),
    className: clsx("brief-input", area && "brief-area", error && "is-error"),
    onInput: (event: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => {
      applyFilter(event.currentTarget, filter);
      onClear();
    },
    onBlur: (event: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => {
      applyFilter(event.currentTarget, filter);
      if (event.currentTarget.form && onBlurCheck) onBlurCheck(event.currentTarget.form);
    },
  };

  return (
    <label className={clsx("brief-field", className)}>
      <span className="brief-label">
        <span dir="ltr">{index}</span>
        {label}
      </span>
      {area ? (
        <textarea {...shared} rows={5} maxLength={2000} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} inputMode={inputMode} maxLength={id === "email" ? 120 : 80} />
      )}
      {error ? <span className="brief-error">{error}</span> : null}
    </label>
  );
}
