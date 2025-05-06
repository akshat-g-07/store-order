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
      {Object.keys(inventory).map((category) => (
        <div key={category}>
          <h2 className="text-lg font-bold mb-4">{category}</h2>
          <div className="space-y-4">
            {inventory[category].map((item) => (
              <MenuItem
                id={item.id}
                key={item.id}
                veg={item.veg}
                name={item.name}
                price={item.pricePerItem}
                description={item.description}
                minusClick={handleMinusClick}
                getValue={handleGetValue}
                plusClick={handlePlusClick}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
