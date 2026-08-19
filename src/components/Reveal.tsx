"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canAnimate } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!canAnimate() || !ref.current) return;

      const items = ref.current.querySelectorAll("[data-reveal-item]");
      if (items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 72,
          duration: 1.05,
          stagger: 0.11,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
          },
        });
        return;
      }

      gsap.from(ref.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 86%",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
