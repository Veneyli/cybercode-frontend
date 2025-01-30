import Image from "next/image";
import styles from "@/app/styles/not-found.module.scss";
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";

const NotFound = () => (
  <div className={styles["error-page"]}>
    <h1 className={styles["error-page__header"]}>Ошибка 404</h1>
    <p className={styles["error-page__text"]}>Cтраница не найдена</p>
    <Image
      className={styles["error-page__image"]}
      src={"/images/404.png"}
      alt="dfd"
      width={500}
      height={500}
    />
    <Link href={"/"}>
      <Button label="Перейти на главную страницу" />
    </Link>
  </div>
);

export default NotFound;
