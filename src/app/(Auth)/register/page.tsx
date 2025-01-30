import RegisterForm from "@/features/Auth/RegisterForm/RegisterForm";
import styles from "./registerPage.module.scss";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.auth}>
        <h1 className={styles.title}>Создание аккаунта</h1>
        <RegisterForm />
        <div className={styles.footer}>
          Есть аккаунт?{" "}
          <Link className={styles.footer__link} href={"/login"}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
