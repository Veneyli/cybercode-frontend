import React from "react";
import styles from "./courses.module.scss";
import { Metadata } from "next";
import CourseCard from "@/shared/components/CourseCard/CourseCard";
import CoursesFilter from "@/shared/components/CoursesFilter/CoursesFilter";

export const metadata: Metadata = {
  title: "CyberCode: Поиск курсов",
  description: "Переделать описание",
};

export default async function CoursesPage() {
  const API_URL = "http://localhost:4000";

  let coursesData: Course | null = null;

  try {
    const response = await fetch(`${API_URL}/api/courses`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Не удалось получить данные курсов");
    }

    coursesData = await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!coursesData) {
    return <p>Пост не найден</p>;
  }
  return (
    <div className={styles.courses}>
      <div className={styles.courses__sidebar}>{/* <CoursesFilter /> */}</div>
      <div className={styles.courses__content}>
        <h1 className={styles.courses__title}>Каталог</h1>

        <div className={styles.courses__list}>
          {coursesData.map((course) => (
            <CourseCard
              key={course.course_id}
              id={course.course_id}
              title={course.title}
              smallDescription={course.small_description}
              imageUrl={course.image_url }
              progress={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
