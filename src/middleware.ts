import { NextResponse } from "next/server";
import { parse } from "cookie";

export async function middleware(req) {
  const cookies = parse(req.headers.get("cookie") || "");
  const sessionCookie = cookies["connect.sid"];

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await fetch(
      "http://localhost:4000/api/auth/check-session",
      {
        headers: {
          cookie: `connect.sid=${sessionCookie}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (error) {
    console.error("Ошибка в middleware:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/study"],
};
