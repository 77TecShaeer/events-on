export function whatsappHref(raw: string | null | undefined, prefill: string) {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(prefill)}`;
}
