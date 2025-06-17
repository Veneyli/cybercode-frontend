"use client";

import { useState } from "react";
import { Lecture } from "@/shared/types/lecture.types";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { LectureService } from "@/shared/services/lecture.service";
import TextEditor from "@/shared/ui/TextEditor/DynamicEditor";
import styles from "./CodeLectureForm.module.scss";

import { useRouter } from "next/navigation";

type Props = {
  lecture: Lecture;
};

export default function CodeLectureForm({ lecture }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(lecture.title);
  const [description, setDescription] = useState(lecture.description ?? "");
  const [content, setContent] = useState(lecture.content ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    setIsSaving(true);
    try {
      await LectureService.updateLecture(lecture.lecture_id, {
        title,
        description,
        content,
      });
      alert("Лекция обновлена");
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    const confirmed = confirm("Отменить изменения?");
    if (confirmed) {
      router.back();
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Вы уверены, что хотите удалить эту лекцию?");
    if (!confirmed) return;

    try {
      await LectureService.deleteLecture(lecture.lecture_id);
      alert("Лекция удалена");
      router.push("/admin/lectures");
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении");
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
            <Button label="Отмена" variant="bordered" onClick={handleCancel} />
          </div>
          <div className={styles["text-lecture-form__delete"]}>
            <Button variant="remove" label="Удалить" onClick={handleDelete} />
          </div>
        </div>
      </form>
    </div>
  );
}
