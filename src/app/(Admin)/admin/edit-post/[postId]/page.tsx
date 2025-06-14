import styles from "./editPostPage.module.scss";
import Heading from "@/shared/ui/Heading/Heading";

const editPostPage = async () => {
  return (
    <div className={styles["edit-post"]}>
      <Heading level={1} className={styles["edit-post__title"]}>
        Редактировать пост
      </Heading>
      <form className={styles["edit-post__form"]}></form>
    </div>
  );
};

export default editPostPage;
