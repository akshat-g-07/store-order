"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart";
import { ChevronRight } from "lucide-react";

import ItemParent from "./item-parent";

export default function YourCart() {
  const router = useRouter();
  const { getAllObjects } = useCartStore();
  const allObjects = getAllObjects();

  if (allObjects.length === 0) {
    return (
      <div
        className="w-full h-[300px] flex flex-col items-center justify-center text-center text-2xl font-semibold space-y-4 cursor-pointer"
        onClick={() => {
          router.push("/order");
        }}
      >
        <p>No items selected</p>
        <p className="flex items-center text-xl font-medium">
          Go To Menu
          <ChevronRight className="size-5" />
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="font-semibold tracking-tight text-2xl sticky top-0 bg-white">
        Your selected items:
      </div>
      <div className="pt-5 pb-[300px] px-2 flex flex-col space-y-6">
        {allObjects.map((object) => {
          return <ItemParent key={object} id={object} />;
        })}
      </div>
    </>
  );
}
