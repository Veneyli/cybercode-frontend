import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberCode: Поиск курсов",
  description: "HTML, CSS, изучение, обучение",
};

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.hero__container}>
          <div className={styles.hero__content}>
            <div className={styles.hero__text}>
              <h1 className={styles.hero__title}>
                Освойте веб-разработку и начните свою карьеру в IT с CyberCode
              </h1>
              <p className={styles.hero__description}>
                CyberCode — сайт с бесплатными видеокурсами! Здесь вы найдете
                всё необходимое для освоения веб-разработки и сможете
                практиковаться в написании кода прямо в браузере. Начните свой
                путь в веб-разработке уже сегодня!
              </p>
              <div className={styles.hero__action}>
                <Link
                  href="#"
                  className={styles.hero__button}
                  aria-label="Начать учиться"
                >
                  <span className={styles.star}>&#9733;</span>
                  <span className={styles.star}>&#9733;</span>
                  <span className={styles.star}>&#9733;</span>
                  Начать учиться!
                </Link>
              </div>
            </div>
            <div className={styles.hero__image}>
              <Image
                src="/images/home/main-img.png"
                className={styles.hero__imageFile}
                alt="CyberCode - платформа для обучения веб-разработке"
                width={600}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.advantage}>
        <div className={styles.advantage__container}>
          <div className={styles.advantage__content}>
            {/* {advantages.map(
              (advantage: {
                id: number;
                icon: string;
                title: string;
                description: string;
              }) => (
                <AdvantageBlock
                  key={advantage.id}
                  icon={advantage.icon}
                  title={advantage.title}
                  description={advantage.description}
                />
              )
            )} */}
          </div>
        </div>
      </section>
    </>
  );
}
