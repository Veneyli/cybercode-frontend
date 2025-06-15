"use client";

import React, { useState, useEffect } from "react";
import SidebarStudy from "@/widget/SidebarStudy/SidebarStudy";
import styles from "./layout.module.scss";
import Button from "@/shared/ui/Button/Button";
import { IoListOutline } from "react-icons/io5";
import { LectureProgressProvider } from "@/app/providers/LectureProgressContext";
import { useParams, useRouter } from "next/navigation";
import { LectureService } from "@/shared/services/lecture.service";
import { UserService } from "@/shared/services/user.service";
import { useSession } from "@/shared/hooks/useSession";

type Lecture = {
  lecture_id: string;
  order: number;
};

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([]);

  const params = useParams<{ studyId: string; lectureId: string }>();
  const router = useRouter();

  const studyId = params.studyId;
  const lectureId = params.lectureId;

  const { user } = useSession();
  const userId = user?.user_id;

  useEffect(() => {
    if (!studyId || !userId) {
      setIsEnrolled(false);
      return;
    }

    const checkEnrollment = async () => {
      try {
        const progress = await UserService.userProgress(userId);

        if (Array.isArray(progress) && progress.length > 0) {
          setIsEnrolled(true);
        } else {
          setIsEnrolled(false);
        }
      } catch (error) {
        console.error("Ошибка при получении прогресса пользователя:", error);
        setIsEnrolled(false);
      }
    };

    checkEnrollment();
  }, [studyId, userId]);

  useEffect(() => {
    if (!isEnrolled) return;

    const fetchLectures = async () => {
      try {
        const data = await LectureService.lectureByCourseId(studyId);
        setLectures(data);
      } catch (error) {
        console.error("Ошибка загрузки лекций:", error);
      }
    };

    fetchLectures();
  }, [studyId, isEnrolled]);

  const sortedLectures = [...lectures].sort(
    (a, b) => Number(a.lecture_id) - Number(b.lecture_id)
  );

  const currentLectureIndex = sortedLectures.findIndex(
    (lecture) => String(lecture.lecture_id) === String(lectureId)
  );

  const prevLecture =
    currentLectureIndex > 0 ? sortedLectures[currentLectureIndex - 1] : null;
  const nextLecture =
    currentLectureIndex >= 0 && currentLectureIndex < sortedLectures.length - 1
      ? sortedLectures[currentLectureIndex + 1]
      : null;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (isEnrolled === null) {
    return <div>Проверяем доступ...</div>;
  }

  return (
    <LectureProgressProvider>
      <div
        className={`${styles.studyLayout} ${
          isSidebarOpen ? styles.expanded : ""
        }`}
      >
        <div className={styles["studyLayout__content"]}>
          {children}

          {isEnrolled ? (
            <div
              style={{
                display: !prevLecture && !nextLecture ? "none" : "flex",
              }}
              className={styles["studyLayout__navigation"]}
            >
              <Button
                label="← Предыдущая лекция"
                disabled={!prevLecture}
                style={{ display: !prevLecture ? "none" : "block" }}
                onClick={() => {
                  if (prevLecture) {
                    router.push(
                      `/study/${studyId}/lectures/${prevLecture.lecture_id}`
                    );
                  }
                }}
              />
              <Button
                label="Следующая лекция →"
                disabled={!nextLecture}
                style={{ display: !nextLecture ? "none" : "block" }}
                onClick={() => {
                  if (nextLecture) {
                    router.push(
                      `/study/${studyId}/lectures/${nextLecture.lecture_id}`
                    );
                  }
                }}
              />
            </div>
          ) : (
            <div>
              Вы не записаны на этот курс. Пожалуйста, запишитесь, чтобы
              получить доступ к урокам.
            </div>
          )}
        </div>

        {isEnrolled && (
          <div className={styles["studyLayout__sidebar"]}>
            <div className={styles["studyLayout__toggleButton"]}>
              {!isSidebarOpen && (
                <Button
                  icon={<IoListOutline />}
                  label="Уроки"
                  onClick={toggleSidebar}
                />
              )}
            </div>
            <SidebarStudy
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        )}
      </div>
    </LectureProgressProvider>
  );
}
