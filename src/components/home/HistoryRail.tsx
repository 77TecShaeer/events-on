"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { TextLink } from "@/components/Button";
import type { HistoryBeat } from "@/content/en";
import type { Locale } from "@/i18n/routing";

export function HistoryRail({
  linked = false,
  beats,
}: {
  linked?: boolean;
  beats: HistoryBeat[];
}) {
  const t = useTranslations("home");
  const cta = useTranslations("cta");
  const sample = useTranslations("work");
  const locale = useLocale() as Locale;

  return (
    <section id="history" className="relative border-y border-line bg-page">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-5 pt-20">
        <div>
          <p className="text-sm text-brand-green">{t("historyKicker")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold sm:text-5xl">
            {t("historyTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-muted">{t("historyLead")}</p>
        </div>
        {linked ? <TextLink href="/history">{cta("viewHistory")}</TextLink> : null}
      </div>
      <div className="overflow-x-auto">
        <div dir="ltr" className="mt-12 flex w-max gap-6 px-5 pb-20 md:px-10">
          {beats.map((beat) => (
            <article
              key={beat.id}
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="history-card relative h-[28rem] w-[min(80vw,28rem)] shrink-0 overflow-hidden border border-line bg-inset"
            >
              <Image
                src={beat.image}
                alt={beat.alt}
                fill
                sizes="(min-width: 768px) 28rem, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/15" />
              <span className="absolute end-6 top-6 z-10 text-[11px] tracking-[0.16em] text-white/70">
                {sample("sample")}
              </span>
              <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                <p className="font-[family-name:var(--font-inter)] text-sm tracking-[0.22em] text-brand-pink">
                  {beat.index}
                </p>
                <h3 className="font-display mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {beat.title}
                </h3>
                <p className="mt-4 text-sm text-white/75">{beat.body}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-gradient-to-r from-brand-pink to-brand-green" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
