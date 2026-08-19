import Image from "next/image";
import type { TeamMember } from "@/content/en";

export function TeamCard({
  member,
  sampleLabel,
  index,
}: {
  member: TeamMember;
  sampleLabel: string;
  index: number;
}) {
  return (
    <article className="team-card group overflow-hidden border border-line bg-elevated">
      <div className="relative aspect-[4/5] overflow-hidden bg-inset">
        <Image
          src={member.image}
          alt={member.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top will-change-transform"
          data-parallax
        />
        <span className="absolute start-4 top-4 z-10 border border-white/20 bg-black/50 px-3 py-1 text-[11px] tracking-[0.16em] text-white/80">
          {sampleLabel}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        <p className="absolute bottom-5 start-5 end-5 z-10 font-display text-5xl font-bold leading-none text-white/25">
          {String(index).padStart(2, "0")}
        </p>
      </div>
      <div className="bg-elevated p-5">
        <h3 className="font-display text-xl font-bold">{member.role}</h3>
        <p className="mt-1 text-sm text-muted">{member.focus}</p>
      </div>
    </article>
  );
}
