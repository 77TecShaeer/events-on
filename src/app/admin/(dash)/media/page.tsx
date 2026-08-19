import { listMedia } from "@/lib/media";
import { MediaGrid } from "@/components/admin/MediaGrid";

export default async function MediaPage() {
  return <MediaGrid images={listMedia()} />;
}
