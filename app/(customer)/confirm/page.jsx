"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/stores/cart";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { BadgeCheck, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Confirm />
    </Suspense>
  );
}

function Confirm() {
  const router = useRouter();
  const { clearItems } = useCartStore();
  const searchParams = useSearchParams();
  const orderID = searchParams.get("orderID")?.split("aa")[1];

  useEffect(() => {
    if (!orderID) {
      alert("Please place an order first.");
      router.push("/order");
    }
  }, [orderID, router]);

  return (
    <>
      {orderID && (
        <>
          <div className="w-full flex flex-col items-center justify-center text-center text-2xl font-semibold space-y-8 pt-5">
            <div>
              <p className="text-brand-primaryGreenHover flex items-center mb-2">
                <span>Your order is confirmed.</span>
                <BadgeCheck />
              </p>
              <p>Order No: {orderID}</p>
            </div>
            <Button
              className="flex items-center text-xl font-medium bg-brand-primaryGreen text-white hover:bg-brand-primaryGreenHover py-8"
              onClick={() => {
                clearItems();
                router.push("/order");
              }}
            >
              Order More
              <ChevronRight className="size-5" />
            </Button>
            <div>
              <p>Follow us on Instagram:</p>
              <a
                href="https://www.instagram.com/the.momosmafia.jind"
                target="_blank"
                className="font-semibold text-orange-500 hover:underline flex items-center w-fit space-x-2 justify-center mb-2"
              >
                <InstagramLogoIcon className="size-5" />
                <span>the.momosmafia.jind</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
