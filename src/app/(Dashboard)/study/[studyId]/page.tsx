import { CourseService } from "@/services/course.service";
import { UserService } from "@/services/user.service";
import Image from "next/image";
import styles from "./studyPage.module.scss";
import { Course } from "@/shared/types/course.types";
import { getServerSession } from "@/lib/getServerSession";
// import Link from "next/link";
import { EnrollButton } from "@/widget/EnrollButton/EnrollButton";
import Heading from "@/shared/ui/Heading/Heading";
import CourseProgramStatic from "@/shared/components/CourseProgrammStatic/CourseProgrammStatic";
import { LectureService } from "@/shared/services/lecture.service";

export const dynamic = "force-dynamic";

interface UserCourseProgress {
  course_id: number;
  progress: number;
}

const StudyDetailsPage = async (props: {
  params: Promise<{ studyId: string }>;
}) => {
  const { studyId } = await props.params;
  const user = await getServerSession();
  const courseId = studyId;
  const course: Course = await CourseService.courseById(courseId);
  const userCourseProgress: UserCourseProgress[] =
    await UserService.userProgress(user.user_id);
  const isEnrolled = userCourseProgress.length > 0;
  const lectures = await LectureService.lectureByCourseId(courseId);
  if (!course) {
    return <p>Курс не найден</p>;
  }
  const technologies = course?.technologies || [];

  return (
    <div className={styles["study-page"]}>
      <div className={styles["study-page__content"]}>
        <div className={styles["study-page__description"]}>
          <Heading
            level={1}
            align="center"
            className={styles["study-page__title"]}
          >
            {course.title}
          </Heading>
          <p>{course.description}</p>
          <div>
            <Heading
              level={2}
              className={styles["study-page__technologies-title"]}
            >
              Изучаемые технологии
            </Heading>
            <div className={styles["study-page__technologies"]}>
              {technologies.length > 0 ? (
                technologies.map((technology, idx) => (
                  <div
                    className={styles["study-page__technologies-item"]}
                    key={idx}
                  >
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
                firstLectureId={lectures[0]?.lecture_id}
              />
            ) : (
              <p>Вы записаны на курс</p>
            )}
          </div>
        </div>

        {course.image_url && (
          <div className={styles["study-page__image-wrapper"]}>
            <Image
              className={styles["study-page__image"]}
              src={
                course.image_url
                  ? `${process.env.NEXT_PUBLIC_API_URL}${course.image_url}`
                  : "/images/placeholder.jpeg"
              }
              alt={course.title}
              width={500}
              height={400}
              unoptimized
            />
          </div>
        )}
      </div>
      <CourseProgramStatic courseId={courseId} />
    </div>
  );
};

export default StudyDetailsPage;
