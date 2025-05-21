// "use client";
import { CourseService } from "@/services/course.service";
import styles from "./coursePage.module.scss";
import Image from "next/image";
import { Course } from "@/shared/types/course.types";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId;
  const courseData: Course = await CourseService.courseById(courseId);
  const courseTechnologies = courseData.technologies
    ? courseData.technologies.split(", ")
    : [];
  return (
    <section className={styles["course"]}>
      <div className={styles["course__content"]}>
        <div className={styles["course__content-info"]}>
          <h2 className={styles["course__title"]}>{courseData.title}</h2>
          <p className={styles["course__description"]}>
            {courseData.description}
          </p>
          <div className={styles["course__technologies-items"]}>
            {courseTechnologies.map((technology, index) => (
              <div key={index} className={styles["course__technologies-item"]}>
                <Image
                  src={
                    // `images/icon/${technology}.png` ||
                    "/images/placeholder.png"
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

        <div className={styles.course__content__image}>
          <Image
            src={courseData.image_url}
            width={500}
            height={500}
            alt={courseData.title}
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default CoursePage;
