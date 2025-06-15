import { useEffect, useState } from "react";
import { CourseService } from "@/shared/services/course.service";
import type { Course } from "@/types/course.types";

export function useCourse(courseId: string | number) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await CourseService.courseById(String(courseId));
        setCourse(res);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить курс");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [courseId]);

  return { course, isLoading, error };
}
