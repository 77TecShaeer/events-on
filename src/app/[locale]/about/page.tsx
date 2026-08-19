import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const generateMetadata = pageSeo("about");

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div>
      <JsonLd locale={locale} page="about" />
      <section className="hero-stage">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <PageHero kicker={t("kicker")} title={t("title")} />
        </div>
      </section>

      <Reveal className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
        <div data-reveal-item>
          <p className="text-lg leading-relaxed text-muted">{t("lead")}</p>
          <p className="mt-6 leading-relaxed text-muted">{t("body")}</p>
        </div>
        <aside data-reveal-item className="h-fit border border-line bg-elevated p-8">
          <p className="text-lg leading-relaxed">{t("body2")}</p>
        </aside>
      </Reveal>

      <Reveal className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-bold">{t("processTitle")}</h2>
          <ol className="mt-12">
            {(
              [
                ["01", "discover", "discoverBody"],
                ["02", "design", "designBody"],
                ["03", "produce", "produceBody"],
              ] as const
            ).map(([num, title, body]) => (
              <li
                key={title}
                data-reveal-item
                className="grid gap-4 border-t border-line py-10 md:grid-cols-[5rem_1fr_1.4fr] md:items-baseline"
              >
                <p className="text-xs tracking-[0.2em] text-brand-pink">{num}</p>
                <h3 className="font-display text-2xl font-bold">{t(title)}</h3>
                <p className="text-muted">{t(body)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  );
}
