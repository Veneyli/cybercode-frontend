// import Button from "@/ui/Button/Button";
import Search from "@/widget/Search/Search";
import Categories from "@/components/Categories/Categories";
import MediaCard from "@/components/MediaCard/MediaCard";
import styles from "./mediaPage.module.scss";
import { format } from "date-fns";
import { MediaService } from "@/services/media.service";
import { Media } from "@/types/media.types";

export default async function MediaPage() {
  const mediaData = await MediaService.media();
  return (
    <div className={styles.media}>
      <div className={styles.media__content}>
        <h1 className={styles["media__content-title"]}>Медиа</h1>
        <Categories />
        <Search />
        <div className={styles.media__list}>
          {mediaData.length > 0 ? (
            mediaData.map((media: Media) => (
              <MediaCard
                key={media.post_id}
                post_id={media.post_id}
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
