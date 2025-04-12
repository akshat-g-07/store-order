"use client";

import { useCallback, useEffect, useState } from "react";
import { getInventory } from "@/actions/inventory";
import { useVegOnlyStore } from "@/stores/veg-only";

import Error from "@/components/common/error";
import Loading from "@/components/common/loading";
import GoToKart from "@/components/order/go-to-cart";
import Menu from "@/components/order/menu";
import SearchBar from "@/components/order/search-bar";
import VegSwitch from "@/components/order/veg-switch";

export default function Page() {
  const { vegOnly } = useVegOnlyStore();
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    const response = await getInventory(vegOnly);
    if (response.error) {
      setError(response.error);
      setInventory([]);
    } else {
      setError(null);
      setInventory(response.data);
    }
    setIsLoading(false);
  }, [vegOnly]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <section className="w-full max-w-[550px] mx-auto relative">
        <section className="py-5 px-2 flex justify-between items-center sticky top-0 bg-gradient-to-r from-[#FFCF91] to-[#FFD194]">
          <SearchBar inventory={inventory} isLoading={isLoading} />
          <VegSwitch isLoading={isLoading} />
        </section>
        <section className="pt-5 pb-[300px] px-2 flex flex-col space-y-6">
          {isLoading && !error ? (
            <Loading className="w-full flex justify-center items-center py-[100px]" />
          ) : error ? (
            <Error />
          ) : (
            <Menu inventory={inventory} />
          )}
        </section>
        <GoToKart isLoading={isLoading} />
      </section>
    </>
  );
}
