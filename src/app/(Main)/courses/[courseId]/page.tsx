import { CourseService } from "@/services/course.service";
import styles from "./coursePage.module.scss";
import Image from "next/image";
import { Course } from "@/shared/types/course.types";
import Heading from "@/shared/ui/Heading/Heading";
import CourseProgram from "@/shared/components/CourseProgramm/CourseProgramm";

interface Props {
  params: Promise<{ courseId: string }>;
}

const CoursePage = async (props: Props) => {
  const { courseId } = await props.params;

  const courseData: Course = await CourseService.courseById(courseId);
  const courseTechnologies = courseData.technologies
    ? courseData.technologies
    : [];

  return (
    <section className={styles["course"]}>
      <div className={styles["course__content"]}>
        <div className={styles["course__content-info"]}>
          <Heading level={1} className={styles["course__title"]}>
            {courseData.title}
          </Heading>
          <p className={styles["course__description"]}>
            {courseData.description}
          </p>
          <div className={styles["course__technologies"]}>
            <Heading level={3} className={styles["course__technologies-title"]}>
              Изучаемые технологии:
            </Heading>
            <div className={styles["course__technologies-items"]}>
              {courseTechnologies.map((technology, index) => (
                <div
                  key={index}
                  className={styles["course__technologies-item"]}
                >
                  <Image
                    src={
                      courseData.image_url
                        ? `${process.env.NEXT_PUBLIC_API_URL}${courseData.image_url}`
                        : "/images/placeholder.jpeg"
                    }
                    width={20}
                    height={20}
                    alt={technology}
                  ></Image>
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles["course__content-images"]}>
          <Image
            src={
              courseData.image_url
                ? `${process.env.NEXT_PUBLIC_API_URL}${courseData.image_url}`
                : "/images/placeholder.jpeg"
            }
            width={500}
            height={500}
            alt={courseData.title}
            className={styles["course__content-image"]}
          ></Image>
        </div>
      </div>
      <CourseProgram courseId={courseId} />
    </section>
  );
};

export default CoursePage;
