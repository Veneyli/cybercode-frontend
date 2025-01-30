import LoginForm from "@/features/Auth/LoginForm/LoginForm";
import styles from "./loginPage.module.scss";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.auth}>
        <h1 className={styles.title}>Вход в аккаунт</h1>
        <LoginForm />
        <div className={styles.footer}>
          Еще нет аккаунта?{" "}
          <Link className={styles.footer__link} href={"/register"}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
