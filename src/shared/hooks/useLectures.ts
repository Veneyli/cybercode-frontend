"use client";

import { useState, useEffect } from "react";
const API_URL = "http://localhost:4000";

export function useLectures(moduleId: string | null) {
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId) return;

    async function fetchLectures() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/lecture/${moduleId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch lectures");
        }

        const data = await response.json();
        setLectures(data);
      } catch (error) {
        setError("Ошибка при загрузке лекций: " + error.message);
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLectures();
  }, [moduleId]);
  return { lectures, loading, error };
}
