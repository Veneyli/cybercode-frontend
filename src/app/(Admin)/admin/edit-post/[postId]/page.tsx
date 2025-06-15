import EditPost from "@/features/Admin/ui/EditPost/EditPost";
import styles from "./editPostPage.module.scss";
import Heading from "@/shared/ui/Heading/Heading";
import { MediaService } from "@/shared/services/media.service";

interface Props {
  params: Promise<{ postId: string }>;
}
const editPostPage = async ({ params }: Props) => {
  const { postId } = await params;
  const post = (await MediaService.mediaById(postId)) || [];
  return (
    <div className={styles["edit-post"]}>
      <Heading align="center" level={1} className={styles["edit-post__title"]}>
        Редактировать пост
      </Heading>
      <EditPost post={post} />
    </div>
  );
};

export default editPostPage;
