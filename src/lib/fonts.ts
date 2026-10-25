import localFont from "next/font/local";

export const inter = localFont({
  src: "../fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const myriad = localFont({
  src: "../fonts/MyriadPro-Regular.otf",
  variable: "--font-myriad",
  weight: "400",
  display: "swap",
});

export const cairo = localFont({
  src: [
    { path: "../fonts/Cairo-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Cairo-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Cairo-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-cairo",
  display: "swap",
});

export const adobeArabic = localFont({
  src: "../fonts/AdobeArabic-Regular.otf",
  variable: "--font-adobe-ar",
  weight: "400",
  display: "swap",
});

export function fontClassName(locale: string) {
  if (locale === "ar") {
    return `${inter.variable} ${cairo.variable} ${adobeArabic.variable} ${cairo.className}`;
  }
  return `${inter.variable} ${myriad.variable} ${myriad.className}`;
}
