import { readSite } from "@/lib/site";
import { saveHistoryAction } from "@/app/admin/actions";
import { HistoryEditor } from "@/components/admin/HistoryEditor";

export default async function HistoryAdminPage() {
  return <HistoryEditor initial={readSite().history} save={saveHistoryAction} />;
}
