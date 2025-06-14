"use client";
import { useEffect, useState } from "react";
import Field from "@/shared/ui/Field/Field";
import { technologies } from "@/admin/constants/technologies";
import ImageUploader from "@/shared/ui/ImageUploader/ImageUploader";
import styles from "./EditCourseForm.module.scss";
import Button from "@/shared/ui/Button/Button";
import Image from "next/image";
import { useUpdateCourse } from "@/admin/hooks/useUpdateCourse";
import { useCourse } from "@/admin/hooks/useCourse";
import { Module } from "@/shared/types/module.types";
import ModulesEditor from "@/features/Admin/ui/ModuleEditor/ModuleEditor";

interface EditCourseFormProps {
  courseId: number;
}

export default function EditCourseForm({ courseId }: EditCourseFormProps) {
  const { course, isLoading } = useCourse(courseId);

  const { updateCourse } = useUpdateCourse(courseId);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    level: "",
    image_url: "",
    modules: [] as Module[],
  });

  useEffect(() => {
    if (!isLoading && course) {
      setForm({
        title: course.title ?? "",
        description: course.description ?? "",
        technologies: course.technologies ?? [],
        level: course.level ?? "",
        image_url: course.image_url ?? "",
        modules: course.modules ?? [],
      });
    }
  }, [course, isLoading]);

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
    await updateCourse(form);
  };
  if (isLoading) return <p>Загрузка...</p>;
  return (
    <form className={styles["edit-course"]} onSubmit={handleSubmit}>
      <Field
        label="Название курса"
        name="title"
        placeholder="Название курса"
        value={form.title}
        onChange={handleChange}
      />

      <div className={styles["edit-course__field"]}>
        <label htmlFor="technologies" className={styles["edit-course__label"]}>
          Картинка курса
        </label>
        <div className={styles["edit-course__image-wrapper"]}>
          <Image
            src={
              form.image_url
                ? `${process.env.NEXT_PUBLIC_API_URL}${form.image_url}`
                : "/images/placeholder.jpeg"
            }
            alt="Course Image"
            width={200}
            height={200}
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

      <div className={styles["edit-course__field"]}>
        <label htmlFor="description" className={styles["edit-course__label"]}>
          Описание курса
        </label>
        <textarea
          className={styles["edit-course__textarea"]}
          name="description"
          id="description"
          placeholder="Описание курса"
          value={form.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className={styles["edit-course__field"]}>
        <label className={styles["edit-course__label"]}>Технологии</label>
        <div className={styles["edit-course__tech-wrapper"]}>
          {form.technologies.map((tech) => {
            const label =
              technologies.find((t) => t.value === tech)?.label || tech;
            return (
              <span key={tech} className={styles["edit-course__tag"]}>
                {label}
                <button
                  onClick={() => handleRemoveTech(tech)}
                  type="button"
                  className={styles["edit-course__remove-button"]}
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

      <div className={styles["edit-course__field"]}>
        <label htmlFor="level" className={styles["edit-course__label"]}>
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
      <div>
        <ModulesEditor
          currentCourseId={courseId}
          modules={form.modules}
          onChange={(modules) => setForm((prev) => ({ ...prev, modules }))}
        />
      </div>
      <Button label="Сохранить курс" type="submit" />
    </form>
  );
}
