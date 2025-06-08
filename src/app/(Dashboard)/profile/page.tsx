import { getServerSession } from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import styles from "./profilePage.module.scss";
import { format } from "date-fns";
import CourseUserCard from "@/widget/CourseUserCard/CourseUserCard";
import { CourseService } from "@/shared/services/course.service";
import { Course } from "@/types/course.types";
import { UserService } from "@/shared/services/user.service";
import Heading from "@/shared/ui/Heading/Heading";
import { LectureService } from "@/shared/services/lecture.service";

interface UserCourseProgress {
  course_id: number;
  progress: number;
  completedLectureIds: number[];
}

export default async function ProfilePage() {
  const user = await getServerSession();
  const courseData = await CourseService.courseAll();
  const userCourseProgress: UserCourseProgress[] =
    await UserService.userProgress(user.user_id);
  const lecturesData = await LectureService.lecture();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={styles["profile"]}>
      <Heading align="center" className={styles["profile__title"]}>
        Профиль
      </Heading>
      <div className={styles["profile__content"]}>
        <div className={styles["profile__info"]}>
          <Heading level={2} className={styles["profile__section-title"]}>
            Основная информация
          </Heading>
          <p className={styles["profile__info-label"]}>
            Фамилия: {user?.surname}
          </p>
          <p className={styles["profile__info-label"]}>Имя: {user?.name}</p>
          <p className={styles["profile__info-label"]}>
            Отчество: {user?.patronymic || "Не указано"}
          </p>
          <p className={styles["profile__registration-date"]}>
            Дата регистрации: {format(new Date(user?.createdAt), "dd.MM.yyyy")}
          </p>
        </div>

        <div>
          <Heading level={2} className={styles["profile__section-title"]}>
            Мои курсы
          </Heading>
          <div className={styles["profile__courses"]}>
            {userCourseProgress && userCourseProgress.length > 0 ? (
              courseData.map((course: Course) => {
                const progressData = userCourseProgress.find(
                  (progress) => progress.course_id === course.course_id
                );
                const userProgress = progressData ? progressData.progress : 0;
                const courseLectures = lecturesData.filter(
                  (lecture) => lecture.course_id === course.course_id
                );
                const completedLectureIds =
                  progressData?.completedLectureIds || [];

                return (
                  <CourseUserCard
                    key={course.course_id}
                    course={course}
                    userProgress={userProgress}
                    lectures={courseLectures}
                    completedLectureIds={completedLectureIds}
                  />
                );
              })
            ) : (
              <p className={styles["profile__no-courses"]}>
                Нет курсов, на которые вы записаны.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
