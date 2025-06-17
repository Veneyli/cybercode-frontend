import { MediaService } from "@/services/media.service";
import { Media } from "@/types/media.types";
import MediaPageClient from "@/widget/MediaPageClient/MediaPageClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cybercode: Медиа",
  description: "Каталог медиа на платформе Cybercode",
};

export default async function MediaPage() {
  const mediaData: Media[] = (await MediaService.media()) || [];
  return <MediaPageClient mediaData={mediaData} />;
}
