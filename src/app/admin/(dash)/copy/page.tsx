import { readSite } from "@/lib/site";
import { CopyEditor } from "@/components/admin/CopyEditor";

export default async function CopyPage() {
  return <CopyEditor initial={readSite().messages} />;
}
