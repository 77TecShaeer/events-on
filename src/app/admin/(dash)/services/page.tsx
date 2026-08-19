import { readSite } from "@/lib/site";
import { saveServicesAction } from "@/app/admin/actions";
import { ServicesEditor } from "@/components/admin/ServicesEditor";

export default async function ServicesAdminPage() {
  return <ServicesEditor initial={readSite().services} save={saveServicesAction} />;
}
