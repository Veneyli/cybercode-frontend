"use client";

import React from "react";
import Button from "@/shared/ui/Button/Button";
import styles from "./Categories.module.scss";

const categories = [
  "Все",
  "Программирование",
  "Гейм",
  "Дизайн",
  "Веб-разработка",
];

interface CategoriesProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
}

export default function Categories({
  selectedCategory,
  onChangeCategory,
}: CategoriesProps) {
  return (
    <div className={styles.category}>
      {categories.map((category) => (
        <div key={category} className={styles.category__item}>
          <Button
            label={category}
            size="small"
            variant={selectedCategory === category ? "solid" : "flat"}
            onClick={() => onChangeCategory(category)}
          />
        </div>
      ))}
    </div>
  );
}
