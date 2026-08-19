import { getTranslations, setRequestLocale } from "next-intl/server";
import { WorkCard } from "@/components/WorkCard";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = pageSeo("work");

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");
  const content = getContent(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <JsonLd locale={locale} page="work" />
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
      <Reveal className="mt-14 grid gap-6 sm:grid-cols-2">
        {content.work.map((item) => (
          <div key={item.id} data-reveal-item>
            <WorkCard item={item} sampleLabel={t("sample")} />
          </div>
        ))}
      </Reveal>
    </div>
  );
}
