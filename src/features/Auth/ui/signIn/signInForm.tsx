"use client";
import React from "react";
import Form from "next/form";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { useSignInForm } from "@/features/Auth/hooks/SignInForm";
import styles from "./signInForm.module.scss";

export const SignInForm = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useSignInForm();

  return (
    <Form
      action="#"
      className={styles["sign-in__form"]}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
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
      />
      <Button
        type="submit"
        label={isSubmitting ? "Вход..." : "Войти"}
        disabled={isSubmitting}
      />
    </Form>
  );
};
