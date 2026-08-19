import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = pageSeo("services");

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const content = getContent(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <JsonLd locale={locale} page="services" />
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
      <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.services.map((service) => (
          <article
            key={service.id}
            data-reveal-item
            className="border border-line bg-elevated p-5 transition hover:border-brand-green/40"
          >
            <ServiceIcon id={service.id} />
            <h2 className="mt-4 text-lg font-medium">{service.title}</h2>
            <p className="mt-2 text-sm text-muted">{service.body}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}
