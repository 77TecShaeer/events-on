import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/content";
import { pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = pageSeo("history");

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("history");
  const sample = await getTranslations("work");
  const beats = getContent(locale as Locale).history;

  return (
    <div>
      <JsonLd locale={locale} page="history" />
      <section className="hero-stage">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
        </div>
      </section>

      <Reveal className="mx-auto max-w-6xl px-5 pb-24">
        <ol>
          {beats.map((beat) => (
            <li
              key={beat.id}
              data-reveal-item
              className="grid gap-6 border-t border-line py-12 md:grid-cols-[5rem_minmax(0,18rem)_1fr] md:items-start"
            >
              <p className="text-xs tracking-[0.2em] text-brand-pink">
                {beat.index}
              </p>
              <div className="relative aspect-[16/11] overflow-hidden border border-line bg-inset">
                <Image
                  src={beat.image}
                  alt={beat.alt}
                  fill
                  sizes="(min-width: 768px) 18rem, 100vw"
                  className="object-cover will-change-transform"
                  data-parallax
                />
                <span className="absolute start-3 top-3 border border-white/20 bg-black/50 px-2 py-1 text-[10px] tracking-[0.16em] text-white/80">
                  {sample("sample")}
                </span>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{beat.title}</h2>
                <p className="mt-4 text-muted">{beat.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
