"use client";

import React, { useEffect, useState } from "react";
import { ModuleService } from "@/services/module.service";
import { LectureService } from "@/services/lecture.service";
import styles from "./CourseProgramm.module.scss";
import { Module } from "@/types/module.types";
import { Lecture } from "@/types/lecture.types";
import {
  LuCirclePlay,
  LuListChecks,
  LuCode,
  LuFileText,
  LuCircleHelp,
} from "react-icons/lu";
import Heading from "@/shared/ui/Heading/Heading";

const lectureTypeMap = {
  VIDEO: { icon: <LuCirclePlay />, label: "Видео" },
  TEST: { icon: <LuListChecks />, label: "Тест" },
  CODE: { icon: <LuCode />, label: "Код" },
  TEXT: { icon: <LuFileText />, label: "Лекция" },
  OTHER: { icon: <LuCircleHelp />, label: "Другое" },
};

interface Props {
  courseId: string;
}

const CourseProgram: React.FC<Props> = ({ courseId }) => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    setActiveModuleId((prev) => (prev === moduleId ? null : moduleId));
  };

  const [modules, setModules] = useState<Module[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const [modulesData, lecturesData] = await Promise.all([
          ModuleService.moduleById(courseId),
          LectureService.lectureByCourseId(courseId),
        ]);
        setModules(modulesData);
        setLectures(lecturesData);
      } catch (error) {
        console.error("Ошибка загрузки программы:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [courseId]);

  if (loading) return <div>Загрузка программы...</div>;

  return (
    <div className={styles["program"]}>
      <Heading level={2} className={styles["program__title"]}>
        Программа курса
      </Heading>
      <div className={styles["program__content"]}>
        {modules.map((module) => {
          const moduleLectures = lectures
            .filter((lecture) => lecture.module_id === module.module_id)
            .sort((a, b) => a.order - b.order);

          return (
            <div key={module.module_id} className={styles["program-item"]}>
              <button
                className={`${styles["accordion"]} ${
                  activeModuleId === String(module.module_id)
                    ? styles["active"]
                    : ""
                }`}
                onClick={() => toggleModule(String(module.module_id))}
              >
                {`Модуль ${module.order}. ${module.title}`}
              </button>

              <div
                className={`${styles["panel"]} ${
                  activeModuleId === String(module.module_id)
                    ? styles["active"]
                    : ""
                }`}
              >
                <div className={styles["panel-content"]}>
                  <p className={styles["module-text"]}>{module.description}</p>
                  <ul className={styles["module-list-items"]}>
                    {moduleLectures.map((lecture) => (
                      <li
                        key={lecture.lecture_id}
                        className={styles["module-list-item"]}
                      >
                        {lectureTypeMap[lecture.type]?.icon}{" "}
                        {`Лекция ${lecture.order}: ${lecture.title}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseProgram;
