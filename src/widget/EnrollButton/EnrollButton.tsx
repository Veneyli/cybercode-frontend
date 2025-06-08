"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared/ui/Button/Button";
import { CourseService } from "@/shared/services/course.service";

type Props = {
  courseId: number;
  initiallyEnrolled: boolean;
  firstLectureId?: number;
};

export const EnrollButton = ({
  courseId,
  initiallyEnrolled,
  firstLectureId,
}: Props) => {
  const [isEnrolled, setIsEnrolled] = useState(initiallyEnrolled);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    try {
      setLoading(true);
      await CourseService.enrollCourse(courseId);
      setIsEnrolled(true);

      if (firstLectureId) {
        router.push(`/study/${courseId}/lectures/${firstLectureId}`);
      }
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
