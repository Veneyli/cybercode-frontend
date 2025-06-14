"use client";

import { useState, PropsWithChildren } from "react";
import SidebarAdmin from "@/widget/SidebarAdmin/SidebarAdmin";
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
        className={`${styles["layout"]} ${
          !isMenuOpen ? styles["collapsed"] : ""
        }`}
      >
        <SidebarAdmin toggleMenu={toggleMenu} />
        <main
          className={`${styles["layout__content"]} ${
            !isMenuOpen ? styles["shifted"] : ""
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
