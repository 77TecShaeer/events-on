"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { canAnimate } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrubTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      if (!canAnimate() || !ref.current) return;
      gsap.from(".scrub-word", {
        opacity: 0.15,
        y: 28,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          end: "top 42%",
          scrub: 0.6,
        },
      });
    },
    { scope: ref },
  );

  return (
    <h2 ref={ref} className={clsx("font-display", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="scrub-word inline-block pe-[0.28em]">
          {word}
        </span>
      ))}
    </h2>
  );
}
