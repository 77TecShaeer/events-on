"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "@/i18n/navigation";
import { canAnimate, isDesktopMotion, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollFX() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const bar = document.querySelector<HTMLElement>(".scroll-progress");
      const rtl = document.documentElement.dir === "rtl";

      if (bar) {
        gsap.set(bar, {
          scaleX: 0,
          transformOrigin: rtl ? "100% 50%" : "0% 50%",
        });
      }

      if (prefersReducedMotion()) return;

      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.35,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".rule:not(.hero-rule):not(.page-hero-rule)").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 0.85,
          ease: "power3.inOut",
          transformOrigin: rtl ? "100% 50%" : "0% 50%",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      if (!isDesktopMotion() || !canAnimate(true)) return;

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        gsap.fromTo(
          el,
          { yPercent: -12, scale: 1.14 },
          {
            yPercent: 12,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    },
    { dependencies: [pathname] },
  );

  return (
    <div
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-brand-pink via-brand-pink to-brand-green"
      aria-hidden
    />
  );
}
