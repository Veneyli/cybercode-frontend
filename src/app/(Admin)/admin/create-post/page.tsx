import CreatePost from "@/features/Admin/ui/CreatePost/CreatePost";
import styles from "./createPostPage.module.scss";
import Heading from "@/shared/ui/Heading/Heading";

export const dynamic = "force-dynamic";

const CreatePostPage = async () => {
  return (
    <div className={styles["create-post-page"]}>
      <Heading level={1} align="center">
        Создание поста
      </Heading>
      <CreatePost />
    </div>
  );
};

export default CreatePostPage;
