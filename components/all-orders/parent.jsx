"use client";

import { useState } from "react";
import { parseCookies } from "nookies";

import AuthStore from "@/components/all-orders/auth-store";
import Store from "@/components/all-orders/store";

export default function Parent({ authKeyword }) {
  const [auth, setAuth] = useState(false);
  const cookies = parseCookies();
  const authCookies = cookies.auth;
  const user = cookies.user;

  const handleAuth = (auth) => {
    setAuth(auth);
  };

  if (!auth && !authCookies)
    return <AuthStore authKeyword={authKeyword} onAuth={handleAuth} />;
  return <Store user={user} />;
}
