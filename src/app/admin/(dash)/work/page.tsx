import { readSite } from "@/lib/site";
import { saveWorkAction } from "@/app/admin/actions";
import { WorkEditor } from "@/components/admin/WorkEditor";

export default async function WorkAdminPage() {
  return <WorkEditor initial={readSite().work} save={saveWorkAction} />;
}
