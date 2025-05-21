"use client";

import { useState } from "react";
import Button from "@/shared/ui/Button/Button";
import { CourseService } from "@/shared/services/course.service";

type Props = {
  courseId: number;
  initiallyEnrolled: boolean;
};

export const EnrollButton = ({ courseId, initiallyEnrolled }: Props) => {
  const [isEnrolled, setIsEnrolled] = useState(initiallyEnrolled);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      await CourseService.enrollCourse(courseId);
      setIsEnrolled(true);
    } catch (e) {
      console.error("Ошибка при поступлении на курс", e);
    } finally {
      setLoading(false);
    }
  };

  if (isEnrolled) return <p>Вы записаны на курс</p>;

  return (
    <Button
      label={loading ? "Поступление..." : "Поступить на курс"}
      onClick={handleEnroll}
      disabled={loading}
    />
  );
};
