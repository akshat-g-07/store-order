import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

const adminRoutes = ["/all-orders", "/order-history", "/inventory"];

export async function proxy(request) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
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
        cookieStore.set("user", user, {
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
