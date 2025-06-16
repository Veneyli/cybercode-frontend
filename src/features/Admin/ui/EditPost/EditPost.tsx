"use client";

import React, { useState } from "react";
import ImageUploader from "@/shared/ui/ImageUploader/ImageUploader";
import styles from "./EditPost.module.scss";
import Field from "@/shared/ui/Field/Field";
import TextEditor from "@/shared/ui/TextEditor/DynamicEditor";
import Image from "next/image";
import { Media } from "@/shared/types/media.types";
import Button from "@/shared/ui/Button/Button";
import { MediaService } from "@/shared/services/media.service";

interface EditPostPageProps {
  post: Media;
}

const EditPost: React.FC<EditPostPageProps> = ({ post }) => {
  const [formData, setFormData] = useState({
    title: post.title || "",
    image_url: post.image_url || "",
    content: post.content || "",
    category: post.category || "",
    description: post.description || "",
    isPublished: post.isPublished?.toString() || "false",
  });

  const [isSaving, setIsSaving] = useState(false);
  // const router = useRouter();

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await MediaService.mediaUpdate(post.media_id, {
        ...formData,
        isPublished: formData.isPublished === "true",
      });
      // router.push("/media");
    } catch (e) {
      console.error("Ошибка при сохранении", e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // router.push("/media");
  };

  const handleDelete = async () => {
    try {
      if (confirm("Вы уверены, что хотите удалить пост?")) {
        await MediaService.mediaDelete(post.media_id);
        // router.push("/media");
      }
    } catch (e) {
      console.error("Ошибка при удалении", e);
    }
  };

  return (
    <div className={styles["edit-post"]}>
      <Field
        label="Заголовок"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <div className={styles["edit-post__field"]}>
        <label className={styles["edit-post__label"]} htmlFor="description">
          Описание
        </label>
        <textarea
          className={styles["edit-post__textarea"]}
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
      <div className={styles["edit-post__image"]}>
        {formData.image_url && (
          <Image
            src={
              formData.image_url
                ? `${process.env.NEXT_PUBLIC_API_URL}${formData.image_url}`
                : "/images/placeholder.jpeg"
            }
            alt="Превью"
            width={200}
            height={150}
            className={styles["edit-post__image-preview"]}
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
        <option value="news">Новости</option>
        <option value="tech">Технологии</option>
      </Field>

      <Field
        type="select"
        name="status"
        label="Статус"
        value={String(formData.isPublished)}
        onChange={(e) => handleChange("isPublished", e.target.value)}
      >
        <option value="false">Черновик</option>
        <option value="true">Опубликован</option>
      </Field>
      <div className={styles["edit-post__actions"]}>
        <div className={styles["edit-post__buttons"]}>
          <Button
            label={isSaving ? "Сохранение..." : "Сохранить"}
            onClick={handleSave}
            disabled={isSaving}
          />
          <Button label="Отмена" variant="bordered" onClick={handleCancel} />
        </div>
        <div className={styles["edit-post__delete"]}>
          <Button variant="remove" label="Удалить" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default EditPost;
