import StoreLayoutClient from "@/components/common/store-layout-client";

export default function Layout(props) {
  const AUTH_KEYWORD = process.env.AUTH_KEYWORD;
  return <StoreLayoutClient authKeyword={AUTH_KEYWORD} {...props} />;
}
