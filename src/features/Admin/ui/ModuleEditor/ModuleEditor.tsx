import { useEffect, useRef, useState } from "react";
import { Module } from "@/shared/types/module.types";
import ModuleLessons from "../ModuleLessons/ModuleLesson";
import styles from "./ModuleEditor.module.scss";
import Button from "@/shared/ui/Button/Button";
import Heading from "@/shared/ui/Heading/Heading";
import Field from "@/shared/ui/Field/Field";
import { ModuleService } from "@/services/module.service";

interface ModulesEditorProps {
  modules: Module[];
  onChange: (modules: Module[]) => void;
  currentCourseId: number;
}
const ModulesEditor = ({
  modules,
  onChange,
  currentCourseId,
}: ModulesEditorProps) => {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  const updateOrders = async (modulesToUpdate: Module[]) => {
    const reOrdered = modulesToUpdate.map((m, idx) => ({
      ...m,
      order: idx + 1,
    }));
    await Promise.all(reOrdered.map((m) => ModuleService.upsert(m)));
    onChange(reOrdered);
  };

  const handleAddModule = async () => {
    const newModule: Omit<Module, "module_id"> = {
      title: "Новый модуль",
      description: "",
      order: modules.length ? Math.max(...modules.map((m) => m.order)) + 1 : 1,
      course_id: currentCourseId,
      lectures: [],
    };
    const createdModule = await ModuleService.upsert(newModule as Module);

    const updated = [...modules, createdModule];
    await updateOrders(updated);

    setEditingId(createdModule.module_id);
    setEditTitle(createdModule.title);
    setEditDescription(createdModule.description);
  };

  const handleEdit = (module: Module) => {
    setEditingId(module.module_id);
    setEditTitle(module.title);
    setEditDescription(module.description || "");
  };

  const handleSave = async (module: Module) => {
    const updatedModule: Module = {
      ...module,
      title: editTitle,
      description: editDescription,
    };
    await ModuleService.upsert(updatedModule);
    const updated = modules.map((m) =>
      m.module_id === module.module_id ? updatedModule : m
    );
    await updateOrders(updated);
    setEditingId(null);
  };

  const handleDelete = async (module_id: number) => {
    await ModuleService.remove(module_id);
    const updated = modules.filter((m) => m.module_id !== module_id);
    await updateOrders(updated);
    setEditingId(null);
  };
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const moveModule = async (index: number, direction: "up" | "down") => {
    const newModules = [...sortedModules];
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === newModules.length - 1)
    )
      return;
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    [newModules[index], newModules[swapIdx]] = [
      newModules[swapIdx],
      newModules[index],
    ];
    await updateOrders(newModules);
  };

  return (
    <div className={styles["module-editor"]}>
      <div className={styles["module-editor__header"]}>
        <Heading level={2}>Модули курса</Heading>
        <Button
          type="button"
          label="+ Добавить модуль"
          size="small"
          onClick={handleAddModule}
        />
      </div>
      <div className={styles["module-editor__list"]}>
        {sortedModules.length === 0 && (
          <div className={styles["module-editor__empty"]}>
            Модули не добавлены
          </div>
        )}
        {sortedModules.map((module, idx) => (
          <div key={module.module_id} className={styles["module-editor__item"]}>
            {editingId === module.module_id ? (
              <div className={styles["module-editor__edit-form"]}>
                <Field
                  label="Название модуля"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Описание модуля"
                  className={styles["module-editor__textarea"]}
                />
                <div className={styles["module-editor__buttons"]}>
                  <Button
                    size="small"
                    label="Сохранить"
                    type="button"
                    onClick={() => handleSave(module)}
                  />
                  <Button
                    size="small"
                    label="Отмена"
                    variant="bordered"
                    onClick={() => setEditingId(null)}
                  />
                  <Button
                    size="small"
                    variant="remove"
                    label="Удалить"
                    type="button"
                    onClick={() => handleDelete(module.module_id)}
                  />
                </div>
              </div>
            ) : (
              <div className={styles["module-editor__view"]}>
                <Heading level={3} className={styles["module-editor__title"]}>
                  {module.order}. {module.title}
                </Heading>
                <p className={styles["module-editor__desc"]}>
                  {module.description}
                </p>

                <div className={styles["module-editor__menu-wrapper"]}>
                  <button
                    type="button"
                    className={styles["module-editor__menu-button"]}
                    onClick={() =>
                      setMenuOpenId((prev) =>
                        prev === module.module_id ? null : module.module_id
                      )
                    }
                  >
                    ⋮
                  </button>

                  {menuOpenId === module.module_id && (
                    <div
                      ref={menuRef}
                      className={styles["module-editor__menu"]}
                    >
                      <button
                        className={styles["module-editor__menu-item"]}
                        onClick={() => {
                          handleEdit(module);
                          setMenuOpenId(null);
                        }}
                      >
                        Редактировать
                      </button>
                      <button
                        className={styles["module-editor__menu-item"]}
                        onClick={() => {
                          handleDelete(module.module_id);
                          setMenuOpenId(null);
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <ModuleLessons
                    moduleId={module.module_id}
                    courseId={currentCourseId}
                    lessons={module.lectures}
                    onUpdate={async (newLecture) => {
                      const updated = modules.map((m) =>
                        m.module_id === module.module_id
                          ? {
                              ...m,
                              lectures: [...(m.lectures ?? []), newLecture],
                            }
                          : m
                      );
                      onChange(updated);
                    }}
                    onDelete={(removedId) => {
                      const updated = modules.map((m) => {
                        if (m.module_id === module.module_id) {
                          return {
                            ...m,
                            lectures: (m.lectures ?? []).filter(
                              (lec) => lec.lecture_id !== removedId
                            ),
                          };
                        }
                        return m;
                      });
                      onChange(updated);
                    }}
                  />
                </div>

                <div className={styles["module-editor__move"]}>
                  <Button
                    size="small"
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveModule(idx, "up")}
                    label="↑"
                    variant="bordered"
                  />
                  <Button
                    size="small"
                    type="button"
                    disabled={idx === sortedModules.length - 1}
                    onClick={() => moveModule(idx, "down")}
                    label="↓"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesEditor;
