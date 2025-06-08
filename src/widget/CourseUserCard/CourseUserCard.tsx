import styles from "./CourseUserCard.module.scss";
import { Course } from "@/types/course.types";
import { Lecture } from "@/types/lecture.types";
import Image from "next/image";
import Button from "@/ui/Button/Button";
import Link from "next/link";
import {
  LuCirclePlay,
  LuListChecks,
  LuCode,
  LuFileText,
  LuCircleHelp,
} from "react-icons/lu";

const CourseUserCard = ({
  course,
  lectures,
  userProgress,
  completedLectureIds,
}: {
  course: Course;
  lectures: Lecture[];
  userProgress: number;
  completedLectureIds: number[];
}) => {
  // const sortedLectures = [...lectures].sort((a, b) => a.order - b.order);
  const lectureTypeMap = {
    VIDEO: {
      icon: <LuCirclePlay />,
      label: "Видео",
    },
    TEST: {
      icon: <LuListChecks />,
      label: "Тест",
    },
    CODE: {
      icon: <LuCode />,
      label: "Код",
    },
    TEXT: {
      icon: <LuFileText />,
      label: "Лекция",
    },
    OTHER: {
      icon: <LuCircleHelp />,
      label: "Другое",
    },
  };
  const sortedLectures = [...lectures].sort((a, b) => {
    if (a.module_id === b.module_id) {
      return a.order - b.order;
    }
    return a.module_id - b.module_id;
  });

  const nextLecture =
    sortedLectures.find(
      (lecture) => !completedLectureIds.includes(lecture.lecture_id)
    ) || sortedLectures[0];

  return (
    <div className={styles["course-card"]} key={course.course_id}>
      <div className={styles["course-card__header"]}>
        <div className={styles["course-card__images"]}>
          <Image
            src={course.image_url || "/images/placeholder.jpg"}
            width={300}
            height={200}
            alt={course.title}
            className={styles["course-card__image"]}
          />
        </div>
        <div className={styles["course-card__info"]}>
          <h3 className={styles["course-card__title"]}>{course.title}</h3>
          <p className={styles["course-card__description"]}>
            {course.small_description}
          </p>
        </div>
      </div>
      <div className={styles["course-card__content"]}>
        {sortedLectures.length > 0 ? (
          <>
            <div className={styles["course-card__progress"]}>
              <div className={styles["course-card__progress-bar"]}>
                <div
                  className={styles["course-card__progress-bar-fill"]}
                  style={{ width: `${userProgress}%` }}
                ></div>
              </div>
              <div className={styles["course-card__progress-labels"]}>
                <p className={styles["course-card__progress-value"]}>
                  {userProgress}%
                </p>
                <p className={styles["course-card__progress-value"]}>100%</p>
              </div>
            </div>

            <div className={styles["course-card__last-lesson"]}>
              <div className={styles["course-card__play-icon"]}>
                {lectureTypeMap[nextLecture.type]?.icon}
              </div>
              <div className={styles["course-card__lesson-info"]}>
                <small className={styles["course-card__lesson-small"]}>
                  Следующий урок -{" "}
                  {lectureTypeMap[nextLecture.type]?.label || "Неизвестно"}
                </small>
                <p className={styles["course-card__lesson-text"]}>
                  Урок {nextLecture.module_id}.{nextLecture.order}{" "}
                  {nextLecture.title}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className={styles["course-card__no-lessons"]}>
            У этого курса пока нет лекций.
          </p>
        )}
      </div>

      <div className={styles["course-card__footer"]}>
        {nextLecture ? (
          <Link
            href={`/study/${course.course_id}/lectures/${nextLecture.lecture_id}`}
          >
            <Button size="medium" label="Продолжить обучение" />
          </Link>
        ) : (
          <Button size="medium" label="Курс в разработке" disabled />
        )}
      </div>
    </div>
  );
};
export default CourseUserCard;
