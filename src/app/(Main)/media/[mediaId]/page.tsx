import styles from "./mediaDetailsPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import DOMPurify from "isomorphic-dompurify";
import { MediaService } from "@/services/media.service";
import { Media } from "@/types/media.types";
import { JSDOM } from "jsdom";

interface Props {
  params: { mediaId: string };
}

export default async function MediaDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const mediaId = resolvedParams.mediaId;
  const postData: Media = await MediaService.mediaById(mediaId);

  const tempDiv =
    typeof window === "undefined"
      ? new JSDOM(`<div>${postData.content}</div>`).window.document.body
      : document.createElement("div");
  tempDiv.innerHTML = postData.content;

  const headingsList: { id: string; text: string }[] = [];
  tempDiv
    .querySelectorAll("h2")
    .forEach((heading: HTMLHeadingElement, index: number) => {
      const id = `heading-${index}`;
      heading.id = id;
      headingsList.push({ id, text: heading.textContent || "" });
    });

  tempDiv.querySelectorAll("*").forEach((el) => {
    const element = el as HTMLElement;
    const tag = element.tagName.toLowerCase();
    const className = styles[`article__${tag}`];
    if (className) {
      element.classList.add(className);
    }
  });

  const sanitizedHtml = DOMPurify.sanitize(tempDiv.innerHTML);

  return (
    <div className={styles.article}>
      <div className={styles.article__content}>
        <div className={styles.article__header}>
          <div className={styles.article__category}>{postData.category}</div>
          <p className={styles.article__date}>
            Дата публикации:{" "}
            {postData.date
              ? format(new Date(postData.date), "dd.MM.yyyy")
              : "Не указано"}
          </p>
        </div>
        <h1 className={styles.article__title}>{postData.title}</h1>
        <div className={styles.article__image}>
          <Image
            className={styles["article__image-file"]}
            src={postData.image_url || "/images/placeholder.jpg"}
            alt={postData.title}
            width={1000}
            height={600}
          />
        </div>

        <div
          className={styles.article__text}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
      <aside>
        {headingsList.length > 0 && (
          <div className={styles.article__navigation}>
            <h2 className={styles.article__subtitle}>Содержание</h2>
            <div className={styles.article__links}>
              {headingsList.map((heading) => (
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
      </aside>
    </div>
  );
}
