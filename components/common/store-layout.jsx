"use client";

import { useState } from "react";
import { parseCookies } from "nookies";

import AuthStore from "@/components/common/auth-store";

import StoreNav from "./store-nav";

export default function StoreLayout({ authKeyword, children }) {
  const [auth, setAuth] = useState(false);
  const cookies = parseCookies();
  const authCookies = cookies.auth;

  const handleAuth = (auth) => {
    setAuth(auth);
  };

  if (!auth && !authCookies)
    return <AuthStore authKeyword={authKeyword} onAuth={handleAuth} />;

  return (
    <section>
      <StoreNav />
      {children}
    </section>
  );
}
