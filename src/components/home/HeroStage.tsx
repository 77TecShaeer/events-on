"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { canAnimate } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

function Words({ text, mark }: { text: string; mark?: boolean }) {
  const words = text.trim().split(/\s+/);
  return (
    <span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className={`hero-word inline-block will-change-transform ${mark ? "text-brand-pink" : ""}`}>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroStage({ image = "/media/work/w3.jpg" }: { image?: string }) {
  const t = useTranslations("home");
  const cta = useTranslations("cta");
  const tagline = useTranslations("footer");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const curtain = root.current?.querySelector(".hero-curtain");

      if (!canAnimate()) {
        if (curtain) gsap.set(curtain, { display: "none" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(
        ".hero-curtain span",
        { yPercent: -102, duration: 0.9, stagger: 0.1, ease: "power4.inOut" },
        0,
      )
        .fromTo(
          ".hero-still img",
          { scale: 1.22 },
          { scale: 1, duration: 1.7, ease: "power2.out" },
          0.12,
        )
        .from(".hero-kicker", { y: 18, opacity: 0, duration: 0.5 }, 0.28)
        .from(".hero-word", { yPercent: 115, duration: 0.9, stagger: 0.055, ease: "expo.out" }, 0.32)
        .from(".hero-rule", { scaleX: 0, duration: 0.6, ease: "power3.inOut" }, 0.72)
        .from(".hero-lead", { y: 22, opacity: 0, duration: 0.55 }, 0.78)
        .from(".hero-cta a", { y: 18, opacity: 0, duration: 0.45, stagger: 0.08 }, 0.88)
        .from(".hero-tag", { opacity: 0, duration: 0.4 }, 1.05)
        .from(".hero-bars span", { scaleY: 0, duration: 0.85, stagger: 0.08 }, 0.45);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero-stage relative min-h-[100svh] overflow-hidden">
      <div className="hero-still absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="hero-veil pointer-events-none absolute inset-0" />

      <div className="hero-curtain pointer-events-none absolute inset-0 z-20 flex" aria-hidden>
        <span className="flex-1 bg-brand-pink" />
        <span className="flex-1 bg-black" />
        <span className="flex-1 bg-brand-green" />
      </div>

      <div
        className="hero-bars pointer-events-none absolute inset-y-0 end-4 z-10 hidden w-9 md:flex md:flex-col md:gap-1.5 md:py-24"
        aria-hidden
      >
        <span className="h-[28%] origin-bottom bg-brand-pink" />
        <span className="h-[38%] origin-bottom bg-white" />
        <span className="h-[48%] origin-bottom bg-brand-green" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:pb-20">
        <p className="hero-kicker text-sm tracking-[0.22em] text-white/70">{t("kicker")}</p>
        <h1 className="hero-title mt-5 max-w-[14ch] text-white">
          <Words text={t("title")} />{" "}
          <Words text={t("titleAccent")} mark />
        </h1>
        <div className="hero-rule rule mt-8 origin-start bg-white" />
        <p className="hero-lead mt-8 max-w-lg text-lg leading-relaxed text-white/75">{t("lead")}</p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <Button href="/contact">{cta("brief")}</Button>
          <Button href="/work" variant="secondary" arrow={false}>
            {cta("viewWork")}
          </Button>
        </div>
        <p
          dir="ltr"
          className="hero-tag mt-12 font-[family-name:var(--font-inter)] text-[11px] tracking-[0.32em] text-white/55"
        >
          {tagline("tagline")}
        </p>
      </div>
    </section>
  );
}
