import PlaceOrder from "@/components/cart/place-order";
import YourCart from "@/components/cart/your-cart";

export default function Page() {
  return (
    <section className="w-full max-w-[550px] mx-auto relative">
      <section className="py-5 px-2">
        <YourCart />
      </section>
      <PlaceOrder />
    </section>
  );
}
