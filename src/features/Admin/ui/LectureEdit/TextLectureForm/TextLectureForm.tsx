"use client";

import { useState } from "react";
import { Lecture } from "@/shared/types/lecture.types";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { LectureService } from "@/shared/services/lecture.service";
import TextEditor from "@/shared/ui/TextEditor/TextEditor";
import styles from "./TextLectureForm.module.scss";

type Props = {
  lecture: Lecture;
};

export default function TextLectureForm({ lecture }: Props) {
  const [title, setTitle] = useState(lecture.title);
  const [description, setDescription] = useState(lecture.description ?? "");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    setIsSaving(true);
    try {
      await LectureService.updateLecture(lecture.lecture_id, {
        title,
        description,
      });
      alert("Лекция обновлена");
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles["text-lecture-form"]}>
      <form className={styles["text-lecture-form__form"]}>
        <div className={styles["text-lecture-form__field"]}>
          <Field
            label="Тема лекции"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles["text-lecture-form__field"]}>
          <label
            htmlFor="description"
            className={styles["text-lecture-form__label"]}
          >
            Описание лекции
          </label>
          <textarea
            name="description"
            id="description"
            className={styles["text-lecture-form__textarea"]}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={styles["text-lecture-form__field"]}>
          <label
            htmlFor="content"
            className={styles["text-lecture-form__label"]}
          >
            Содержимое лекции
          </label>
          <TextEditor value={content} onChange={setContent} />
        </div>

        <div className={styles["text-lecture-form__actions"]}>
          <div className={styles["text-lecture-form__buttons"]}>
            <Button
              label={isSaving ? "Сохранение..." : "Сохранить"}
              onClick={handleSave}
              disabled={isSaving}
            />
            <Button label="Отмена" variant="bordered" onClick={() => {}} />
          </div>
          <div className={styles["text-lecture-form__delete"]}>
            <Button label="Удалить" variant="remove" onClick={() => {}} />
          </div>
        </div>
      </form>
    </div>
  );
}
