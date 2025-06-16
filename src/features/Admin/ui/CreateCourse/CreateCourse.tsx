"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Field from "@/shared/ui/Field/Field";
import { technologies } from "@/admin/constants/technologies";
import ImageUploader from "@/shared/ui/ImageUploader/ImageUploader";
import styles from "./CreateCourse.module.scss";
import Button from "@/shared/ui/Button/Button";
import Image from "next/image";
import { CourseService } from "@/services/course.service";

export default function CreateCourseForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    level: "",
    image_url: "",
    small_description: "",
  });

  const [showTechSelect, setShowTechSelect] = useState(false);
  const [selectedTech, setSelectedTech] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectTech = (value: string) => {
    if (value && !form.technologies.includes(value)) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, value],
      }));
      setSelectedTech("");
      setShowTechSelect(false);
    }
  };

  const handleRemoveTech = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdCourse = await CourseService.create(form);
      console.log("Created course:", createdCourse);
      if (createdCourse && createdCourse.course_id) {
        router.push(`/admin/edit-course/${createdCourse.course_id}`);
      } else {
        console.error("Course not created, response:", createdCourse);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form className={styles["create-course"]} onSubmit={handleSubmit}>
      <Field
        label="Название курса"
        name="title"
        placeholder="Название курса"
        value={form.title}
        onChange={handleChange}
      />

      <div className={styles["create-course__field"]}>
        <label htmlFor="image" className={styles["create-course__label"]}>
          Картинка курса
        </label>
        <div className={styles["create-course__image-wrapper"]}>
          <Image
            src={
              form.image_url
                ? `${process.env.NEXT_PUBLIC_API_URL}${form.image_url}`
                : "/images/placeholder.jpeg"
            }
            alt="Course Image"
            width={200}
            height={200}
            unoptimized
          />
          <ImageUploader
            value={form.image_url}
            onChange={(_, serverPath) => {
              if (serverPath) {
                setForm((prev) => ({ ...prev, image_url: serverPath }));
              }
            }}
            folder="courses"
          />
        </div>
      </div>

      <div className={styles["create-course__field"]}>
        <label htmlFor="description" className={styles["create-course__label"]}>
          Описание курса
        </label>
        <textarea
          className={styles["create-course__textarea"]}
          name="description"
          id="description"
          placeholder="Описание курса"
          value={form.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className={styles["create-course__field"]}>
        <label
          htmlFor="small_description"
          className={styles["create-course__label"]}
        >
          Короткое описание курса
        </label>
        <textarea
          className={styles["create-course__textarea"]}
          name="small_description"
          id="small_description"
          placeholder="Короткое описание курса"
          value={form.small_description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className={styles["create-course__field"]}>
        <label className={styles["create-course__label"]}>Технологии</label>
        <div className={styles["create-course__tech-wrapper"]}>
          {form.technologies.map((tech) => {
            const label =
              technologies.find((t) => t.value === tech)?.label || tech;
            return (
              <span key={tech} className={styles["create-course__tag"]}>
                {label}
                <button
                  onClick={() => handleRemoveTech(tech)}
                  type="button"
                  className={styles["create-course__remove-button"]}
                >
                  &times;
                </button>
              </span>
            );
          })}
          {showTechSelect ? (
            <Field
              name="technologies"
              value={selectedTech}
              onChange={(e) => handleSelectTech(e.target.value)}
              type="select"
            >
              <option value="">Выберите технологию</option>
              {technologies
                .filter((tech) => !form.technologies.includes(tech.value))
                .map((tech) => (
                  <option key={tech.value} value={tech.value}>
                    {tech.label}
                  </option>
                ))}
            </Field>
          ) : (
            <Button
              size="small"
              label="+"
              variant="bordered"
              type="button"
              onClick={() => setShowTechSelect(true)}
            />
          )}
        </div>
      </div>

      <div className={styles["create-course__field"]}>
        <label htmlFor="level" className={styles["create-course__label"]}>
          Уровень
        </label>
        <Field
          name="level"
          value={form.level}
          onChange={handleChange}
          type="select"
        >
          <option value="">Выберите уровень</option>
          <option value="beginner">Новичок</option>
          <option value="intermediate">Средний</option>
          <option value="advanced">Продвинутый</option>
        </Field>
      </div>

      <Button label="Создать курс" type="submit" />
    </form>
  );
}
