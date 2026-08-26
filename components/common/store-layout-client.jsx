"use client";

import dynamic from "next/dynamic";

// ssr: false must live in a Client Component (not allowed in Server Components).
const StoreLayout = dynamic(() => import("@/components/common/store-layout"), {
  ssr: false,
});

export default function StoreLayoutClient(props) {
  return <StoreLayout {...props} />;
}
