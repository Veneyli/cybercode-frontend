"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function useModules(courseId: string | null) {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    async function fetchModules() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/module/${courseId}`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch modules");
        }

        const data = await response.json();
        setModules(data);
      } catch (error) {
        setError("Ошибка при загрузке модулей: " + (error as Error).message);
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, [courseId]);

  return { modules, loading, error };
}
