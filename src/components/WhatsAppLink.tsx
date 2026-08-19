import { getTranslations } from "next-intl/server";
import { whatsappHref } from "@/lib/whatsapp";
import { whatsappDigits } from "@/lib/social";
import { Button } from "@/components/Button";

type Props = {
  className?: string;
  label?: string;
  variant?: "text" | "button";
  size?: "sm" | "md";
};

export async function WhatsAppLink({
  className,
  label,
  variant = "text",
  size = "md",
}: Props) {
  const t = await getTranslations();
  const href = whatsappHref(whatsappDigits(), t("whatsappPrefill"));
  const text = label ?? t("cta.whatsapp");

  if (!href) {
    return (
      <span className={className} title={t("contact.unavailable")}>
        {text}
      </span>
    );
  }

  if (variant === "button") {
    return (
      <Button href={href} external variant="green" size={size} className={className}>
        {text}
      </Button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {text}
    </a>
  );
}
