import styles from "./signUpPage.module.scss";
import { SignUpForm } from "@/features/Auth/ui/signUp/signUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className={styles["sign-in"]}>
      <div className={styles["sign-in__container"]}>
        <h1 className={styles["sign-in__title"]}>Вход в аккаунт</h1>
        <SignUpForm />
        <div className={styles["sign-in__footer"]}>
          Есть аккаунт?{" "}
          <Link className={styles["sign-in__footer-link"]} href="/sign-in">
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}
