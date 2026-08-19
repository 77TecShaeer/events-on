import { fontClassName } from "@/lib/fonts";
import "../globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "EVENTS ON — Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={fontClassName("ar")} data-theme="dark" suppressHydrationWarning>
      <body className={`${fontClassName("ar")} min-h-dvh bg-page text-fg antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
