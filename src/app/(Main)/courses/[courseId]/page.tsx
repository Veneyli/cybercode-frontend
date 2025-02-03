import React from "react";
import styles from "./coursePage.module.scss";
import Image from "next/image";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}
export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  let courseData: Course | null = null;

  try {
    const response = await fetch(`${API_URL}/api/courses/${courseId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Не удалось получить данные публикации");
    }

    courseData = await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }

  if (!courseData) {
    return <p>Пост не найден</p>;
  }

  return (
    <div className={styles.course}>
      <div className={styles.course__details}>
        <div className={styles.course__description}>
          <h1 className={styles.course__title}>{courseData.title}</h1>
          <p className={styles.course__text}>{courseData.description}</p>
          <h3 className={styles.course__subtitle}>Изучаемые технологии:</h3>
          <div className={styles.course__tehnologies}>
            {courseData.tehnologies ? (
              courseData.tehnologies.split(", ").map((technology, id) => (
                <div className={styles.tehnologies__item} key={id}>
                  <Image
                    src={"/images/placeholder.jpg"}
                    alt={technology}
                    width={30}
                    height={30}
                  />
                  <p className={styles.tehnologies__text}>{technology}</p>
                </div>
              ))
            ) : (
              <p>Нет доступных технологий для этого курса.</p>
            )}
          </div>
        </div>
        <div className={styles.course__image}>
          <Image
            src={courseData.image_url || "/images/placeholder.jpg"}
            alt="Картинка курса"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className={styles.course__content}>
        <p className={styles.course__text}>{courseData.content}</p>
      </div>
    </div>
  );
}
