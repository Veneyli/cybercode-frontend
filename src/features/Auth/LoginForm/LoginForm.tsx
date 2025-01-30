"use client";

import React from "react";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { authService } from "@/shared/services/authService";
import useForm from "@/hooks/useForm";
import styles from "./LoginForm.module.scss";

interface FormData {
  email: string;
  password: string;
  [key: string]: string;
}

const FormLogin: React.FC = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<FormData>({
      email: "",
      password: "",
    });

  const router = useRouter();

  const validateFields = { email: "", password: "" };

  const handleLogin = async (e: React.FormEvent) => {
    const isValid = await handleSubmit(e, validateFields);

    if (isValid) {
      await authService.login(formData);
      router.push("/dashboard");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin} noValidate>
      <Field
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        placeholder="Введите email"
        onChange={handleChange}
        status={errors.email ? "invalid" : "normal"}
        errorMessage={errors.email}
      />
      <Field
        label="Пароль"
        type="password"
        name="password"
        value={formData.password}
        placeholder="Введите пароль"
        onChange={handleChange}
        errorMessage={errors.password}
      />
      <Button
        label={isSubmitting ? "Вход..." : "Войти"}
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default FormLogin;
