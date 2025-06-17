import Heading from "@/shared/ui/Heading/Heading";
import styles from "./editCoursePage.module.scss";
import EditCourseForm from "@/features/Admin/ui/EditCourseForm/EditCourseForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ courseId: string }>;
}

const editCoursePage = async (props: Props) => {
  const { courseId } = await props.params;

  return (
    <div className={styles["edit-course"]}>
      <Heading
        level={1}
        align="center"
        className={styles["edit-course__title"]}
      >
        Редактировать курс
      </Heading>
      <div>
        <EditCourseForm courseId={Number(courseId)} />
      </div>
    </div>
  );
};

export default editCoursePage;
