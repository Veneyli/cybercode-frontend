import { MediaService } from "@/services/media.service";
import { Media } from "@/types/media.types";
import MediaPageClient from "@/widget/MediaPageClient/MediaPageClient";

export default async function MediaPage() {
  const mediaData: Media[] = await MediaService.media();

  return <MediaPageClient mediaData={mediaData} />;
}
