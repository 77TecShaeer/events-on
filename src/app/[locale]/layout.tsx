import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollFX } from "@/components/ScrollFX";
import { fontClassName } from "@/lib/fonts";
import { themeBootScript } from "@/lib/theme";
import { readSite, resolveCompany } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "home");
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("nav");
  const prefill = await getTranslations();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const wa = whatsappHref(resolveCompany(readSite().company).whatsapp, prefill("whatsappPrefill"));

  return (
    <html
      lang={locale}
      dir={dir}
      className={fontClassName(locale)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className={`${fontClassName(locale)} min-h-dvh bg-page text-fg antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a href="#main" className="skip-link">
              {t("skip")}
            </a>
            <Header whatsappHref={wa} />
            <ScrollFX />
            <main id="main">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const dynamicParams = false;
