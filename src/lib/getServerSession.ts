import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-session`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}
