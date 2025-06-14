import Heading from "@/shared/ui/Heading/Heading";
import styles from "./postsPage.module.scss";
import Image from "next/image";
import { MediaService } from "@/shared/services/media.service";
import { Media } from "@/types/media.types";

const PostsPage = async () => {
  const posts: Media[] = (await MediaService.media()) || [];
  return (
    <div className={styles["posts"]}>
      <Heading align="center" level={1} className={styles["posts__title"]}>
        Управление постами
      </Heading>
      <div className={styles["posts__list"]}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.media_id} className={styles["posts__item"]}>
              <div className={styles["posts__item-image-wrapper"]}>
                <Image
                  src={post.image_url || "/images/placeholder.jpg"}
                  alt="Описание изображения"
                  width={300}
                  height={200}
                  className={styles["posts__item-image"]}
                />
              </div>
              <Heading level={2} className={styles["posts__item-title"]}>
                {post.title}
              </Heading>
              <p className={styles["posts__item-description"]}>
                {post.description}
              </p>
            </div>
          ))
        ) : (
          <p>Нет доступных постов.</p>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
