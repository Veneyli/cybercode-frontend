import styles from "./signUpPage.module.scss";
import { SignUpForm } from "@/features/Auth/ui/signUp/signUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className={styles["sign-up"]}>
      <div className={styles["sign-up__container"]}>
        <Link href="/" className={styles["sign-up__back"]}>
          Вернуться на главную
        </Link>
        <h1 className={styles["sign-up__title"]}>Регистрация</h1>
        <SignUpForm />
        <div className={styles["sign-up__footer"]}>
          Есть аккаунт?{" "}
          <Link className={styles["sign-up__footer-link"]} href="/sign-in">
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}
