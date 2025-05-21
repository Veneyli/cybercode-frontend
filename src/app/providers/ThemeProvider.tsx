"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import useThemeStorage from "@/hooks/useThemeStorage";
import { applyThemeClass } from "@/utils/themeUtils";
import { ThemeContextType } from "@/shared/types/theme.types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useThemeStorage("light");

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme должен использоваться внутри ThemeProvider");
  }
  return context;
};
