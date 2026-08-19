import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { HeroStage } from "@/components/home/HeroStage";
import { TaglineRail } from "@/components/home/TaglineRail";
import { HistoryRail } from "@/components/home/HistoryRail";
import { TeamStage } from "@/components/home/TeamStage";
import { ScrubTitle } from "@/components/ScrubTitle";
import { Button, TextLink } from "@/components/Button";
import { getContent } from "@/content";
import { pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = pageSeo("home");

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const cta = await getTranslations("cta");
  const workT = await getTranslations("work");
  const about = await getTranslations("about");
  const content = getContent(locale as Locale);
  const featured = content.work.filter((item) => content.featuredWorkIds.includes(item.id));
  const types = content.services.slice(0, 4);
  const stats = [
    ["stat1", "stat1Label"],
    ["stat2", "stat2Label"],
    ["stat3", "stat3Label"],
  ] as const;

  return (
    <div>
      <JsonLd locale={locale} page="home" />
      <HeroStage image={content.company.heroImage} />
      <TaglineRail />

      <Reveal className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <ScrubTitle text={t("servicesTitle")} className="max-w-xl text-4xl sm:text-6xl" />
            <TextLink href="/services">{cta("viewServices")}</TextLink>
          </div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {types.map((service, i) => (
              <li key={service.id} data-reveal-item className="border-t border-line py-8">
                <p className="font-display text-3xl text-brand-pink sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-5 text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal className="bg-fg text-page">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-3 md:gap-16">
          {stats.map(([title, body]) => (
            <div key={title} data-reveal-item>
              <h2 className="font-display text-4xl sm:text-5xl">{t(title)}</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t(body)}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <ScrubTitle text={t("workTitle")} className="text-4xl sm:text-6xl" />
              <p className="mt-4 text-sm text-muted">{t("workNote")}</p>
            </div>
            <TextLink href="/work">{cta("viewWork")}</TextLink>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((item) => (
              <div key={item.id} data-reveal-item>
                <WorkCard item={item} sampleLabel={workT("sample")} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="border-y border-line bg-elevated">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <ScrubTitle text={t("proofTitle")} className="text-4xl sm:text-6xl" />
          <ol className="mt-16 grid gap-12 md:grid-cols-3">
            {(
              [
                ["01", "discover", "discoverBody"],
                ["02", "design", "designBody"],
                ["03", "produce", "produceBody"],
              ] as const
            ).map(([num, title, body]) => (
              <li key={title} data-reveal-item>
                <p className="font-display text-3xl text-brand-pink">{num}</p>
                <p className="font-display mt-5 text-2xl">{about(title)}</p>
                <p className="mt-4 leading-relaxed text-muted">{about(body)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <p className="text-sm text-brand-green">{t("egyptKicker")}</p>
          <ScrubTitle text={t("egyptTitle")} className="mt-3 max-w-3xl text-4xl sm:text-6xl" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t("egyptLead")}</p>
        </div>
      </Reveal>

      <HistoryRail linked beats={content.history} />
      <TeamStage linked members={content.team} />

      <section className="bg-fg text-page">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <ScrubTitle text={t("ctaTitle")} className="max-w-3xl text-5xl sm:text-7xl" />
          <div className="rule mt-10 bg-brand-pink" />
          <p className="mt-8 max-w-xl text-lg text-white/65">{t("ctaLead")}</p>
          <Button href="/contact" className="mt-10">
            {cta("brief")}
          </Button>
        </div>
      </section>
    </div>
  );
}
