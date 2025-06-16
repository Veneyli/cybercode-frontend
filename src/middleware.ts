import { NextResponse } from "next/server";
import { parse } from "cookie";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get("cookie") || "");
  const sessionCookie = cookies["session"];

  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  if (!sessionCookie) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/api/auth/check-session`, {
      credentials: "include",
      headers: {
        cookie: `session=${sessionCookie}`,
      },
    });

    if (!response.ok) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    const user = await response.json();
    console.log("Пользователь из сессии:", user);
    const role = user?.user?.role;

    if (pathname.startsWith("/admin")) {
      // Если не ADMIN и не TEACHER — вообще не пускаем в админку
      if (role !== "ADMIN" && role !== "TEACHER") {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }

      if (role === "TEACHER" && pathname.startsWith("/admin/users")) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }
  } catch (error) {
    console.error("Ошибка в middleware:", error);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/study",
    "/edit-profile",
    "/admin/:path*",
  ],
};
