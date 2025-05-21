import styles from "./signInPage.module.scss";
import { SignInForm } from "@/features/Auth/ui/signIn/signInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className={styles["sign-in"]}>
      <div className={styles["sign-in__container"]}>
        <h1 className={styles["sign-in__title"]}>Вход в аккаунт</h1>
        <SignInForm />
        <div className={styles["sign-in__footer"]}>
          Еще нет аккаунта?{" "}
          <Link className={styles["sign-in__footer-link"]} href="/sign-up">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </main>
  );
}
