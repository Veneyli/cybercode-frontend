"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./SidebarStudy.module.scss";
import { ModuleService } from "@/services/module.service";
import { LectureService } from "@/services/lecture.service";
import { CourseService } from "@/services/course.service";
import { Course } from "@/shared/types/course.types";
import Button from "@/shared/ui/Button/Button";
import { IoClose } from "react-icons/io5";
import { Module } from "@/types/module.types";
import { Lecture } from "@/types/lecture.types";
import { useLectureProgress } from "@/app/providers/LectureProgressContext";

import {
  LuCirclePlay,
  LuListChecks,
  LuCode,
  LuFileText,
  LuCircleHelp,
} from "react-icons/lu";
import { useSession } from "@/shared/hooks/useSession";

interface SidebarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const SidebarStudy: React.FC<SidebarProps> = ({
  toggleSidebar,
  isSidebarOpen,
}) => {
  const user = useSession();
  const userId = user.user?.user_id;
  const lectureTypeMap = {
    VIDEO: {
      icon: <LuCirclePlay className={styles["navigation__link-icon"]} />,
      label: "Видео",
    },
    TEST: {
      icon: <LuListChecks className={styles["navigation__link-icon"]} />,
      label: "Тест",
    },
    CODE: {
      icon: <LuCode className={styles["navigation__link-icon"]} />,
      label: "Код",
    },
    TEXT: {
      icon: <LuFileText className={styles["navigation__link-icon"]} />,
      label: "Лекция",
    },
    OTHER: {
      icon: <LuCircleHelp className={styles["navigation__link-icon"]} />,
      label: "Другое",
    },
  };
  const { studyId } = useParams<{ studyId: string }>();
  const { setRefreshProgress } = useLectureProgress();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshProgress = async () => {
    if (!studyId || !userId) return;
    try {
      const updatedLectures = await LectureService.lectureWithProgressByCourse(
        studyId,
        userId
      );
      setLectures(updatedLectures);
    } catch (err) {
      console.error("Ошибка при обновлении прогресса", err);
    }
  };

  useEffect(() => {
    setRefreshProgress(() => refreshProgress);
  }, [studyId, userId]);

  useEffect(() => {
    if (!userId || !studyId) {
      setLoading(true);
      return;
    }

    const fetchData = async () => {
      try {
        const [courseData, modulesData, lecturesData] = await Promise.all([
          CourseService.courseById(studyId),
          ModuleService.moduleById(studyId),
          LectureService.lectureWithProgressByCourse(studyId, userId),
        ]);
        setCourse(courseData);
        setModules(modulesData);
        setLectures(lecturesData);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studyId, userId]);

  const handleToggleMenu = () => {
    toggleSidebar();
  };

  if (loading || !course) {
    return <div>Загрузка...</div>;
  }
  return (
    <div
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.show : styles.hide
      }`}
    >
      <div>
        <div className={styles["sidebar__header"]}>
          <Button
            onClick={handleToggleMenu}
            icon={<IoClose />}
            variant="transparent"
          />
        </div>
        <nav className={styles["navigation"]}>
          <div>
            {modules?.map((module, moduleIndex) => {
              const moduleLectures =
                lectures
                  ?.filter((lecture) => lecture.module_id === module.module_id)
                  .sort((a, b) => a.order - b.order) || [];

              return (
                <details
                  key={module.module_id || `module-${moduleIndex}`}
                  className={styles["navigation__details"]}
                >
                  <summary className={styles["navigation__details-title"]}>
                    {`Модуль ${module.order}. ${module.title}`}
                  </summary>
                  <ul className={styles["navigation__list"]}>
                    {moduleLectures.map((lecture) => (
                      <li
                        key={`${module.module_id || "default-module"}-${
                          lecture.lecture_id
                        }`}
                        className={`${styles["navigation__item"]} ${
                          !!lecture.userProgress ? styles["completed"] : ""
                        }`}
                      >
                        <Link
                          className={styles.navigation__link}
                          href={`/study/${studyId}/lectures/${lecture.lecture_id}`}
                        >
                          {lectureTypeMap[lecture.type]?.icon}
                          {`Лекция ${lecture.order}.  ${lecture.title}`}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarStudy;
