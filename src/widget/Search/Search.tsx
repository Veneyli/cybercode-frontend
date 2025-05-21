"use client";

import React, { useEffect, useState } from "react";
import Field from "@/ui/Field/Field";
import Button from "@/ui/Button/Button";
import styles from "./Search.module.scss";

const searchSuggestions = [
  "Как создать сайт?",
  "HTML, CSS",
  "React, Next.js",
  "Лучшие курсы по программированию",
  "Советы для начинающих разработчиков",
  "Как выбрать язык программирования?",
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {}, [searchTerm]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const suggestions = searchSuggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setFilteredSuggestions([]);
  };
  return (
    <div className={styles.search}>
      <Field
        type="text"
        placeholder="Поиск по материалам"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {filteredSuggestions.length > 0 && (
        <ul className={styles["search__suggestions"]}>
          {filteredSuggestions.map((suggestion) => (
            <li
              className={styles["search__suggestions-item"]}
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <Button
        label="Поиск"
        variant="solid"
        onClick={() => setSearchTerm(searchQuery)}
      />
    </div>
  );
}
