"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./SidebarStudy.module.scss";
import Button from "@/shared/ui/Button/Button";
import ThemeSwitcher from "@/features/ToggleSwitcher/ToggleSwitcher";
import { LuPanelLeftClose, LuLogOut, LuPanelLeft } from "react-icons/lu";
import { useCourse } from "@/shared/hooks/useCourse";
import { useModules } from "@/hooks/useModules";
import { useLectures } from "@/hooks/useLectures";

interface SidebarProps {
  toggleMenu: () => void;
}

const SidebarStudy: React.FC<SidebarProps> = ({ toggleMenu }) => {
  const { studyId } = useParams<{ studyId: string }>();

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { course, loading: loadingCourse } = useCourse(studyId);
  const { modules, loading: loadingModules } = useModules(studyId);
  const { lectures, loading: loadingLectures } = useLectures(studyId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingCourse && !loadingModules && !loadingLectures) {
      setLoading(false);
    }
  }, [loadingCourse, loadingModules, loadingLectures]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (loading || !modules || !lectures) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <div
        className={`${styles.buttonMenu} ${
          isMenuOpen ? styles.hideButton : styles.showButton
        }`}
      >
        <Button
          onClick={handleToggleMenu}
          icon={<LuPanelLeft />}
          variant="transparent"
        />
      </div>

      <div
        className={`${styles.sidebar} ${
          isMenuOpen ? styles.show : styles.hide
        }`}
      >
        <div className={styles.sidebar__header}>
          <div className={styles.themeSwitcher}>
            <ThemeSwitcher />
          </div>
          <div className={styles.settingsButtons}>
            <Button
              icon={<LuPanelLeftClose />}
              variant="transparent"
              onClick={handleToggleMenu}
            />
          </div>
        </div>
        <nav className={styles.navigation}>
          <div>
            <h3 className={styles.navigation__title}>{course.title}</h3>
            {modules?.map((module, moduleIndex) => {
              const moduleLectures =
                lectures?.filter(
                  (lecture) => lecture.module_id === module.module_id
                ) || [];

              return (
                <details
                  key={module.module_id || `module-${moduleIndex}`}
                  className={styles["navigation__details"]}
                >
                  <summary className={styles["navigation__details-title"]}>
                    {`Модуль ${module.module_id}. ${module.title}`}
                  </summary>
                  <ul className={styles["navigation__list"]}>
                    {moduleLectures.map((lecture, lectureIndex) => (
                      <li
                        key={`${module.module_id || "default-module"}-${
                          lecture.id || `lecture-${lectureIndex}`
                        }`}
                        className={styles["navigation__item"]}
                      >
                        <Link
                          className={styles.navigation__link}
                          href={`/study/${studyId}/modules/${module.module_id}/lectures/${lecture.id}`}
                        >
                          {`Лекция ${lecture.lecture_id}.  ${lecture.title}`}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
          <div className={styles.footer}>
            <Button label="Выход" icon={<LuLogOut />} variant="transparent" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarStudy;
