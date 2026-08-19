import Image from "next/image";
import clsx from "clsx";
import type { WorkItem } from "@/content/en";

export function WorkCard({
  item,
  sampleLabel,
  featured = false,
}: {
  item: WorkItem;
  sampleLabel: string;
  featured?: boolean;
}) {
  return (
    <article
      className={clsx(
        "group overflow-hidden border border-line bg-elevated",
        featured && "sm:col-span-2",
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden bg-inset",
          featured ? "aspect-[16/9]" : "aspect-[16/11]",
        )}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={featured ? "(min-width: 640px) 70vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover will-change-transform"
          data-parallax
        />
        <span className="absolute start-4 top-4 z-10 border border-white/20 bg-black/50 px-3 py-1 text-[11px] tracking-[0.16em] text-white/80">
          {sampleLabel}
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1 origin-start scale-x-0 bg-brand-pink transition-transform duration-500 group-hover:scale-x-100" />
      </div>
      <div className="space-y-1 bg-elevated p-5">
        <p className="text-xs tracking-[0.14em] text-brand-green">
          {item.category} · {item.venue}
        </p>
        <h3 className="font-display text-xl transition group-hover:text-brand-pink">{item.title}</h3>
      </div>
    </article>
  );
}
