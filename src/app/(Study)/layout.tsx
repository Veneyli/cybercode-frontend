"use client";

import { useState, PropsWithChildren } from "react";
import SidebarStudy from "@/widget/SidebarStudy/SidebarStudy";
import styles from "./layout.module.scss";

export default function StudyLayout({ children }: PropsWithChildren<unknown>) {
  const circlesCount = 3;
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.circles}>
        {Array.from({ length: circlesCount }, (_, index) => (
          <div key={index} className={styles.circle}></div>
        ))}
      </div>
      <div
        className={`${styles.layout} ${!isMenuOpen ? styles.collapsed : ""}`}
      >
        <SidebarStudy toggleMenu={toggleMenu} />
        <main
          className={`${styles["layout__content"]} ${
            !isMenuOpen ? styles.shifted : ""
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
