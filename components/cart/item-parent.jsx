"use client";

import { useCallback, useEffect, useState } from "react";
import { GetInventoryItemByID } from "@/actions/inventory";
import { useCartStore } from "@/stores/cart";

import Error from "@/components/common/error";
import Loading from "@/components/common/loading";
import MenuItem from "@/components/common/menu-item";

export default function ItemParent({ id }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryItem, setInventoryItem] = useState(null);
  const { addItem, getItem, decreaseItem } = useCartStore();

  const fetchInventoryItem = useCallback(async () => {
    setIsLoading(true);
    const response = await GetInventoryItemByID(id);
    if (response.error) {
      setError(response.error);
      setInventoryItem(null);
    } else {
      setError(null);
      setInventoryItem(response.data);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchInventoryItem();
  }, [fetchInventoryItem]);

  const handleMinusClick = (id) => {
    decreaseItem(id);
  };
  const handleGetValue = (id) => {
    return getItem(id);
  };
  const handlePlusClick = (id) => {
    addItem(id);
  };

  if (isLoading) {
    return (
      <Loading className="w-full h-[120px] flex justify-center items-center" />
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      {inventoryItem.name && (
        <MenuItem
          id={id}
          name={inventoryItem.name}
          price={inventoryItem.pricePerItem}
          veg={inventoryItem.veg}
          description={inventoryItem.description}
          minusClick={handleMinusClick}
          getValue={handleGetValue}
          plusClick={handlePlusClick}
        />
      )}
    </>
  );
}
