import { useState } from "react";
import { SignUp } from "@/types/sign-up.types";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export const useSignUpForm = () => {
  const router = useRouter();
  const initialData: SignUp = {
    surname: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<
    Record<keyof SignUp, string | undefined>
  >({
    surname: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { validateField } = useFieldValidation();

  const handleChange = (name: keyof SignUp, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as string, value) ?? undefined,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const newErrors: Record<keyof SignUp, string | undefined> = {
      surname: validateField("surname", formData.surname) ?? undefined,
      name: validateField("name", formData.name) ?? undefined,
      email: validateField("email", formData.email) ?? undefined,
      password: validateField("password", formData.password) ?? undefined,
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Пароли не совпадают"
          : validateField("confirmPassword", formData.confirmPassword) ??
            undefined,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setIsSubmitting(false);
      return false;
    }

    try {
      await AuthService.register(formData);
      router.push("/sign-in");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Ошибка регистрации:", err);
        setSubmitError(err.message || "Не удалось зарегистрироваться.");
      } else {
        console.error("Ошибка регистрации:", err);
        setSubmitError("Не удалось зарегистрироваться.");
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
  };
};
