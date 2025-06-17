import Heading from "@/shared/ui/Heading/Heading";
import styles from "./createCoursePage.module.scss";
import CreateCourseForm from "@/features/Admin/ui/CreateCourse/CreateCourse";

export const dynamic = "force-dynamic";

const CreateCoursePage = () => {
  return (
    <div className={styles["create-course"]}>
      <Heading
        level={1}
        align="center"
        className={styles["create-course__title"]}
      >
        Создать курс
      </Heading>
      <CreateCourseForm />
    </div>
  );
};

export default CreateCoursePage;
