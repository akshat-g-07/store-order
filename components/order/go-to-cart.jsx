"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart";
import { CircleArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GoToKart({ isLoading }) {
  const router = useRouter();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <>
      <section
        className={cn(
          "py-5 px-2 fixed bg-gradient-to-r from-[#FFCF91] to-[#FFD194] w-full transition-all duration-300 ease-in -bottom-full max-w-[550px] cursor-pointer",
          totalItems && "bottom-20",
          isLoading && "opacity-50 pointer-events-none"
        )}
        onClick={() => {
          router.push("/cart");
        }}
      >
        <Card className="w-full max-w-[500px] bg-transparent shadow-none border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex space-x-2 items-center text-2xl justify-center">
              <span>View Cart</span>
              <CircleArrowRight />
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full text-center">
            {totalItems} item
            <span className={cn(totalItems > 1 ? "inline-flex" : "hidden")}>
              s
            </span>{" "}
            added.
          </CardContent>
        </Card>
      </section>
    </>
  );
}
