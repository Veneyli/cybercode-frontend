"use client";
import React from "react";
import Field from "@/shared/ui/Field/Field";
import Button from "@/shared/ui/Button/Button";
import { useUserUpdateForm } from "../../hooks/useUserUpdateForm";
import styles from "./userUpdateForm.module.scss";
import ImageUploader from "@/shared/ui/ImageUploader/ImageUploader";
import Heading from "@/shared/ui/Heading/Heading";
import Image from "next/image";
import { format } from "date-fns";

export const UserUpdateForm = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useUserUpdateForm();
  // if (isLoading) {
  //   return <div>Загрузка...</div>;
  // }
  const formattedBirthdate =
    formData.birthdate && typeof formData.birthdate === "string"
      ? formData.birthdate.slice(0, 10)
      : formData.birthdate instanceof Date
      ? format(formData.birthdate, "yyyy-MM-dd")
      : "";

  return (
    <form
      className={styles["user-update-form"]}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={styles["user-update-form__content"]}>
        <div className={styles["user-update-form__section"]}>
          <Heading level={2} className={styles["user-update-form__heading"]}>
            Основная информация
          </Heading>
          <div className={styles["user-update-form__avatar-container"]}>
            <div className={styles["user-update-form__avatar-wrapper"]}>
              <Image
                src={
                  formData.image_url
                    ? `${process.env.NEXT_PUBLIC_API_URL}${formData.image_url}`
                    : "/images/placeholder.jpeg"
                }
                alt="Аватар пользователя"
                className={styles["user-update-form__avatar"]}
                width={200}
                height={200}
              />
            </div>
            <ImageUploader
              value={formData.image_url}
              onChange={(_, serverPath) => {
                if (serverPath) {
                  handleChange("image_url", serverPath);
                }
              }}
              folder="users"
            />
          </div>

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
            label="Отчество"
            type="text"
            name="patronymic"
            value={formData.patronymic || ""}
            placeholder="Введите отчество"
            onChange={(e) => handleChange("patronymic", e.target.value)}
            status={errors.patronymic ? "invalid" : "normal"}
            errorMessage={errors.patronymic}
          />
          <Field
            label="Пол"
            type="select"
            name="gender"
            value={formData.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Выберите пол</option>
            <option value="MALE">Мужской</option>
            <option value="FEMALE">Женский</option>
          </Field>
          <Field
            label="Дата рождения"
            type="date"
            name="birthdate"
            value={formattedBirthdate}
            placeholder="Введите дату рождения"
            onChange={(e) => handleChange("birthdate", e.target.value)}
            status={errors.birthdate ? "invalid" : "normal"}
            errorMessage={errors.birthdate}
          />
        </div>

        <div className={styles["user-update-form__section"]}>
          <Heading level={2} className={styles["user-update-form__heading"]}>
            Данные для входа
          </Heading>
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
            label="Подтверждение пароля"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Введите пароль"
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            status={errors.confirmPassword ? "invalid" : "normal"}
            errorMessage={errors.confirmPassword}
          />
        </div>
      </div>

      <Button
        type="submit"
        label={isSubmitting ? "Сохранение..." : "Сохранить изменения"}
        disabled={isSubmitting}
      />
    </form>
  );
};
