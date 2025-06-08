"use client";

import React, { useEffect, useState } from "react";
import { ModuleService } from "@/services/module.service";
import { LectureService } from "@/services/lecture.service";
import styles from "./CourseProgramStatic.module.scss";
import { Module } from "@/types/module.types";
import { Lecture } from "@/types/lecture.types";
import Heading from "@/shared/ui/Heading/Heading";

interface Props {
  courseId: string;
}

const CourseProgramStatic: React.FC<Props> = ({ courseId }) => {
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

  const renderList = (items: string[]) => (
    <ul className={styles["program__list"]}>
      {items.map((text, index) => (
        <li
          key={index}
          className={`${styles["program__item"]} ${styles["program__item--completed"]}`}
        >
          {text}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles["program"]}>
      <section className={styles["program__section"]}>
        <Heading level={2} className={styles["program__section-title"]}>
          Программа курса и его эффективное прохождение
        </Heading>
        {renderList([
          "Обзор курса и его целей",
          "Предварительный просмотр проектов",
          "Рекомендации по эффективному обучению",
        ])}
      </section>

      <section className={styles["program__section"]}>
        <Heading level={2} className={styles["program__section-title"]}>
          Модули курса
        </Heading>
        <div className={styles["program__content"]}>
          {modules
            .sort((a, b) => a.order - b.order)
            .map((module) => {
              const moduleLectures = lectures
                .filter((lecture) => lecture.module_id === module.module_id)
                .sort((a, b) => a.order - b.order);

              return (
                <div
                  key={module.module_id}
                  className={styles["program__module"]}
                >
                  <Heading
                    level={3}
                    className={styles["program__module-title"]}
                  >
                    {module.order}. {module.title}
                  </Heading>

                  {moduleLectures.length > 0 && (
                    <ul className={styles["program__module-list"]}>
                      {moduleLectures.map((lecture) => (
                        <li
                          key={lecture.lecture_id}
                          className={styles["program__module-item"]}
                        >
                          {lecture.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      </section>

      <section className={styles["program__section"]}>
        <Heading level={2} className={styles["program__section-title"]}>
          Материалы курса
        </Heading>
        {renderList([
          "Репозиторий с проектом и кодом",
          "Список материалов",
          "Упражнения и тесты для самостоятельного решения",
        ])}
      </section>

      <section className={styles["program__section"]}>
        <Heading level={2} className={styles["program__section-title"]}>
          Рекомендации по прохождению
        </Heading>
        {renderList([
          "Теоретические лекции: вдумчивое просмотрение с паузами",
          "Практика кодирования: активное участие с редактором и браузером",
          "Решение упражнений: самостоятельная работа перед проверкой решений",
          "Тесты: для закрепления теории",
        ])}
      </section>
      <section className={styles["program__section"]}>
        <Heading level={2} className={styles["program__section-title"]}>
          Заключение
        </Heading>
        {renderList([
          "Цель курса: освоение базовых навыков и понимание дальнейшего пути развития.",
        ])}
      </section>
    </div>
  );
};

export default CourseProgramStatic;
