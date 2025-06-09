import { useState, useEffect } from "react";

interface IUser {
  user_id: string;
  username: string;
  email: string;
}

export function useSession() {
  const [user, setUser] = useState<IUser | null>(null);
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
          setUser(data.user as IUser);
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
