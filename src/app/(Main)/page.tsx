import styles from "@/styles/page.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles["hero"]}>
      <div className={styles["hero__container"]}>
        <div className={styles["hero__content"]}>
          <div className={styles["hero__text"]}>
            <h1 className={styles["hero__title"]}>
              Освойте программирование и начните свою карьеру в IT с CyberCode
            </h1>
            <p className={styles["hero__description"]}>
              CyberCode — сайт с бесплатными видеокурсами! Здесь вы найдете всё
              необходимое для освоения веб-разработки и сможете практиковаться в
              написании кода прямо в браузере. Начните свой путь в IT уже
              сегодня!
            </p>
            <div className={styles["hero__action"]}>
              <Link
                href="/dashboard"
                className={styles["hero__button"]}
                aria-label="Начать учиться"
              >
                <span className={styles.star}>&#9733;</span>
                <span className={styles.star}>&#9733;</span>
                <span className={styles.star}>&#9733;</span>
                Начать учиться!
              </Link>
            </div>
          </div>
          <div className={styles["hero__image"]}>
            <Image
              src="/images/home/main-img.png"
              className={styles["hero__imageFile"]}
              alt="CyberCode - платформа для обучения веб-разработке"
              width={600}
              height={550}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
