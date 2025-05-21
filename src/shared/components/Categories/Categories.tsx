"use client";

import React, { useState } from "react";
import Button from "@/shared/ui/Button/Button";
import styles from "./Categories.module.scss";

const categories = [
  "Все",
  "Программирование",
  "Гейм",
  "Дизайн",
  "Веб-разработка",
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("Все");

  return (
    <div className={styles.category}>
      {categories.map((category) => (
        <div key={category} className={styles.category__item}>
          <Button
            label={category}
            size="small"
            variant={selectedCategory === category ? "solid" : "flat"}
            onClick={() => setSelectedCategory(category)}
          />
        </div>
      ))}
    </div>
  );
}
