import { useState, useEffect } from "react";
import { useFieldValidation } from "@/shared/hooks/useFieldValidation";
import { useSession } from "@/shared/hooks/useSession";
import { useRouter } from "next/navigation";

interface FormData {
  [key: string]: string;
}

const useForm = <T extends FormData>(initialData: T) => {
  const { user, loading } = useSession();
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validateField } = useFieldValidation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "confirmPassword"
          ? validateField(name, value, formData.password)
          : validateField(name, value),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent,
    validateFields: Partial<T>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: Partial<T> = {};
    Object.keys(validateFields).forEach((key) => {
      newErrors[key as keyof T] =
        key === "confirmPassword"
          ? (validateField(
              key,
              formData[key as keyof T],
              formData.password
            ) as T[keyof T])
          : (validateField(key, formData[key as keyof T]) as T[keyof T]);
    });
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      setIsSubmitting(false);
      return true;
    } else {
      setIsSubmitting(false);
      return false;
    }
  };
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
