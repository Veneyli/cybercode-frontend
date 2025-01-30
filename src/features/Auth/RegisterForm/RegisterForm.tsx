"use client";

import React from "react";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { authService } from "@/shared/services/authService";
import useForm from "@/hooks/useForm";
import styles from "./RegisterForm.module.scss";

interface FormData {
  surname: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

const FormRegister: React.FC = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<FormData>({
      surname: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const router = useRouter();

  const validateFields: Partial<FormData> = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegister = async (e: React.FormEvent) => {
    const isValid = await handleSubmit(e, validateFields);

    if (isValid) {
      await authService.register(formData);
      router.push("/login");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister} noValidate>
      <Field
        label="Ваше имя"
        type="text"
        name="name"
        value={formData.name}
        placeholder="Введите имя"
        onChange={handleChange}
        status={errors.name ? "invalid" : "normal"}
        errorMessage={errors.name}
      />
      <Field
        label="Ваша фамилия"
        type="text"
        name="surname"
        value={formData.surname}
        placeholder="Введите фамилию"
        onChange={handleChange}
        status={errors.surname ? "invalid" : "normal"}
        errorMessage={errors.surname}
      />
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
        status={errors.password ? "invalid" : "normal"}
        errorMessage={errors.password}
      />
      <Field
        label="Повторите пароль"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="Введите пароль"
        onChange={handleChange}
        status={errors.confirmPassword ? "invalid" : "normal"}
        errorMessage={errors.confirmPassword}
      />
      <Button
        label={isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default FormRegister;
