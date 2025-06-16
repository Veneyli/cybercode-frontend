import { useState } from "react";
import { SignIn } from "@/types/sign-in.types";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export const useSignInForm = () => {
  const router = useRouter();
  const initialData: SignIn = { email: "", password: "" };
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<
    Record<keyof SignIn, string | undefined>
  >({
    email: undefined,
    password: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { validateField } = useFieldValidation();

  const handleChange = (name: keyof SignIn, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as string, value) ?? undefined,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const newErrors: Record<keyof SignIn, string | undefined> = {
      email: validateField("email", formData.email) ?? undefined,
      password: validateField("password", formData.password) ?? undefined,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setIsSubmitting(false);
      return false;
    }

    try {
      const response = await AuthService.login(formData);

      const role = response?.user?.role;
      console.log(role, response.user);
      if (role === "ADMIN" || role === "TEACHER") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Ошибка авторизации:", err);
        setSubmitError(err.message || "Не удалось войти. Попробуйте снова.");
      } else {
        console.error("Ошибка авторизации:", err);
        setSubmitError("Не удалось войти. Попробуйте снова.");
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
