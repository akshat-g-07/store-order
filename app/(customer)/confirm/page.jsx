"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Page() {
  const searchParams = useSearchParams();
  const orderID = searchParams.get("orderID");
  const router = useRouter();

  return (
    <>
      <section className="w-full max-w-[550px] mx-auto relative">
        <div className="w-screen h-screen flex flex-col items-center justify-center text-center text-2xl font-semibold space-y-8">
          <div>
            <p className="text-brand-primaryGreenHover flex items-center mb-2">
              <span>Your order is confirmed.</span>
              <BadgeCheck />
            </p>
            <p>Order ID: {orderID}</p>
          </div>
          <Button
            className="flex items-center text-xl font-medium bg-brand-primaryGreen text-white hover:bg-brand-primaryGreenHover py-8"
            onClick={() => {
              router.push("/order");
            }}
          >
            Order More
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </section>
    </>
  );
}
