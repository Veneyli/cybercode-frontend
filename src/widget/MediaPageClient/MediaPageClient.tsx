"use client";

import { useCallback, useState } from "react";
import Categories from "@/components/Categories/Categories";
import MediaCard from "@/components/MediaCard/MediaCard";
import styles from "./MediaPageClient.module.scss";
import { format } from "date-fns";
import { Media } from "@/types/media.types";
import SearchMedia from "@/widget/SearchMedia/SearchMedia";

interface MediaPageWrapperProps {
  mediaData: Media[];
}

export default function MediaPageClient({ mediaData }: MediaPageWrapperProps) {
  const publishedMedia = mediaData.filter(
    (media) => media.isPublished === true
  );
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [filteredMedia, setFilteredMedia] = useState<Media[]>(publishedMedia);

  const handleSearch = useCallback((filtered: Media[]) => {
    setFilteredMedia(filtered);
  }, []);
  return (
    <div className={styles.media}>
      <div className={styles.media__content}>
        <h1 className={styles["media__content-title"]}>Медиа</h1>

        <Categories
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
        />

        <SearchMedia
          media={publishedMedia}
          selectedCategory={selectedCategory}
          onSearch={handleSearch}
        />

        <div className={styles.media__list}>
          {filteredMedia.length > 0 ? (
            filteredMedia.map((media) => (
              <MediaCard
                key={media.media_id}
                media_id={media.media_id}
                title={media.title}
                description={media.description}
                image_url={media.image_url}
                date={
                  media?.date
                    ? format(new Date(media.date), "dd.MM.yyyy")
                    : "Не указано"
                }
                category={media.category}
                content={media.content}
              />
            ))
          ) : (
            <p className={styles.media__noResults}>Статьи не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
}
