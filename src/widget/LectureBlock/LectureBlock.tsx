"use client";

import { useEffect } from "react";
import styles from "./LectureBlock.module.scss";
import { ProgressService } from "@/shared/services/progress.service";
import { useLectureProgress } from "@/providers/LectureProgressContext";

const LectureBlock = ({ lecture, userId }) => {
  const { refreshProgress } = useLectureProgress();

  useEffect(() => {
    const sendProgress = async () => {
      try {
        await ProgressService.saveProgress({
          user_id: userId,
          lecture_id: lecture.lecture_id,
          isCompleted: true,
          completedAt: new Date(),
        });

        refreshProgress();
      } catch (error) {
        console.error("Ошибка при отправке прогресса по лекции", error);
      }
    };

    sendProgress();
  }, [userId, lecture.lecture_id, refreshProgress]);

  return (
    <div className={styles["lecture"]}>
      <div
        className={styles.lecture__content}
        dangerouslySetInnerHTML={{
          __html: (lecture.content || "").replace(
            /<(\w+)(.*?)>/g,
            (_: string, tag: string, rest: string) => {
              const className = styles[`lecture__${tag}`] || "";
              return `<${tag} class="${className}"${rest}>`;
            }
          ),
        }}
      />
    </div>
  );
};

export default LectureBlock;
