import { readLeads } from "@/lib/leads";
import { LeadsInbox } from "@/components/admin/LeadsInbox";

export default async function LeadsPage() {
  return <LeadsInbox initial={readLeads()} />;
}
