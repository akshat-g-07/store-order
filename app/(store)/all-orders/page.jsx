"use client";

import { parseCookies } from "nookies";

import Store from "@/components/all-orders/store";

export default function Page() {
  const cookies = parseCookies();
  const user = cookies.user;

  return <Store user={user} />;
}
