import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function useCourse(courseId: string | null) {
  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    async function fetchCourse() {
      try {
        const response = await fetch(`${API_URL}/api/courses/${courseId}`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Ошибка загрузки курса с id ${courseId}: ${response.status}`
          );
        }

        const data = await response.json();
        setCourse(data);
      } catch (error: any) {
        setError("Ошибка при загрузке: " + error.message);
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);
  return { course, loading, error };
}
