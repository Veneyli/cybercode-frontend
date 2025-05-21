"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "@/providers/ThemeProvider";

export default function TextEditor() {
  const { theme } = useTheme(); 
  const editor = useCreateBlockNote();

  const customTheme = {
    colors: {
      editor: {
        text: theme === "dark" ? "#e0e0e0" : "#020072", // Цвет текста
        background: theme === "dark" ? "#121212" : "white", // Цвет фона
      },
      menu: {
        text: theme === "dark" ? "#e0e0e0" : "#020072", // Цвет текста в меню
        background: theme === "dark" ? "#333333" : "white", // Цвет фона меню
        "&:hover": {
          text: "#ffffff", // Цвет текста при наведении
          background: "#fff", // Цвет фона при наведении
        },
      },
      tooltip: {
        text: theme === "dark" ? "#e0e0e0" : "#020072", // Цвет текста тултипа
        background: theme === "dark" ? "#333333" : "white", // Цвет фона тултипа
      },
    },
    borderRadius: 8, // Радиус скругления
    fontFamily: "Arial, Helvetica, sans-serif",
    height: 1000,
  };

  return (
    <div>
      <BlockNoteView editor={editor} theme={customTheme} />
    </div>
  );
}
