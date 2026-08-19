import { readSite } from "@/lib/site";
import { saveTeamAction } from "@/app/admin/actions";
import { TeamEditor } from "@/components/admin/TeamEditor";

export default async function TeamAdminPage() {
  return <TeamEditor initial={readSite().team} save={saveTeamAction} />;
}
