import clsx from "clsx";
import { getSocial, type SocialId } from "@/lib/social";

const box =
  "social-box flex size-10 items-center justify-center rounded-[10px] border border-line text-fg transition-colors hover:border-brand-green hover:text-brand-green";

function Icon({ id }: { id: SocialId }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
      {id === "instagram" && (
        <>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" />
        </>
      )}
      {id === "linkedin" && (
        <>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8.2 10.4V16.2M8.2 7.8v.08M11.3 16.2v-3.5c0-1 .6-1.7 1.6-1.7s1.6.7 1.6 1.7v3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      )}
      {id === "facebook" && (
        <path
          d="M14.2 8.2h1.8V5.4h-1.8c-2.2 0-3.7 1.4-3.7 3.6v1.5H9v2.8h1.5V19h2.9v-5.7h2.1l.4-2.8h-2.5V9.2c0-.6.3-1 1-1Z"
          fill="currentColor"
        />
      )}
      {id === "tiktok" && (
        <path
          d="M13.2 6v7.1a3.1 3.1 0 1 1-2.2-3v2.15a1 1 0 1 0 1.1.98V6.9c.7 1.2 1.8 2 3.4 2.15V7.2c-1.1-.12-2-.7-2.3-1.2Z"
          fill="currentColor"
        />
      )}
      {id === "youtube" && (
        <>
          <rect
            x="3.5"
            y="7"
            width="17"
            height="10"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M11 10.2 15 12l-4 1.8v-3.6Z" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function SocialRow({
  labels,
  className,
}: {
  labels: Record<SocialId, string>;
  className?: string;
}) {
  return (
    <ul className={clsx("flex flex-wrap gap-2", className)}>
      {getSocial().map((network) => {
        const label = labels[network.id];
        const inner = <Icon id={network.id} />;

        return (
          <li key={network.id}>
            {network.href ? (
              <a
                href={network.href}
                target="_blank"
                rel="noreferrer"
                className={box}
                aria-label={label}
              >
                {inner}
              </a>
            ) : (
              <span className={box} title={label} aria-label={label}>
                {inner}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
