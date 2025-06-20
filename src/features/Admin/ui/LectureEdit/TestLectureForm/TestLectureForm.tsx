"use client";

import { useEffect, useState } from "react";
import { TestQuestion } from "@/shared/types/test.types";
import TestQuestionForm from "./TestQuestionForm/TestQuestionForm";
import styles from "./TestLectureForm.module.scss";
import Button from "@/shared/ui/Button/Button";
import { Lecture } from "@/shared/types/lecture.types";
import Field from "@/shared/ui/Field/Field";
import { TestService } from "@/shared/services/test.service";
import { LectureService } from "@/shared/services/lecture.service";
import Heading from "@/shared/ui/Heading/Heading";
import { useRouter } from "next/navigation";

type Props = {
  lecture: Lecture;
};

export default function TestLectureForm({ lecture }: Props) {
  const router = useRouter();
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [title, setTitle] = useState(lecture.title ?? "");
  const [description, setDescription] = useState(lecture.description ?? "");

  useEffect(() => {
    TestService.questionsByLecture(String(lecture.lecture_id)).then((res) => {
      setQuestions(res.data ? res.data : res);
    });
  }, [lecture.lecture_id]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        lecture_id: String(lecture.lecture_id),
        question: "",
        type: "RADIO",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const updateQuestion = (index: number, updated: TestQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updated;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const cleanQuestions = questions.map((q) => ({
      lecture_id: String(lecture.lecture_id),
      question: q.question,
      type: q.type,
      options: q.options.map((opt) => ({
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    }));

    try {
      await LectureService.updateLecture(lecture.lecture_id, {
        title,
        description,
      });

      await TestService.saveTest(lecture.lecture_id, cleanQuestions);

      alert("Лекция и тесты успешно сохранены");
    } catch (e) {
      console.error(e);
      alert("Ошибка при сохранении лекции или тестов");
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
    <div className={styles["test-lecture-form"]}>
      <div className={styles["test-lecture-form__fields"]}>
        <div className={styles["test-lecture-form__field"]}>
          <Field
            label="Тема лекции"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles["test-lecture-form__field"]}>
          <label
            htmlFor="description"
            className={styles["test-lecture-form__label"]}
          >
            Описание лекции
          </label>
          <textarea
            name="description"
            id="description"
            className={styles["test-lecture-form__textarea"]}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <Heading
        align="center"
        className={styles["test-lecture-form__heading"]}
        level={2}
      >
        Тест к лекции: {lecture.title}
      </Heading>
      {questions.map((q, idx) => (
        <TestQuestionForm
          key={idx}
          question={q}
          onChange={(updated) => updateQuestion(idx, updated)}
          onRemove={() => removeQuestion(idx)}
        />
      ))}
      <Button label="Добавить вопрос" onClick={addQuestion} />
      <div className={styles["test-lecture-form__actions"]}>
        <div className={styles["test-lecture-form__buttons"]}>
          <Button label="Сохранить тест" onClick={handleSave} />
          <Button label="Отмена" variant="bordered" onClick={handleCancel} />
        </div>
        <div className={styles["test-lecture-form__delete"]}>
          <Button variant="remove" label="Удалить" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
