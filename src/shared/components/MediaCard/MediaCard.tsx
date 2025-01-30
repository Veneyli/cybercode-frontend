import React from "react";
import Link from "next/link";
import styles from "./MediaCard.module.scss";
import Image from "next/image";

interface MediaCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
}

const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  date,
  category,
}) => {
  return (
    <Link href={`/media/${id}`} passHref>
      <div className={styles.card}>
        <div className={styles.card__category}>
          <p>{category}</p>
        </div>
        <Image
          src={imageUrl}
          alt={title}
          className={styles.card__image}
          width={150}
          height={150}
        />
        <div className={styles.card__content}>
          <h3 className={styles.card__title}>{title}</h3>
          <p className={styles.card__description}>{description}</p>
          <p className={styles.card__date}>{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
