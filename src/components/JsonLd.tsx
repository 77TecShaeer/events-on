import { jsonLd } from "@/lib/seo";
import type { SeoPageId } from "@/lib/site-types";

export function JsonLd({ locale, page }: { locale: string; page: SeoPageId }) {
  const payload = JSON.stringify(jsonLd(locale, page)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />;
}
