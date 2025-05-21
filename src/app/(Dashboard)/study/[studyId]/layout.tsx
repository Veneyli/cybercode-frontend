"use client";

import React, { useState } from "react";
import SidebarStudy from "@/widget/SidebarStudy/SidebarStudy";
import styles from "./layout.module.scss";
import Button from "@/shared/ui/Button/Button";
import { IoListOutline } from "react-icons/io5";
import { LectureProgressProvider } from "@/app/providers/LectureProgressContext";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
  params: { studyId: string };
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <LectureProgressProvider>
      <div
        className={`${styles.studyLayout} ${
          isSidebarOpen ? styles.expanded : ""
        }`}
      >
        <div className={styles["studyLayout__content"]}>{children}</div>
        <div className={styles["studyLayout__sidebar"]}>
          <div className={styles["studyLayout__toggleButton"]}>
            {!isSidebarOpen && (
              <Button
                icon={<IoListOutline />}
                label="Уроки"
                onClick={toggleSidebar}
              />
            )}
          </div>
          <SidebarStudy
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </LectureProgressProvider>
  );
}
