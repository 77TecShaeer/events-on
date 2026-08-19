import {
  IBM_Plex_Sans_Arabic,
  Inter,
  Noto_Kufi_Arabic,
  Outfit,
  Unbounded,
} from "next/font/google";

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: "variable",
  display: "swap",
});

export const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["700", "800", "900"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-plex-ar",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-kufi",
  weight: ["700", "800", "900"],
  display: "swap",
});

export function fontClassName(locale: string) {
  if (locale === "ar") {
    return `${inter.variable} ${plexArabic.variable} ${kufi.variable} ${plexArabic.className}`;
  }
  return `${inter.variable} ${outfit.variable} ${unbounded.variable} ${outfit.className}`;
}
