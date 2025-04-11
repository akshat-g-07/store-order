"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart";
import { Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlaceOrder() {
  const router = useRouter();
  const { getAllObjects } = useCartStore();
  const allObjects = getAllObjects();

  //   MARK: calculate total price by getting all items, iterating over them, get price from db and add them
  const totalPrice = 200;

  if (allObjects.length === 0) {
    return <></>;
  }

  return (
    <div
      className="py-5 px-2 fixed bg-gradient-to-r from-[#FFCF91] to-[#FFD194] w-full max-w-[550px] bottom-0"
      onClick={() => {
        router.push("/confirm");
      }}
    >
      <Card className="w-full max-w-[500px] bg-transparent shadow-none border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex space-x-2 items-center text-2xl justify-center">
            <span>Place Order</span>
            <Check />
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full text-center text-xl">
          Total <span className="font-semibold">Rs. {totalPrice}</span>
        </CardContent>
      </Card>
    </div>
  );
}
