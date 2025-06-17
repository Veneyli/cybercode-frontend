import LectureEditForm from "@/features/Admin/ui/LectureEdit/LectureEdit";
import styles from "./editLecture.module.scss";
import Heading from "@/shared/ui/Heading/Heading";
import { LectureService } from "@/shared/services/lecture.service";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ lectureId: string }>;
}

const EditLecturePage = async (props: Props) => {
  const { lectureId } = await props.params;
  const lecture = await LectureService.lectureById(lectureId);

  return (
    <div className={styles["edit-lecture"]}>
      <Heading
        level={1}
        align="center"
        className={styles["edit-lecture__title"]}
      >
        Редактировать лекцию
      </Heading>
      <LectureEditForm lecture={lecture} />
    </div>
  );
};

export default EditLecturePage;
