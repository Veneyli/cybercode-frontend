import React from "react";
import Link from "next/link";
import styles from "./MediaCard.module.scss";
import Image from "next/image";
import { Media } from "@/types/media.types";

const MediaCard = (props: Media) => {
  return (
    <Link href={`/media/${props.post_id}`} passHref>
      <div className={styles.card}>
        <div className={styles.card__category}>
          <p>{props.category}</p>
        </div>
        <Image
          src={props.image_url || "/images/placeholder.jpg"}
          alt={props.title}
          className={styles.card__image}
          width={500}
          height={500}
        />
        <div className={styles.card__content}>
          <h3 className={styles.card__title}>{props.title}</h3>
          <p className={styles.card__description}>{props.description}</p>
          <p className={styles.card__date}>{props.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
