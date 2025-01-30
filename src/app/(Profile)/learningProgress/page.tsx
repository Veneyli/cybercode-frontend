"use client";

import { useUser } from "@/shared/hooks/useUser";
import { useCourse } from "@/shared/hooks/useCourses";
import CourseCardUser from "@/shared/components/CourseCardUser/CourseCardUser";
import styles from "./learningProgressPage.module.scss";
import { useSession } from "@/shared/hooks/useSession";

export default function LearningProgressPage() {
  const session = useSession();
  const user_id = session.user?.user?.user_id;
  const { user, loading: userLoading } = useUser(user_id);
  const { courses, loading: coursesLoading } = useCourse();

  if (!user || userLoading || coursesLoading) {
    return <p>Загрузка...</p>;
  }

  const enrolledCourses = user.progresses
    ? user.progresses
        .map((progress) =>
          courses.find((course) => course.course_id === progress.course_id)
        )
        .filter(Boolean)
    : [];

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(
        (enrolled) => enrolled.course_id === course.course_id
      )
  );

  return (
    <div className={styles["learning"]}>
      <h1 className={styles["learning__title"]}>Мое обучение</h1>

      <div className={styles["learning__section"]}>
        <h2 className={styles["learning__subtitle"]}>Вы записаны на курсы</h2>
        <div className={styles["learning__list"]}>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <CourseCardUser
                key={course.course_id}
                id={course.course_id}
                title={course.title}
                smallDescription={course.small_description}
                imageUrl={course.image_url}
                progress={
                  user.progresses.find((p) => p.course_id === course.course_id)
                    ?.progress || 0
                }
              />
            ))
          ) : (
            <p>Вы пока не записаны на курсы.</p>
          )}
        </div>
      </div>

      <div className={styles["learning__section"]}>
        <h2 className={styles["learning__subtitle"]}>Все доступные курсы</h2>
        <div className={styles["learning__list"]}>
          {availableCourses.length > 0 ? (
            availableCourses.map((course) => (
              <CourseCardUser
                key={course.course_id}
                id={course.course_id}
                title={course.title}
                smallDescription={course.small_description}
                imageUrl={course.image_url}
              />
            ))
          ) : (
            <p>Все курсы уже пройдены!</p>
          )}
        </div>
      </div>
    </div>
  );
}
