import dynamic from "next/dynamic";

const Parent = dynamic(() => import("@/components/all-orders/parent"), {
  ssr: false,
});

export default function Page() {
  const AUTH_KEYWORD = process.env.AUTH_KEYWORD;

  return <Parent authKeyword={AUTH_KEYWORD} />;
}
