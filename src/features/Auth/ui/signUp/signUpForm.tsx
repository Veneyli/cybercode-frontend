"use client";
import React from "react";
import Form from "next/form";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { useSignUpForm } from "@/features/Auth/hooks/SignUpForm";
import styles from "./signUpForm.module.scss";

export const SignUpForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
  } = useSignUpForm();

  return (
    <Form
      action="#"
      className={styles["sign-up__form"]}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Field
        label="Фамилия"
        type="text"
        name="surname"
        value={formData.surname}
        placeholder="Введите фамилию"
        onChange={(e) => handleChange("surname", e.target.value)}
        status={errors.surname ? "invalid" : "normal"}
        errorMessage={errors.surname}
      />
      <Field
        label="Имя"
        type="text"
        name="name"
        value={formData.name}
        placeholder="Введите имя"
        onChange={(e) => handleChange("name", e.target.value)}
        status={errors.name ? "invalid" : "normal"}
        errorMessage={errors.name}
      />
      <Field
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        placeholder="Введите email"
        onChange={(e) => handleChange("email", e.target.value)}
        status={errors.email ? "invalid" : "normal"}
        errorMessage={errors.email}
      />
      <Field
        label="Пароль"
        type="password"
        name="password"
        value={formData.password}
        placeholder="Введите пароль"
        onChange={(e) => handleChange("password", e.target.value)}
        status={errors.password ? "invalid" : "normal"}
        errorMessage={errors.password}
      />
      <Field
        label="Подтвердите пароль"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="Повторите пароль"
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        status={errors.confirmPassword ? "invalid" : "normal"}
        errorMessage={errors.confirmPassword}
      />

      {submitError && (
        <div className={styles["sign-up__error"]}>{submitError}</div>
      )}

      <Button
        type="submit"
        label={isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
        disabled={isSubmitting}
      />
    </Form>
  );
};
