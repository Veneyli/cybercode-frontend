import { useState } from "react";
import { CourseService } from "@/shared/services/course.service";
import { useRouter } from "next/navigation";

export function useUpdateCourse(courseId: number | string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const updateCourse = async (form: {
    title: string;
    description: string;
    technologies: string[];
    level: string;
    image_url: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      await CourseService.updateCourse(String(courseId), form);
      router.push("/admin/studies");
    } catch (err) {
      console.error(err);
      setError("Не удалось обновить курс");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCourse, isLoading, error };
}
