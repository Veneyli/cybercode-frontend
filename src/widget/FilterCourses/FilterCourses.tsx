"use client";
import React, { useState, useEffect } from "react";
import styles from "./FilterCourses.module.scss";
import { CourseService } from "@/shared/services/course.service";

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
];
const levels = {
  beginner: "Новичок",
  intermediate: "Средний",
  advanced: "Продвинутый",
};

const FilterCourses = ({ onResult }) => {
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await CourseService.getFilteredCourses(
          selectedTechnology,
          selectedLevel
        );
        onResult(courses);
      } catch (error) {
        console.error("Ошибка при фильтрации курсов:", error);
      }
    };

    fetchCourses();
  }, [selectedTechnology, selectedLevel, onResult]);

  return (
    <div className={styles["courses-filter"]}>
      <div className={styles["courses-filter__section"]}>
        <h2 className={styles["courses-filter__title"]}>Уровень сложности</h2>
        <div className={styles["courses-filter__radio-group"]}>
          <label className={styles["courses-filter__radio-label"]}>
            <input
              type="radio"
              name="level"
              value=""
              checked={selectedLevel === ""}
              onChange={() => setSelectedLevel("")}
              className={styles["courses-filter__radio"]}
            />
            Все
          </label>
          {Object.entries(levels).map(
            ([levelKey, levelLabel]: [string, string]) => (
              <label
                key={levelKey}
                className={styles["courses-filter__radio-label"]}
              >
                <input
                  type="radio"
                  name="level"
                  value={levelKey}
                  checked={selectedLevel === levelKey}
                  onChange={() => setSelectedLevel(levelKey)}
                  className={styles["courses-filter__radio"]}
                />
                {levelLabel}
              </label>
            )
          )}
        </div>
      </div>

      <div className={styles["courses-filter__section"]}>
        <h2 className={styles["courses-filter__title"]}>Технологии</h2>
        <div className={styles["courses-filter__checkbox-group"]}>
          {technologies.map((tech) => (
            <label
              key={tech}
              className={styles["courses-filter__checkbox-label"]}
            >
              <input
                type="checkbox"
                value={tech}
                checked={selectedTechnology.includes(tech)}
                onChange={() => {
                  if (selectedTechnology.includes(tech)) {
                    setSelectedTechnology(
                      selectedTechnology.filter((item) => item !== tech)
                    );
                  } else {
                    setSelectedTechnology([...selectedTechnology, tech]);
                  }
                }}
                className={styles["courses-filter__checkbox"]}
              />
              {tech}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCourses;
