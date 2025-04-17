import dynamic from "next/dynamic";

const StoreLayout = dynamic(() => import("@/components/common/store-layout"), {
  ssr: false,
});

export default function Layout(props) {
  const AUTH_KEYWORD = process.env.AUTH_KEYWORD;
  return <StoreLayout authKeyword={AUTH_KEYWORD} {...props} />;
}
