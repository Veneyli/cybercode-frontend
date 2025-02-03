import Button from "@/shared/ui/Button/Button";
import MediaCard from "@/shared/components/MediaCard/MediaCard";
import styles from "./media.module.scss";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cybercode: Медиа",
  description: "Курсы it-технологий, онлайн обучение",
};

export default async function MediaPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  let postData = [];

  try {
    const response = await fetch(`${API_URL}/api/media`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Ошибка при получении курсов");
    }

    postData = await response.json();
  } catch (error) {}

  return (
    <div className={styles.media}>
      <div className={styles.media__sidebar}>
        <div className={styles.media__categoryItem}>
          <Button label="Все" size="small" variant="flat" />
        </div>
        <div className={styles.media__categoryItem}>
          <Button label="Программирование" size="small" variant="flat" />
        </div>
        <div className={styles.media__categoryItem}>
          <Button label="Гейм" size="small" variant="flat" />
        </div>
        <div className={styles.media__categoryItem}>
          <Button label="Дизайн" size="small" variant="flat" />
        </div>
      </div>
      <div className={styles.media__content}>
        <h1 className={styles["media__content-title"]}>Медиа</h1>
        <div className={styles.media__search}></div>
        <div className={styles.media__list}>
          {postData && postData.length > 0 ? (
            postData.map((media) => (
              <MediaCard
                key={media.post_id}
                id={media.post_id}
                title={media.title}
                description={media.description}
                imageUrl={media.image_url}
                date={
                  media?.date
                    ? format(new Date(media.date), "dd.MM.yyyy")
                    : "Не указано"
                }
                category={media.category}
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
