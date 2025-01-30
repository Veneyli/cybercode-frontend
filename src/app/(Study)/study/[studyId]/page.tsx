"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./studyPage.module.scss";
import { useCourse } from "@/shared/hooks/useCourse";

export default function StudyPage() {
  const { studyId } = useParams<{ studyId: string }>();
  const { course, loading, error } = useCourse(studyId);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке курса: {error}</div>;
  if (!course) return <div>Курс не найден</div>;

  const technologies = course?.technologies?.split(", ") || [];
  console.log(course);
  return (
    <div className={styles["study-page"]}>
      <h1 className={styles["study-page__title"]}>{course?.title}</h1>
      <div className={styles["study-page__content"]}>
        <div className={styles["study-page__description"]}>
          <p>{course?.description}</p>
        </div>
        {course?.image_url && (
          <div className={styles["study-page__image-wrapper"]}>
            <Image
              className={styles["study-page__image"]}
              src={course.image_url || "/images/placeholder.jpg"}
              alt={course?.title || "Курс"}
              width={300}
              height={300}
            />
          </div>
        )}
      </div>
      <div className={styles["study-page__technologies"]}>
        <h3 className={styles["study-page__technologies-title"]}>
          Изучаемые технологии
        </h3>
        {technologies.length > 0 ? (
          technologies.map((technology, idx) => (
            <div className={styles["study-page__technologies-item"]} key={idx}>
              <Image
                className={styles["study-page__technologies-item-image"]}
                src={"/images/placeholder.jpg"}
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
    </div>
  );
}
