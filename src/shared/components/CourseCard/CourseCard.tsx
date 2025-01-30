"use client";

import React from "react";
import styles from "./CourseCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";

interface CourseCardProps {
  id: number;
  title: string;
  smallDescription: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  smallDescription,
  imageUrl,
}) => {
  return (
    <Link href={`/courses/${id}`} className={styles.link_card}>
      <div className={styles.card}>
        <div className={styles.card__content}>
          <div>
            <h3 className={styles.card__title}>{title}</h3>
            <p className={styles.card__description}>{smallDescription}</p>
          </div>
          <Image
            src={imageUrl || "/images/placeholder.jpg"}
            alt={title}
            className={styles.card__image}
            width={150}
            height={150}
          />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
