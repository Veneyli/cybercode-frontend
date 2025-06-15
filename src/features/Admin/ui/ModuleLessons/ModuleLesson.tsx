"use client";
import { useState } from "react";
import { Lecture } from "@/shared/types/lecture.types";
import Button from "@/shared/ui/Button/Button";
import Heading from "@/shared/ui/Heading/Heading";
import styles from "./ModuleLesson.module.scss";
import Link from "next/link";
import { LectureService } from "@/shared/services/lecture.service";
import Field from "@/shared/ui/Field/Field";

type ModuleLessonsProps = {
  moduleId: number;
  courseId?: number;
  lessons?: Lecture[];
  onUpdate?: (updatedLecture: Lecture) => void;
  onDelete?: (removedLectureId: number) => void;
};

const ModuleLessons = ({
  lessons = [],
  moduleId,
  courseId,
  onUpdate,
  onDelete,
}: ModuleLessonsProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Lecture["type"]>("TEXT");

  const handleCreateLecture = async () => {
    if (!title.trim()) return alert("Введите название лекции");

    try {
      const newLecture = await LectureService.createLecture({
        title,
        type,
        course_id: courseId ?? lessons?.[0]?.course_id ?? 1,
        module_id: moduleId,
      });

      onUpdate?.(newLecture);
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании лекции");
    } finally {
      setIsCreating(false);
      setTitle("");
      setType("TEXT");
    }
  };
  const types = {
    TEXT: "Лекция",
    VIDEO: "Видеоурок",
    CODE: "Код",
    TEST: "Тест",
  };
  const handleRemoveLesson = async (id: number) => {
    const confirmed = confirm("Вы уверены, что хотите удалить эту лекцию?");
    if (!confirmed) return;

    try {
      await LectureService.deleteLecture(id);

      if (onDelete) onDelete(id);
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении лекции");
    }
  };

  return (
    <div className={styles["lesson"]}>
      <Heading level={4}>Лекции</Heading>
      <div className={styles["lesson__list"]}>
        {lessons.length > 0 ? (
          lessons
            .sort((a, b) => a.order - b.order)
            .map((lesson) => (
              <div key={lesson.lecture_id} className={styles["lesson__item"]}>
                <p>
                  {lesson.order}. {lesson.title} ({types[lesson.type]})
                </p>
                <div className={styles["lesson__actions"]}>
                  <Link
                    className={styles["lesson__edit-link"]}
                    href={`/admin/edit-lecture/${lesson.lecture_id}`}
                  >
                    Редактировать
                  </Link>
                  <button
                    className={styles["lesson__remove-button"]}
                    onClick={() => handleRemoveLesson(lesson.lecture_id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className={styles["lesson__empty"]}>Лекций пока нет.</div>
        )}
      </div>

      {isCreating ? (
        <div className={styles["lesson__create-form"]}>
          <Field
            label="Название лекции"
            type="text"
            placeholder="Название лекции"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Field
            label="Тип лекции"
            type="select"
            value={type}
            onChange={(e) => setType(e.target.value as Lecture["type"])}
          >
            <option value="TEXT">Лекция</option>
            <option value="VIDEO">Видео</option>
            <option value="CODE">Код</option>
            <option value="TEST">Тест</option>
          </Field>
          <div className={styles["lesson__buttons"]}>
            <Button
              size="small"
              label="Сохранить"
              onClick={handleCreateLecture}
              type="button"
            />
            <Button
              size="small"
              variant="bordered"
              label="Отмена"
              onClick={() => {
                setIsCreating(false);
                setTitle("");
                setType("TEXT");
              }}
              type="button"
            />
          </div>
        </div>
      ) : (
        <div>
          <Button
            size="small"
            label="+ Добавить лекцию"
            onClick={() => setIsCreating(true)}
            type="button"
          />
        </div>
      )}
    </div>
  );
};

export default ModuleLessons;
