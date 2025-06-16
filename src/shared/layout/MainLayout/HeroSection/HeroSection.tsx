import styles from "./HeroSection.module.scss";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
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
            <div className={styles["hero__buttons"]}>
              <Link
                href="/profile"
                className={`${styles["hero__button"]} ${styles["hero__button-icon"]}`}
                aria-label="Начать учиться"
              >
                <span className={styles.star}>&#9733;</span>
                <span className={styles.star}>&#9733;</span>
                <span className={styles.star}>&#9733;</span>
                Начать учиться!
              </Link>
              <Link
                className={`${styles["hero__button"]} ${styles["hero__button-outline"]}`}
                href="/courses"
              >
                Каталог курсов
              </Link>
            </div>
          </div>
          <div className={styles["hero__image"]}>
            <Image
              src="/images/code.png"
              className={styles["hero__imageFile"]}
              alt="CyberCode - платформа для обучения веб-разработке"
              width={600}
              height={600}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
