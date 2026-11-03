import Image from "next/image";
import clsx from "clsx";
import type { WorkItem, WorkVisual } from "@/content/en";

export function CaseStudy({
  item,
  labels,
}: {
  item: WorkItem;
  labels: { brief: string; approach: string; outcome: string; sample: string };
}) {
  const visuals: WorkVisual[] = (item.visuals?.length
    ? item.visuals
    : item.image
      ? [{ src: item.image, alt: item.alt, caption: "" }]
      : []
  ).filter((visual) => visual.src);
  const [lead, ...rest] = visuals;
  const beats = (
    [
      [labels.brief, item.brief],
      [labels.approach, item.approach],
      [labels.outcome, item.outcome],
    ] as const
  ).filter(([, body]) => body?.trim());
  const showSample = !item.summary?.trim() && beats.length === 0 && visuals.length < 2;

  return (
    <article className="overflow-hidden border border-line bg-elevated">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-end p-6 sm:p-10">
          <p className="text-xs tracking-[0.16em] text-brand-green">
            {[item.category, item.venue].filter(Boolean).join(" · ")}
          </p>
          <h3 className="font-display mt-4 text-4xl sm:text-5xl">{item.title}</h3>
          {item.summary?.trim() ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{item.summary}</p>
          ) : null}
        </div>
        <div className="relative aspect-[4/3] min-h-72 bg-inset lg:aspect-auto">
          {lead ? (
            <>
              <Image
                src={lead.src}
                alt={lead.alt || item.alt || item.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {showSample ? (
                <span className="absolute start-4 top-4 z-10 border border-white/20 bg-black/50 px-3 py-1 text-[11px] tracking-[0.16em] text-white/80">
                  {labels.sample}
                </span>
              ) : null}
              {lead.caption ? (
                <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-sm text-white">
                  {lead.caption}
                </span>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      {beats.length ? (
        <dl
          className={clsx(
            "grid gap-px border-t border-line bg-line",
            beats.length === 2 && "sm:grid-cols-2",
            beats.length > 2 && "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {beats.map(([label, body]) => (
            <div key={label} className="bg-elevated p-6">
              <dt className="text-xs tracking-[0.16em] text-brand-pink">{label}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {rest.length ? (
        <div className={clsx("grid gap-px border-t border-line bg-line", rest.length > 1 && "sm:grid-cols-2")}>
          {rest.map((visual, index) => (
            <figure key={`${visual.src}-${index}`} className="bg-elevated">
              <div className="relative aspect-[16/10] bg-inset">
                <Image
                  src={visual.src}
                  alt={visual.alt || item.title}
                  fill
                  sizes={rest.length > 1 ? "(min-width: 640px) 50vw, 100vw" : "100vw"}
                  className="object-cover"
                />
              </div>
              {visual.caption ? <figcaption className="px-4 py-3 text-sm text-muted">{visual.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}
    </article>
  );
}
