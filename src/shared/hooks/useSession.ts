import { useState, useEffect } from "react";

export function useSession() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-session`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Ошибка проверки сессии:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  return { user, loading, setUser };
}
