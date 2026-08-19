import { readSite } from "@/lib/site";
import { SeoEditor } from "@/components/admin/SeoEditor";

export default async function SeoPage() {
  return <SeoEditor initial={readSite().seo} />;
}
