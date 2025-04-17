import { NextResponse } from "next/server";

const adminRoutes = ["/all-orders", "/order-history", "/inventory"];

export function middleware(request) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  const userCookie = request.cookies.get("user")?.value;
  const userParam = url.searchParams?.get("user");

  const user = userParam || userCookie;
  const authUsers = JSON.parse(process.env.AUTH_USERS);

  if (path === "/") {
    return NextResponse.redirect(new URL("/order", request.url));
  }

  if (adminRoutes.includes(path)) {
    if (!authUsers.includes(user)) {
      return NextResponse.redirect(new URL("/order", request.url));
    }

    if (userParam) {
      url.searchParams.delete("user");
      const response = NextResponse.redirect(url);
      if (!userCookie) {
        response.cookies.set("user", user, {
          httpOnly: false,
          sameSite: "lax",
          expires: new Date("2100-01-01T00:00:00.000Z"),
        });
      }

      return response;
    }
  }

  return NextResponse.next();
}
