"use client";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useState, useEffect } from "react";
import styles from "./ToggleSwitcher.module.scss";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === "dark");

  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]);

  const handleClick = () => {
    toggleTheme();
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={styles.switch}>
      <label className={styles.switch__label}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleClick}
          className={styles.switch__input}
          id="slider"
        />
        <span
          className={`${styles.switch__slider} ${
            isChecked ? styles.switch__sliderChecked : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
