import Footer from "@/components/common/footer";

export default function Layout({ children }) {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
}
