"use client";

import React, { useState, useEffect, useRef } from "react";
import Field from "@/ui/Field/Field";
import Button from "@/ui/Button/Button";
import styles from "./SearchCourse.module.scss";
import { Course } from "@/types/course.types";
import Link from "next/link";

interface SearchProps {
  courses: Course[];
  onSearch: (filtered: Course[]) => void;
}

export default function SearchCourse({ courses, onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { id: string; title: string }[]
  >([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(
        filtered.map((course) => ({
          id: String(course.course_id),
          title: course.title,
        }))
      );
    } else {
      setFilteredSuggestions([]);
      onSearch(courses);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setFilteredSuggestions([]);

    const filtered = courses.filter(
      (course) => course.title.toLowerCase() === suggestion.toLowerCase()
    );
    onSearch(filtered);
  };

  const handleSearchClick = () => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filtered);
    setFilteredSuggestions([]);
  };

  return (
    <div className={styles.search} ref={wrapperRef}>
      <Field
        type="text"
        placeholder="Поиск по курсам"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {filteredSuggestions.length > 0 && (
        <ul className={styles["search__suggestions"]}>
          {filteredSuggestions.map(({ id, title }) => (
            <li
              className={styles["search__suggestions-item"]}
              key={id}
              onClick={() => handleSuggestionClick(title)}
            >
              <Link
                href={`/courses/${id}`}
                onClick={() => setFilteredSuggestions([])}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Button label="Поиск" variant="solid" onClick={handleSearchClick} />
    </div>
  );
}
