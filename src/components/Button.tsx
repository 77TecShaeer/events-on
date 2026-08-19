import clsx from "clsx";
import { Link } from "@/i18n/navigation";

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="btn-arrow size-3.5 shrink-0 rtl:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  green: "btn-green",
  ghost: "btn-ghost",
} as const;

const sizes = {
  sm: "btn-sm",
  md: "btn-md",
} as const;

type ButtonProps = {
  href?: string;
  external?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  external,
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const showArrow = arrow ?? (variant === "primary" || variant === "green");
  const cls = clsx("btn", variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {showArrow ? <Arrow /> : null}
    </>
  );

  if (href && external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...props}>
      {content}
    </button>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={clsx("text-link", className)}>
      {children}
      <Arrow />
    </Link>
  );
}
