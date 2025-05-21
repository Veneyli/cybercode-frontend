import Search from "@/widget/Search/Search";
import styles from "./coursesPage.module.scss";
import { CourseService } from "@/services/course.service";
import CourseCard from "@/components/CourseCard/CourseCard";
import { Course } from "@/types/course.types";

export default async function CoursesPage() {
  const coursesData: Course[] = await CourseService.courseAll();

  return (
    <div className={styles["courses"]}>
      <div className={styles["courses__sidebar"]}></div>
      <div className={styles["courses__content"]}>
        <h1 className={styles["courses__title"]}>Каталог</h1>
        <Search />
        <div className={styles["courses__list"]}>
          {coursesData.length > 0 ? (
            coursesData.map((course, index) => (
              <CourseCard
                key={course.course_id}
                course={course}
                index={index}
              />
            ))
          ) : (
            <p>Курсы не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
}
