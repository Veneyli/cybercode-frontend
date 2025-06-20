import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/services/user.service";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { useSession } from "@/shared/hooks/useSession";

export const useUserUpdateForm = () => {
  const router = useRouter();
  const user = useSession();
  const userId = user.user?.user_id;
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    patronymic: "",
    email: "",
    image_url: "",
    gender: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { validateField } = useFieldValidation();
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const data = await UserService.getUser(userId);
        console.log(data);
        setFormData({
          surname: data.surname || "",
          name: data.name || "",
          patronymic: data.patronymic || "",
          email: data.email || "",
          image_url: data.image_url || "",
          gender: data.gender || "",
          birthdate: data.birthdate || "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Ошибка при загрузке пользователя", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (name: string, value: string, file?: File) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));

    if (name === "image_url" && file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!userId) {
      setIsSubmitting(false);
      console.error("userId не найден");
      return;
    }

    const newErrors: Record<string, string | undefined> = {
      surname: validateField("surname", formData.surname),
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: formData.password
        ? validateField("password", formData.password)
        : undefined,
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Пароли не совпадают"
          : undefined,
      birthdate: formData.birthdate
        ? validateField("birthdate", formData.birthdate)
        : undefined,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    try {
      const updateData = {
        ...formData,
        image: imageFile ?? undefined,
      };
      await UserService.updateUser(userId, updateData);
      router.refresh();
    } catch (e) {
      console.error("Ошибка при сохранении:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    isLoading,
  };
};
