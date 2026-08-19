"use client";

import { useLocale, useTranslations } from "next-intl";

function Track({
  text,
  className,
  reverse = false,
}: {
  text: string;
  className: string;
  reverse?: boolean;
}) {
  const copies = [0, 1];
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${reverse ? "tagline-track-rev" : "tagline-track"}`}>
        {copies.map((copy) => (
          <p key={copy} className={className}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export function TaglineRail() {
  const t = useTranslations("home");
  const footer = useTranslations("footer");
  const locale = useLocale();
  const cycle = t.raw("cycle") as string[];
  const show = `${cycle.join("    ·    ")}    ·    `;
  const brand = `${footer("tagline")}    ·    `.repeat(6);

  return (
    <div className="border-y border-line bg-fg text-page" aria-hidden>
      <div dir="ltr">
        <Track
          text={brand}
          reverse={locale === "ar"}
          className="whitespace-nowrap px-6 py-3 font-[family-name:var(--font-inter)] text-[11px] tracking-[0.34em] text-white/45"
        />
      </div>
      <div className="border-t border-white/10">
        <Track
          text={show}
          className="font-display whitespace-nowrap px-6 py-5 text-4xl font-extrabold sm:text-6xl md:text-7xl"
        />
      </div>
    </div>
  );
}
