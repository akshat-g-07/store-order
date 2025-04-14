import PlaceOrder from "@/components/cart/place-order";
import YourCart from "@/components/cart/your-cart";

export default function Page() {
  return (
    <>
      <section className="py-5 px-2">
        <YourCart />
      </section>
      <PlaceOrder />
    </>
  );
}
