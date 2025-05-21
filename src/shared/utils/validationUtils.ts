import { ValidationUtils } from "@/shared/types/validation.types";

export const validationRules: ValidationUtils = {
  name: (value) => {
    if (!value) return "Поле обязательно для заполнения";
    return undefined;
  },
  surname: (value) => {
    if (!value) return "Поле обязательно для заполнения";
    return undefined;
  },
  patronymic: (value) => {
    if (!value) return "Поле обязательно для заполнения";
    return undefined;
  },
  email: (value) => {
    if (!value) return "Email обязателен";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
      return "Некорректный email";
    return undefined;
  },
  password: (value) => {
    if (!value) return "Пароль обязателен";
    if (value.length < 8) return "Пароль должен быть не менее 8 символов";
    if (!/[A-Z, А-Я]/.test(value))
      return "Пароль должен содержать хотя бы одну заглавную букву";
    if (!/[0-9]/.test(value))
      return "Пароль должен содержать хотя бы одну цифру";
    return undefined;
  },
  confirmPassword: (value, valuePassword) => {
    if (!value) return "Поле обязательно для заполнения";
    if (valuePassword && value !== valuePassword) return "Пароли не совпадают";
    return undefined;
  },
};
