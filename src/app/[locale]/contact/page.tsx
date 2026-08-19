import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { PageHero } from "@/components/PageHero";
import { pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const generateMetadata = pageSeo("contact");

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <JsonLd locale={locale} page="contact" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[minmax(0,1.15fr)_20rem] lg:gap-16">
      <div>
        <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
      <aside className="brief-aside h-fit lg:sticky lg:top-28">
        <p className="text-xs tracking-[0.2em] text-white/40">WHATSAPP</p>
        <h2 className="font-display mt-4 text-3xl text-white">{t("whatsappLead")}</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/60">{t("whatsappBody")}</p>
        <WhatsAppLink variant="button" className="mt-8" />
      </aside>
    </div>
    </>
  );
}
