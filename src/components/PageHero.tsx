"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { canAnimate } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

function Words({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="page-word inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!canAnimate() || !ref.current) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".page-kicker", { y: 16, opacity: 0, duration: 0.45 })
        .from(".page-word", { yPercent: 115, duration: 0.85, stagger: 0.045 }, "-=0.12")
        .from(".page-hero-rule", { scaleX: 0, duration: 0.65, ease: "power3.inOut" }, "-=0.4")
        .from(".page-lead", { y: 20, opacity: 0, duration: 0.5 }, "-=0.28");
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <p className="page-kicker text-sm tracking-[0.2em] text-muted">{kicker}</p>
      <h1 className="page-title hero-title mt-5 max-w-4xl">
        <Words text={title} />
      </h1>
      <div className="page-hero-rule rule mt-8 origin-start" />
      {lead ? <p className="page-lead mt-8 max-w-2xl text-lg text-muted">{lead}</p> : null}
    </div>
  );
}
