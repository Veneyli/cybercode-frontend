import Heading from "@/shared/ui/Heading/Heading";
import styles from "./studiesPage.module.scss";
import Image from "next/image";
import Link from "next/link";
import { CourseService } from "@/shared/services/course.service";
import { Course } from "@/types/course.types";
import Button from "@/shared/ui/Button/Button";

const StudiesPage = async () => {
  const courses: Course[] = (await CourseService.courseAll()) || [];
  return (
    <div className={styles["studies"]}>
      <div className={styles["studies__create-button"]}>
        <Link href="/admin/create-course">
          <Button label="Создать курс" />
        </Link>
      </div>
      <Heading align="center" level={1} className={styles["studies__title"]}>
        Учебные материалы
      </Heading>
      <div className={styles["studies__content"]}>
        <div className={styles["studies__list"]}>
          {courses.length > 0 ? (
            courses.map((course: Course) => (
              <div key={course.course_id} className={styles["studies__item"]}>
                <div className={styles["studies__item-images"]}>
                  <Image
                    src={"/images/placeholder.jpg"}
                    alt="Описание изображения"
                    width={300}
                    height={200}
                    className={styles["studies__item-image"]}
                    unoptimized
                  />
                </div>
                <div className={styles["studies__item-info"]}>
                  <Heading level={2} className={styles["studies__item-title"]}>
                    {course.title}
                  </Heading>
                  <p className={styles["studies__item-description"]}>
                    {course.description}
                  </p>
                  <Link
                    href={`/admin/edit-course/${course.course_id}`}
                    className={styles["studies__item-button"]}
                  >
                    <Button label="Перейти к материалу" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Нет доступных курсов.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudiesPage;
