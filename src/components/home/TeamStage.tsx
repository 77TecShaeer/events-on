"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canAnimate } from "@/lib/motion";
import { TextLink } from "@/components/Button";
import { TeamCard } from "@/components/TeamCard";
import type { TeamMember } from "@/content/en";
import type { Locale } from "@/i18n/routing";

gsap.registerPlugin(ScrollTrigger);

export function TeamStage({
  linked = false,
  members,
}: {
  linked?: boolean;
  members: TeamMember[];
}) {
  const t = useTranslations("home");
  const cta = useTranslations("cta");
  const sample = useTranslations("work");
  const locale = useLocale() as Locale;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!canAnimate() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(".team-card", root.current);

      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateZ: i % 2 === 0 ? -3 : 3,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    },
    { scope: root, dependencies: [locale] },
  );

  return (
    <section id="team" ref={root} className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-brand-green">{t("teamKicker")}</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold sm:text-5xl">
              {t("teamTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-muted">{t("teamLead")}</p>
          </div>
          {linked ? (
            <TextLink href="/team">{cta("viewTeam")}</TextLink>
          ) : null}
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <TeamCard
              key={member.id}
              member={member}
              sampleLabel={sample("sample")}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
