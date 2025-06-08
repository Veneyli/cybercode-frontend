"use client";
import { useState, useEffect } from "react";
import { TestService } from "@/shared/services/test.service";
import { ProgressService } from "@/shared/services/progress.service";
import { useLectureProgress } from "@/providers/LectureProgressContext";
import Button from "@/shared/ui/Button/Button";
import Heading from "@/shared/ui/Heading/Heading";
import styles from "./TestComponent.module.scss";
import { useCallback } from "react";

type QuestionOption = {
  id: number;
  text: string;
};

type Question = {
  id: number;
  question: string;
  type: "RADIO" | "CHECKBOX";
  options: QuestionOption[];
};

export default function TestComponent({ userId, lectureId }) {
  const { refreshProgress } = useLectureProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    totalUserCorrect: number;
    totalCorrectAnswers: number;
    percentage: number;
  } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [initialCheckLoading, setInitialCheckLoading] = useState(true);

  const currentQuestion = questions[currentIndex];
  const loadTestStatus = useCallback(async () => {
    setInitialCheckLoading(true);
    try {
      const response = await TestService.checkIfTestPassed(userId, lectureId);

      if (response?.isPassed) {
        setResult(response.result);
        setIsFinished(true);
      } else {
        setQuestions(response.questions || []);
        setIsFinished(false);
        setResult(null);
        setCurrentIndex(0);
        setAnswers({});
      }
    } catch (error) {
      console.error("Ошибка при загрузке теста", error);
    } finally {
      setInitialCheckLoading(false);
    }
  }, [userId, lectureId]);

  useEffect(() => {
    loadTestStatus();
  }, [loadTestStatus]);

  const submitAnswers = async (finalAnswers = answers) => {
    setLoading(true);
    try {
      const payload = {
        userId,
        lectureId,
        answers: Object.entries(finalAnswers).map(
          ([questionId, selectedOptionIds]) => ({
            questionId: Number(questionId),
            selectedOptionIds,
          })
        ),
      };

      const response = await TestService.submitTest(payload);

      if (
        response &&
        typeof response.totalUserCorrect === "number" &&
        typeof response.totalCorrectAnswers === "number"
      ) {
        setResult(response);

        await ProgressService.saveProgress({
          user_id: userId,
          lecture_id: lectureId,
          isCompleted: true,
          completedAt: new Date(),
          score: response.percentage,
        });

        refreshProgress();
      }
    } catch (error) {
      console.error("Ошибка при отправке теста", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    try {
      await TestService.removeByUserLecture(userId, lectureId);
      setResult(null);
      setIsFinished(false);
      setAnswers({});
      setCurrentIndex(0);

      await loadTestStatus();
      refreshProgress();
    } catch (error) {
      console.error("Ошибка при удалении результата теста", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRadioAnswer = (optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: [optionId],
    }));
  };

  const handleCheckboxToggle = (optionId: number) => {
    setAnswers((prev) => {
      const currentAnswers = prev[currentQuestion.id] || [];
      const updatedAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter((id) => id !== optionId)
        : [...currentAnswers, optionId];
      return { ...prev, [currentQuestion.id]: updatedAnswers };
    });
  };

  const handleSubmitCurrentQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      submitAnswers(answers);
    }
  };

  if (initialCheckLoading) return <p>Загрузка...</p>;

  if (isFinished) {
    if (loading) {
      return <p>Отправка результатов...</p>;
    }
    if (result) {
      return (
        <div className={styles["result"]}>
          <Heading align="center" level={2}>
            Тест завершён
          </Heading>
          <p>
            Ваш результат: {result.totalUserCorrect} из{" "}
            {result.totalCorrectAnswers} правильных (
            {result.percentage.toFixed(1)}%)
          </p>
          <Button
            variant="bordered"
            label="Пройти заново"
            onClick={handleRetry}
            disabled={loading}
          />
        </div>
      );
    }

    return <p>Загрузка результата...</p>;
  }

  if (!questions.length) {
    return <p>Нет доступных вопросов для этого теста.</p>;
  }

  return (
    <div className={styles["question"]}>
      <Heading align="center" level={3}>
        Вопрос {currentIndex + 1} из {questions.length}
      </Heading>
      <p className={styles["question__text"]}>{currentQuestion.question}</p>
      <ul className={styles["question__options"]}>
        {currentQuestion.options.map((option) => (
          <li className={styles["question__option"]} key={option.id}>
            <label className={styles["question__option-label"]}>
              <input
                className={styles["question__option-input"]}
                type={currentQuestion.type === "RADIO" ? "radio" : "checkbox"}
                name={`question-${currentQuestion.id}`}
                checked={
                  currentQuestion.type === "RADIO"
                    ? answers[currentQuestion.id]?.[0] === option.id
                    : answers[currentQuestion.id]?.includes(option.id) || false
                }
                onChange={() =>
                  currentQuestion.type === "RADIO"
                    ? handleRadioAnswer(option.id)
                    : handleCheckboxToggle(option.id)
                }
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>
      <Button
        label="Ответить"
        onClick={handleSubmitCurrentQuestion}
        disabled={loading}
      />
    </div>
  );
}
