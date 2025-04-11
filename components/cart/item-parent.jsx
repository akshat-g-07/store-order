import { useCartStore } from "@/stores/cart";

import MenuItem from "@/components/common/menu-item";

export default function ItemParent({ id }) {
  const { addItem, getItem, decreaseItem } = useCartStore();
  // MARK: server action to get object details
  const item = {
    id: 1,
    name: "Honey Chilli Potato",
    veg: Math.random() > 0.5 ? true : false,
    price: "230",
  };

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
    <MenuItem
      id={id}
      name={item.name}
      price={item.price}
      veg={item.veg}
      minusClick={handleMinusClick}
      getValue={handleGetValue}
      plusClick={handlePlusClick}
    />
  );
}
