"use client";
import { useState, useEffect } from "react";
import { TestService } from "@/shared/services/test.service";
import { ProgressService } from "@/shared/services/progress.service";
import { useLectureProgress } from "@/providers/LectureProgressContext";

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
<<<<<<< HEAD
  const { refreshProgress } = useLectureProgress();
=======
  const { refreshProgress } = useLectureProgress(); // 👈 доступ к контексту
>>>>>>> origin/main

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

  useEffect(() => {
    const loadTestStatus = async () => {
      try {
        const response = await TestService.checkIfTestPassed(userId, lectureId);

        if (response?.isPassed) {
          setResult(response.result);
          setIsFinished(true);
        } else {
          setQuestions(response.questions || []);
        }
      } catch (error) {
        console.error("Ошибка при загрузке теста", error);
      } finally {
        setInitialCheckLoading(false);
      }
    };

    loadTestStatus();
  }, [userId, lectureId]);

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

<<<<<<< HEAD
        refreshProgress();
=======
        refreshProgress(); // 👈 обновляем Sidebar после сохранения прогресса
>>>>>>> origin/main
      }
    } catch (error) {
      console.error("Ошибка при отправке теста", error);
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
        <div>
          <h2>Тест завершён</h2>
          <p>
            Ваш результат: {result.totalUserCorrect} из{" "}
            {result.totalCorrectAnswers} правильных (
            {result.percentage.toFixed(1)}%)
          </p>
        </div>
      );
    }

    return <p>Загрузка результата...</p>;
  }

  if (!questions.length) {
    return <p>Нет доступных вопросов для этого теста.</p>;
  }

  return (
    <div>
      <h3>
        Вопрос {currentIndex + 1} из {questions.length}
      </h3>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((option) => (
          <li key={option.id}>
            <label>
              <input
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
      <button onClick={handleSubmitCurrentQuestion}>Ответить</button>
    </div>
  );
}
