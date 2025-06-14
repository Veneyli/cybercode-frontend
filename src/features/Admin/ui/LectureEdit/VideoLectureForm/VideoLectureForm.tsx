"use client";

import { useState } from "react";
import { Lecture } from "@/shared/types/lecture.types";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { LectureService } from "@/shared/services/lecture.service";
import TextEditor from "@/shared/ui/TextEditor/TextEditor";
import styles from "./VideoLectureForm.module.scss";
import VideoUploader from "@/shared/ui/VideoUploader/VideoUploader";

type Props = {
  lecture: Lecture;
};

export default function VideoLectureForm({ lecture }: Props) {
  const [title, setTitle] = useState(lecture.title ?? "");
  const [description, setDescription] = useState(lecture.description ?? "");
  const [videoUrl, setVideoUrl] = useState(lecture.video_url ?? "");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    console.log("Сохраняем лекцию с videoUrl:", videoUrl);
    await LectureService.updateLecture(lecture.lecture_id, {
      title,
      description,
      video_url: videoUrl,
    });
    alert("Лекция сохранена");
  };

  return (
    <div className={styles["video-lecture-form"]}>
      <form className={styles["video-lecture-form__form"]}>
        <div className={styles["video-lecture-form__field"]}>
          <Field
            label="Тема лекции"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles["video-lecture-form__field"]}>
          <label
            htmlFor="description"
            className={styles["video-lecture-form__label"]}
          >
            Описание лекции
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles["video-lecture-form__textarea"]}
          ></textarea>
        </div>
        <div className={styles["video-lecture-form__video"]}>
          <label htmlFor="video">Видео лекции</label>
          <VideoUploader
            value={videoUrl} // передаем текущий url, чтобы загрузчик видел его
            onChange={(_, serverPath) => {
              setVideoUrl(serverPath ?? "");
            }}
            folder="lectures"
          />
          <Field
            placeholder="Или вставьте сюда ссылку на видео"
            onChange={(e) => setVideoUrl(e.target.value)}
            value={videoUrl}
          />
        </div>

        <div className={styles["video-lecture-form__field"]}>
          <label
            htmlFor="content"
            className={styles["video-lecture-form__label"]}
          >
            Содержимое лекции
          </label>
          <TextEditor value={content} onChange={setContent} />
        </div>

        <div className={styles["video-lecture-form__actions"]}>
          <div className={styles["video-lecture-form__buttons"]}>
            <Button label="Сохранить" onClick={handleSave} />
            <Button label="Отмена" variant="bordered" onClick={() => {}} />
          </div>
          <div className={styles["video-lecture-form__delete"]}>
            <Button label="Удалить" variant="remove" onClick={() => {}} />
          </div>
        </div>
      </form>
    </div>
  );
}
