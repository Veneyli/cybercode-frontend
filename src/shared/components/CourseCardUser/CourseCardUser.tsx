"use client";

import React from "react";
import styles from "./CourseCardUser.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";

interface CourseCardProps {
  id: number;
  title: string;
  smallDescription: string;
  imageUrl: string;
  progress: number | null;
}

const CourseCardUser: React.FC<CourseCardProps> = ({
  id,
  title,
  smallDescription,
  imageUrl,
  progress,
}) => {
  return (
    <Link href={`/study/${id}`} className={styles.link_card}>
      <div className={styles.card}>
        <div className={styles.card__content}>
          <div className={styles.card__text}>
            <h3 className={styles.card__title}>{title}</h3>
            <p className={styles.card__description}>{smallDescription}</p>
            {progress !== null && progress > 0 && (
              <div>
                <div className={styles.card__progress}>
                  <div className={styles.card__progressBar}>
                    <div
                      className={styles.card__line}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className={styles.card__progressNumber}>
                    <small>0%</small>
                    <small>100%</small>
                  </div>
                </div>

                <Button size="small" label="Продолжить обучение" />
              </div>
            )}
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

export default CourseCardUser;
