"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMeta(event: "PageView" | "Lead" | "Contact") {
  if (typeof window === "undefined") return;
  window.fbq?.("track", event);
}

export function MetaPixelPageView({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!/^\d{5,20}$/.test(pixelId)) return;
    if (first.current) {
      first.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname, pixelId]);

  return null;
}
