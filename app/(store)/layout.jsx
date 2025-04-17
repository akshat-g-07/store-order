import StoreNav from "@/components/common/store-nav";

export default function Layout({ children }) {
  return (
    <section>
      <StoreNav />
      {children}
    </section>
  );
}
