import { readSite } from "@/lib/site";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  return <SettingsForm initial={readSite().company} />;
}
