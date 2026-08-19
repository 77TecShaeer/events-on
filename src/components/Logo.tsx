import clsx from "clsx";

type LogoProps = {
  className?: string;
  variant?: "color" | "white" | "onDark";
};

function BarE({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 56"
      className={clsx("h-[0.72em] w-[0.46em] shrink-0", className)}
      aria-hidden
    >
      <rect x="0" y="0" width="36" height="10" fill="currentColor" />
      <rect x="0" y="23" width="36" height="10" fill="currentColor" />
      <rect x="0" y="46" width="36" height="10" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, variant = "color" }: LogoProps) {
  const letters =
    variant === "color" ? "text-fg" : "text-white";
  const barsPink = variant === "white" ? "text-white" : "text-brand-pink";
  const barsGreen = variant === "white" ? "text-white" : "text-brand-green";

  return (
    <span
      dir="ltr"
      className={clsx(
        "inline-flex items-center whitespace-nowrap",
        letters,
        "font-[family-name:var(--font-inter)] font-bold tracking-[0.12em]",
        className,
      )}
      aria-label="EVENTS ON"
    >
      <BarE className={barsPink} />
      <span className="ms-[0.08em]">V</span>
      <BarE className={clsx(barsGreen, "ms-[0.06em]")} />
      <span className="ms-[0.08em]">NTS</span>
      <span className="ms-[0.38em]">ON</span>
    </span>
  );
}
