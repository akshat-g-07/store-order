"use client";

import { useCartStore } from "@/stores/cart";

import MenuItem from "@/components/common/menu-item";

export default function Menu({ inventory }) {
  const { addItem, getItem, decreaseItem } = useCartStore();

  const handleMinusClick = (id) => {
    decreaseItem(id);
  };
  const handleGetValue = (id) => {
    return getItem(id);
  };
  const handlePlusClick = (id) => {
    addItem(id);
  };
  return (
    <>
      {inventory.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.pricePerItem}
          veg={item.veg}
          minusClick={handleMinusClick}
          getValue={handleGetValue}
          plusClick={handlePlusClick}
        />
      ))}
    </>
  );
}
