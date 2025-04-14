"use client";

import { useCallback, useEffect, useState } from "react";
import { GetInventory } from "@/actions/inventory";
import { useToggleStore } from "@/stores/toggle";

import Error from "@/components/common/error";
import Loading from "@/components/common/loading";
import GoToCart from "@/components/order/go-to-cart";
import Menu from "@/components/order/menu";
import ModeSwitch from "@/components/order/mode-switch";
import SearchBar from "@/components/order/search-bar";

export default function Page() {
  const { vegOnly, nonVegOnly } = useToggleStore();
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    const response = await GetInventory(vegOnly, nonVegOnly);
    if (response.error) {
      setError(response.error);
      setInventory([]);
    } else {
      setError(null);
      setInventory(response.data);
    }
    setIsLoading(false);
  }, [vegOnly, nonVegOnly]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <section className="w-full max-w-[550px] mx-auto relative">
        <section className="py-5 px-2 flex flex-col justify-between items-center sticky top-0 bg-gradient-to-r from-[#FFCF91] to-[#FFD194]">
          <div className="flex space-x-2 items-center">
            <SearchBar inventory={inventory} isLoading={isLoading} />
            <div className="size-10 bg-[url('https://github.com/shadcn.png')] bg-no-repeat bg-center bg-cover rounded-full" />
          </div>
          <ModeSwitch isLoading={isLoading} />
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
        <GoToCart isLoading={isLoading} />
      </section>
    </>
  );
}
