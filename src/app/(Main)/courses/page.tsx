import React from "react";
import styles from "./courses.module.scss";
import { Metadata } from "next";
import CourseCard from "@/shared/components/CourseCard/CourseCard";
import CoursesFilter from "@/shared/components/CoursesFilter/CoursesFilter";

export const metadata: Metadata = {
  title: "CyberCode: Поиск курсов",
  description: "HTML, CSS, изучение, обучение",
};

export default async function CoursesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  }
  return (
    <div className={styles.courses}>
      <div className={styles.courses__sidebar}>
        {" "}
        Тут должен быть фильтр, но он еще в разработке{/* <CoursesFilter /> */}
      </div>
      <div className={styles.courses__content}>
        <h1 className={styles.courses__title}>Каталог</h1>

        <div className={styles.courses__list}>
          {coursesData && coursesData.length > 0 ? (
            coursesData.map((course: Course) => (
              <CourseCard
                key={course.course_id}
                id={course.course_id}
                title={course.title}
                smallDescription={course.small_description}
                imageUrl={course.image_url}
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
