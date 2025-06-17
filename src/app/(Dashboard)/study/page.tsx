import styles from "./studyPage.module.scss";
import { CourseService } from "@/shared/services/course.service";
import { Course } from "@/shared/types/course.types";
import CourseUserCard from "@/widget/CourseUserCard/CourseUserCard";
import { LectureService } from "@/shared/services/lecture.service";
import Heading from "@/shared/ui/Heading/Heading";
import CourseCardProfile from "@/components/CourseCardProfile/CourseCardProfile";
import { getServerSession } from "@/lib/getServerSession";
import { UserService } from "@/shared/services/user.service";

export const dynamic = "force-dynamic";

interface UserCourseProgress {
  course_id: number;
  progress: number;
  completedLectureIds: number[];
}

const StudyPage = async () => {
  const user = await getServerSession();
  const courseData = await CourseService.courseAll();
  const userCourseProgress: UserCourseProgress[] =
    await UserService.userProgress(user.user_id);
  const lecturesData = await LectureService.lecture();

  return (
    <div className={styles["study"]}>
      <div className={styles["study__content"]}>
        <Heading align="center" className={styles["study__title"]}>
          Все курсы
        </Heading>
        <div>
          <Heading level={2} className={styles["study__courses-title"]}>
            Мое обучение
          </Heading>
          <div className={styles["study__courses-list"]}>
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
        <div>
          <Heading level={2} className={styles["study__courses-title"]}>
            Все курсы
          </Heading>
          <div className={styles["study__courses-list"]}>
            {courseData.length > 0 ? (
              courseData.map((course: Course, index: number) => (
                <CourseCardProfile
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
    </div>
  );
};

export default StudyPage;
