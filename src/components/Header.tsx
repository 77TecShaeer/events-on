"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import clsx from "clsx";

const links: Array<{ href: string; key: "home" | "work" | "services" | "team" | "history" | "about" | "contact" }> = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/team", key: "team" },
  { href: "/history", key: "history" },
  { href: "/about", key: "about" },
];

const desktopLinks = links.filter((item) => item.href !== "/");

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-5" aria-hidden>
      <span
        className={clsx(
          "absolute inset-x-0 h-px bg-current transition-transform duration-300",
          open ? "top-1/2 rotate-45" : "top-0",
        )}
      />
      <span
        className={clsx(
          "absolute inset-x-0 h-px bg-current transition-transform duration-300",
          open ? "top-1/2 -rotate-45" : "bottom-0",
        )}
      />
    </span>
  );
}

export function Header({ whatsappHref: wa }: { whatsappHref?: string | null }) {
  const t = useTranslations("nav");
  const cta = useTranslations("cta");
  const pathname = usePathname();
  const home = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = home && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-lock", open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nav-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={clsx("site-header", overlay && "is-overlay", open && "is-open")}>
        <div className="site-header-bar">
          <Link href="/" className="relative z-10 text-[20px] sm:text-[22px]" onClick={() => setOpen(false)}>
            <Logo variant={overlay || open ? "onDark" : "color"} />
          </Link>

          <nav className="site-header-nav" aria-label={t("home")}>
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx("site-nav-link", pathname === item.href && "is-active")}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 hidden items-center gap-5 lg:flex">
            <Button href="/contact">
              {cta("brief")}
            </Button>
          </div>

          <button
            type="button"
            className="relative z-10 inline-flex size-11 items-center justify-center lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </header>

      {home ? null : <div className="h-[5.25rem]" aria-hidden />}

      <div className={clsx("site-menu", open && "is-open")} aria-hidden={!open}>
        <nav className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-between px-5 pb-10 pt-28">
          <div className="grid gap-1">
            {links.concat([{ href: "/contact", key: "contact" }]).map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-baseline justify-between border-b border-white/10 py-5",
                  pathname === item.href ? "text-white" : "text-white/80 hover:text-white",
                )}
              >
                <span className="font-display text-4xl sm:text-5xl">{t(item.key)}</span>
                <span className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] text-brand-pink">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" className="text-sm text-brand-green">
                {cta("whatsapp")}
              </a>
            ) : null}
            <Button href="/contact" size="sm">
              {cta("brief")}
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
