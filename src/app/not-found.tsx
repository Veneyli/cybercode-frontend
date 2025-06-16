import Button from "@/shared/ui/Button/Button";
import Heading from "@/shared/ui/Heading/Heading";
import Footer from "@/widget/Footer/Footer";
import Header from "@/widget/Header/Header";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/not-found.module.scss";

export default function NotFound() {
  return (
    <div>
      <Header />

      <div className={styles["not-found"]}>
        <Heading level={1} align="center">
          О как
        </Heading>
        <Heading level={2} align="center">
          Страница не найдена
        </Heading>
        <Image
          src="/images/no-found.png"
          alt="404 Not Found"
          width={400}
          height={400}
        />
        <Link href="/">
          <Button size="large" label="Вернуться на главную" />
        </Link>
      </div>
      <Footer />
    </div>
  );
}
