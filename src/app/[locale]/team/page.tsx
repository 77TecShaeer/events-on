import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TeamCard } from "@/components/TeamCard";
import { getContent } from "@/content";
import { pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = pageSeo("team");

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");
  const sample = await getTranslations("work");
  const members = getContent(locale as Locale).team;

  return (
    <div>
      <JsonLd locale={locale} page="team" />
      <section className="hero-stage">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
        </div>
      </section>

      <Reveal className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <div key={member.id} data-reveal-item>
              <TeamCard member={member} sampleLabel={sample("sample")} index={i + 1} />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
