import React from "react";
import styles from "./CourseCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course.types";
import Heading from "@/shared/ui/Heading/Heading";

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  return (
    <Link
      href={`/courses/${course.course_id}`}
      className={styles["card"]}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className={styles["card__content"]}>
        <div className={styles["card__info"]}>
          <small className={styles["card__level"]}>{course.level}</small>
          <Heading level={3} className={styles["card__title"]}>
            {course.title}
          </Heading>
          <p className={styles["card__description"]}>
            {course.small_description}
          </p>
          <small className={styles["card__technologies"]}>
            {course.technologies}
          </small>
        </div>
        <Image
          src={
            course.image_url
              ? `${process.env.NEXT_PUBLIC_API_URL}${course.image_url}`
              : "/images/placeholder.jpeg"
          }
          alt={course.title}
          className={styles["card__image"]}
          width={150}
          height={150}
        />
      </div>
    </Link>
  );
};

export default CourseCard;
