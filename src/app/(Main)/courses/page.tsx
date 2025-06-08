import styles from "./coursesPage.module.scss";
import FilterCoursesClient from "@/widget/FilterCourseClient/FilterCoursesClient";
import { CourseService } from "@/services/course.service";

export default async function CoursesPage() {
  const initialCourses = await CourseService.courseAll();

  return (
    <div className={styles["courses"]}>
      <FilterCoursesClient initialCourses={initialCourses} />
    </div>
  );
}
