import Heading from "@/shared/ui/Heading/Heading";
import styles from "./createCoursePage.module.scss";


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
    </div>
  );
};

export default CreateCoursePage;
