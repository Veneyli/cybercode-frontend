"use client";

import React, { useState, useEffect, useRef } from "react";
import Field from "@/ui/Field/Field";
import Button from "@/ui/Button/Button";
import styles from "./SearchMedia.module.scss";
import Link from "next/link";
import { Media } from "@/types/media.types";

interface SearchMediaProps {
  media: Media[];
  onSearch: (filtered: Media[]) => void;
  selectedCategory: string;
}

export default function SearchMedia({
  media,
  onSearch,
  selectedCategory,
}: SearchMediaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Media[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (media.length === 0) return;

    if (searchQuery.trim() === "") {
      const filtered =
        selectedCategory === "Все"
          ? media
          : media.filter((m) => m.category === selectedCategory);

      const same =
        media.length === filtered.length &&
        media.every((item, i) => item.media_id === filtered[i].media_id);

      if (!same) {
        onSearch(filtered);
      }
    }
  }, [searchQuery, selectedCategory, media, onSearch]);

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
      const suggestions = media.filter(
        (m) =>
          m.title.toLowerCase().includes(value.toLowerCase()) &&
          (selectedCategory === "Все" || m.category === selectedCategory)
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSearchClick = () => {
    const filtered = media.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "Все" || m.category === selectedCategory)
    );
    onSearch(filtered);
    setFilteredSuggestions([]);
  };

  return (
    <div className={styles.search} ref={wrapperRef}>
      <Field
        type="text"
        placeholder="Поиск по материалам"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {filteredSuggestions.length > 0 && (
        <ul className={styles["search__suggestions"]}>
          {filteredSuggestions.map((item) => (
            <li
              key={item.media_id}
              className={styles["search__suggestions-item"]}
            >
              <Link
                href={`/media/${item.media_id}`}
                onClick={() => setFilteredSuggestions([])}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Button label="Поиск" variant="solid" onClick={handleSearchClick} />
    </div>
  );
}
