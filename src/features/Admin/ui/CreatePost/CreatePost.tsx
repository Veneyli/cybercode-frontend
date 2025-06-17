"use client";

import React, { useState } from "react";
import ImageUploader from "@/shared/ui/ImageUploader/ImageUploader";
import styles from "./CreatePost.module.scss";
import Field from "@/shared/ui/Field/Field";
import TextEditor from "@/shared/ui/TextEditor/DynamicEditor";
import Image from "next/image";
import Button from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { MediaService } from "@/services/media.service";

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    content: "",
    category: "",
    isPublished: "false",
    description: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await MediaService.mediaCreate({
        ...formData,
        isPublished: formData.isPublished === "true",
      });
      router.push("admin/posts");
    } catch (e) {
      console.error("Ошибка при создании поста", e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("admin/posts");
  };

  return (
    <div className={styles["create-post"]}>
      <Field
        label="Заголовок"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <div className={styles["create-post__field"]}>
        <label className={styles["create-post__label"]} htmlFor="description">
          Описание
        </label>
        <textarea
          id="description"
          className={styles["create-post__textarea"]}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
      <div className={styles["create-post__image-wrapper"]}>
        {formData.image_url && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${formData.image_url}`}
            alt="Превью"
            width={200}
            height={150}
            unoptimized
          />
        )}
        <ImageUploader
          value={formData.image_url}
          onChange={(_, serverPath) => {
            if (serverPath) {
              handleChange("image_url", serverPath);
            }
          }}
          folder="posts"
        />
      </div>

      <TextEditor
        value={formData.content}
        onChange={(value) => handleChange("content", value)}
      />

      <Field
        type="select"
        name="category"
        label="Категория"
        value={formData.category}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="">Выберите категорию</option>
        <option value="Новости">Новости</option>
        <option value="Технологии">Технологии</option>
        <option value="Научные">Научные</option>
        <option value="Программирование">Программирование</option>
        <option value="Веб-разработка">Веб-разработка</option>
        <option value="Дизайн">Дизайн</option>
        <option value="Графика">Графика</option>
        <option value="Гейм">Гейм</option>
      </Field>

      <Field
        type="select"
        name="status"
        label="Статус"
        value={formData.isPublished}
        onChange={(e) => handleChange("isPublished", e.target.value)}
      >
        <option value="false">Черновик</option>
        <option value="true">Опубликован</option>
      </Field>

      <div className={styles["create-post__actions"]}>
        <div className={styles["create-post__buttons"]}>
          <Button
            label={isSaving ? "Сохранение..." : "Создать"}
            onClick={handleSave}
            disabled={isSaving}
          />
          <Button label="Отмена" variant="bordered" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
