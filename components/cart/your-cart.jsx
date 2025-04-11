"use client";

import { useCartStore } from "@/stores/cart";

import ItemParent from "./item-parent";

export default function YourCart() {
  const { getAllObjects } = useCartStore();
  const allObjects = getAllObjects();

  return (
    <>
      <div className="font-semibold tracking-tight text-2xl sticky top-0">
        Your selected items:
      </div>
      <div className="py-5 px-2 flex flex-col space-y-6">
        {allObjects.map((object) => {
          return <ItemParent key={object} id={object} />;
        })}
      </div>
    </>
  );
}
