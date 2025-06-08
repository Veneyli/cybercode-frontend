import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";

export function useCourseEnrollment(courseId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkEnrollment() {
      try {
        const response = await apiClient.get(`/courses/${courseId}/enrollment`);

        if (response && response.isEnrolled !== undefined) {
          setIsEnrolled(response.isEnrolled);
        } else {
          setError("Ответ от сервера не содержит данных о записи.");
        }
      } catch (err: unknown) {
        console.error("Ошибка проверки записи:", err);
        setError("Ошибка при проверке записи.");
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      checkEnrollment();
    }
  }, [courseId]);

  const enroll = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post(`/courses/${courseId}/enroll`, {});

      if (
        response?.progress_id !== undefined &&
        response?.progress !== undefined
      ) {
        setIsEnrolled(true);
      } else {
        setError(
          "Не удалось записаться на курс. Ответ не содержит нужных данных."
        );
      }
    } catch (err: unknown) {
      console.error("Ошибка при записи на курс:", err);
      if (err instanceof Error) {
        setError(err.message || "Ошибка при записи на курс");
      } else {
        setError("Ошибка при записи на курс");
      }
    } finally {
      setLoading(false);
    }
  };

  return { enroll, isEnrolled, loading, error };
}
