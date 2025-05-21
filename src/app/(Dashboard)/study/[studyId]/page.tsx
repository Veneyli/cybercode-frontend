import { CourseService } from "@/services/course.service";
import { UserService } from "@/services/user.service";
import Image from "next/image";
import styles from "./studyPage.module.scss";
import { Course } from "@/shared/types/course.types";
import { getServerSession } from "@/lib/getServerSession";
// import Link from "next/link";
import { EnrollButton } from "@/widget/EnrollButton/EnrollButton";
interface UserCourseProgress {
  course_id: number;
  progress: number;
}
const StudyDetailsPage = async ({
  params,
}: {
  params: { studyId: string };
}) => {
  const user = await getServerSession();
  const resolvedParams = await params;
  const courseId = resolvedParams.studyId;
  const course: Course = await CourseService.courseById(courseId);
  const userCourseProgress: UserCourseProgress[] =
    await UserService.userProgress(user.user_id);
  const isEnrolled = userCourseProgress.length > 0;
  if (!course) {
    return <p>Курс не найден</p>;
  }
  const technologies = course?.technologies?.split(", ") || [];


  // const progress = await UserService.userProgress(courseId);
  // isEnrolled = !!progress?.data;

  return (
    <div className={styles["study-page"]}>
      <div className={styles["study-page__content"]}>
        <div className={styles["study-page__description"]}>
          <h1 className={styles["study-page__title"]}>{course.title}</h1>
          <p>{course.description}</p>
        </div>
        {course.image_url && (
          <div className={styles["study-page__image-wrapper"]}>
            <Image
              className={styles["study-page__image"]}
              src={course.image_url || "/images/placeholder.jpg"}
              alt={course.title}
              width={500}
              height={400}
            />
          </div>
        )}
      </div>

      <h3 className={styles["study-page__technologies-title"]}>
        Изучаемые технологии
      </h3>
      <div className={styles["study-page__technologies"]}>
        {technologies.length > 0 ? (
          technologies.map((technology, idx) => (
            <div className={styles["study-page__technologies-item"]} key={idx}>
              <Image
                className={styles["study-page__technologies-item-image"]}
                src={`/images/icon/${technology.toLowerCase()}.png`}
                alt={technology}
                width={30}
                height={30}
              />
              <p className={styles["study-page__technologies-item-text"]}>
                {technology}
              </p>
            </div>
          ))
        ) : (
          <p>Нет доступных технологий для этого курса.</p>
        )}
      </div>
      {!user ? (
        <p>Войдите, чтобы поступить на курс.</p>
      ) : !isEnrolled ? (
        <EnrollButton
          courseId={course.course_id}
          initiallyEnrolled={isEnrolled}
        />
      ) : (
        <p>Вы записаны на курс</p>
      )}
    </div>
  );
};

export default StudyDetailsPage;
