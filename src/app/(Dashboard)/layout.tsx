"use client";

import { useState, PropsWithChildren } from "react";
import Sidebar from "@/widget/Sidebar/Sidebar";
import styles from "./layout.module.scss";

export default function ProfileLayout({
  children,
}: PropsWithChildren<unknown>) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.circles}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div
        className={`${styles.layout} ${!isMenuOpen ? styles.collapsed : ""}`}
      >
        <Sidebar toggleMenu={toggleMenu} />
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
