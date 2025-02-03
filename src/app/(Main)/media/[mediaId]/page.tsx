"use client";

import React, { useEffect, useState } from "react";
import styles from "./mediaDetailsPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";

interface Post {
  category: string;
  date: string;
  title: string;
  image_url: string;
  content: string;
}

export default function MediaItemPage() {
  const API_URL = process.env.API_URL || "http://localhost:4000";

  const params = useParams();
  const mediaId = params?.mediaId as string;

  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    if (!mediaId) return;

    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/media/${mediaId}`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Ошибка загрузки поста");

        const data: Post = await response.json();
        extractHeadings(data.content, data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [mediaId]);

  const extractHeadings = (html: string, postData: Post) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    tempDiv.querySelectorAll("*").forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      const className = styles[`article__${tagName}`];
      if (className) {
        element.classList.add(className);
      }
    });

    const headingsList: { id: string; text: string }[] = [];
    tempDiv.querySelectorAll("h2").forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      headingsList.push({ id, text: heading.textContent || "" });
    });

    setHeadings(headingsList);
    setPostData({ ...postData, content: tempDiv.innerHTML });
  };
  if (loading) return <p>Загрузка...</p>;
  if (!postData) return <p>Пост не найден</p>;

  return (
    <div className={styles.article}>
      <div className={styles.article__content}>
        <div className={styles.article__header}>
          <div className={styles.article__category}>{postData.category}</div>
          <p className={styles.article__date}>
            Дата публикации:{" "}
            {postData?.date
              ? format(new Date(postData.date), "dd.MM.yyyy")
              : "Не указано"}
          </p>
        </div>
        <div className={styles.article__content}>
          <h1 className={styles.article__title}>{postData.title}</h1>
          <Image
            className={styles.article__image}
            src={postData.image_url}
            alt={postData.title}
            width={600}
            height={400}
          />
          <div
            className={styles.article__text}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postData.content),
            }}
          />
        </div>
      </div>
      {headings.length > 0 && (
        <div className={styles.article__navigation}>
          <h2 className={styles.article__subtitle}>Содержание</h2>
          <div className={styles.article__links}>
            {headings.map((heading) => (
              <Link
                key={heading.id}
                className={styles.article__link}
                href={`#${heading.id}`}
              >
                {heading.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
