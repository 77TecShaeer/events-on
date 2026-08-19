import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { SocialRow } from "@/components/SocialIcons";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { companyEmail, displayPhone } from "@/lib/social";
import type { SocialId } from "@/lib/social";

const pages = [
  { href: "/work", key: "work" as const },
  { href: "/services", key: "services" as const },
  { href: "/team", key: "team" as const },
  { href: "/history", key: "history" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const cta = await getTranslations("cta");
  const email = companyEmail();
  const phone = displayPhone();
  const socialLabels: Record<SocialId, string> = {
    instagram: t("instagram"),
    linkedin: t("linkedin"),
    facebook: t("facebook"),
    tiktok: t("tiktok"),
    youtube: t("youtube"),
  };

  return (
    <footer className="site-footer">
      <div className="flex h-1" aria-hidden>
        <span className="flex-1 bg-brand-pink" />
        <span className="w-24 bg-white" />
        <span className="flex-1 bg-brand-green" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.7fr_0.9fr] lg:gap-20">
          <div>
            <Logo variant="onDark" className="text-xl md:text-2xl" />
            <p className="mt-5 max-w-sm font-[family-name:var(--font-inter)] text-sm tracking-[0.06em] text-white/55">
              {t("tagline")}
            </p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70">{t("house")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="sm">
                {cta("brief")}
              </Button>
              <WhatsAppLink variant="button" size="sm" />
            </div>
          </div>

          <nav className="flex flex-col gap-3 text-base text-white/60" aria-label={t("pages")}>
            <p className="mb-1 text-xs tracking-[0.18em] text-white/40">{t("pages")}</p>
            {pages.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit hover:text-white">
                {nav(item.key)}
              </Link>
            ))}
          </nav>

          <div className="text-base text-white/60">
            <p className="mb-3 text-xs tracking-[0.18em] text-white/40">{t("talk")}</p>
            {phone ? (
              <a href={`tel:+${phone.replace(/\D/g, "")}`} dir="ltr" className="mb-2 block text-white hover:text-brand-green">
                {phone}
              </a>
            ) : null}
            {email ? (
              <a href={`mailto:${email}`} dir="ltr" className="mb-6 block text-white hover:text-brand-green">
                {email}
              </a>
            ) : null}
            <p className="mb-3 text-xs tracking-[0.18em] text-white/40">{t("social")}</p>
            <SocialRow labels={socialLabels} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights")}</p>
          <div className="footer-prefs flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
