import styles from "./coursesPage.module.scss";
import FilterCoursesClient from "@/widget/FilterCourseClient/FilterCoursesClient";
import { CourseService } from "@/services/course.service";
import { Course } from "@/shared/types/course.types";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cybercode: Каталог курсов",
  description: "Каталог курсов на платформе Cybercode",
};

export default async function CoursesPage() {
  let initialCourses: Course[] = [];

  try {
    const response = await CourseService.courseAll();
    initialCourses = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Ошибка при получении курсов:", error);
  }

  return (
    <div className={styles["courses"]}>
      <FilterCoursesClient initialCourses={initialCourses} />
    </div>
  );
}
