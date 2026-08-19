import { readSite } from "@/lib/site";

export default function robots() {
  const seo = readSite().seo;
  const origin = seo.siteUrl.replace(/\/+$/, "");
  let host: string | undefined;
  try {
    host = origin ? new URL(origin).host : undefined;
  } catch {
    host = undefined;
  }

  return {
    rules: seo.index
      ? [
          { userAgent: "*", allow: "/", disallow: ["/admin/", "/admin"] },
          { userAgent: "Googlebot", allow: "/", disallow: ["/admin/", "/admin"] },
        ]
      : { userAgent: "*", disallow: "/" },
    sitemap: origin ? `${origin}/sitemap.xml` : undefined,
    host,
  };
}
