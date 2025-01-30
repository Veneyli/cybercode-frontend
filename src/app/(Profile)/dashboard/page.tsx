"use client";

import { useState, useEffect } from "react";
import styles from "./dashboardPage.module.scss";
import { useUser } from "@/shared/hooks/useUser";
import { useCourse } from "@/shared/hooks/useCourses";
import { format } from "date-fns";
import CourseCardUser from "@/shared/components/CourseCardUser/CourseCardUser";
import { useSession } from "@/shared/hooks/useSession";

export default function DashboardPage() {
  const session = useSession();
  const user_id = session.user?.user.user_id;
  const { user, loading: userLoading, error: userError } = useUser(user_id);
  const { courses, loading: coursesLoading, error: coursesError } = useCourse();

  console.log(user, courses);

  if (!user || userLoading || coursesLoading) {
    return <p>Загрузка...</p>;
  }

  if (userError || coursesError) {
    return <p>Ошибка: {userError || coursesError}</p>;
  }

  const userCourses = user.progresses
    ? user.progresses
        .map((progress) =>
          courses.find((course) => course.course_id === progress.course_id)
        )
        .filter(Boolean)
    : [];

  return (
    <div className={styles["dashboard"]}>
      <h1 className={styles["dashboard__title"]}>Профиль</h1>
      <div className={styles["dashboard__content"]}>
        <div className={styles["dashboard__info"]}>
          <h3 className={styles["dashboard__section-title"]}>
            Основная информация
          </h3>
          <p className={styles["dashboard__info-label"]}>
            Фамилия: {user.surname}
          </p>
          <p className={styles["dashboard__info-label"]}>Имя: {user.name}</p>
          <p className={styles["dashboard__registration-date"]}>
            Дата регистрации: {format(new Date(user.createdAt), "dd.MM.yyyy")}
          </p>
        </div>

        <div className={styles["dashboard__learning"]}>
          <h3 className={styles["dashboard__section-title"]}>Мое обучение</h3>
          <div className={styles["dashboard__learning-list"]}>
            {userCourses.length > 0 ? (
              userCourses.map((course) => (
                <CourseCardUser
                  key={course.course_id}
                  id={course.course_id}
                  title={course.title}
                  smallDescription={course.small_description}
                  imageUrl={course.image_url}
                  progress={
                    user.progresses.find(
                      (progress) => progress.course_id === course.course_id
                    )?.progress || 0
                  }
                />
              ))
            ) : (
              <p>У вас нет прогресса в обучении.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
