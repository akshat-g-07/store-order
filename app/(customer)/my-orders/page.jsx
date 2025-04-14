"use client";

import { useState } from "react";
import { GetUserOrdersByPhoneNumber } from "@/actions/user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Error from "@/components/common/error";
import Loading from "@/components/common/loading";
import ShowOrders from "@/components/my-orders/show-orders";

export default function Page() {
  const [userPhone, setUserPhone] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserPhoneChange = (e) => {
    setUserPhone(e.target.value);
  };

  const handleSubmit = async () => {
    if (userPhone.length === 0) {
      setError("Please enter your phone number.");
      setOrders(null);
      return;
    }

    if (userPhone.length !== 10) {
      setError("Please enter a valid phone number.");
      setOrders(null);
      return;
    }

    setIsLoading(true);
    const response = await GetUserOrdersByPhoneNumber(userPhone);
    console.log(response);
    if (response.error === "User not found") {
      setError("Please place an order first.");
      setOrders(null);
    } else if (response.error === "Failed to fetch users orders") {
      setError("Failed to fetch users orders");
      setOrders(null);
    } else {
      setError("");
      setOrders(response.data.orders);
    }
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col gap-2 items-center pt-6">
      <label htmlFor="userPhone" className="w-full text-center">
        Enter your Phone Number:
      </label>
      <Input
        id="userPhone"
        type="tel"
        pattern="[0-9]*"
        inputMode="numeric"
        value={userPhone}
        onChange={handleUserPhoneChange}
        className="focus-visible:ring-brand-primaryGreen max-w-[250px]"
        disabled={isLoading}
      />
      <Button
        className="mt-4 bg-brand-primaryGreen hover:bg-brand-primaryGreenHover"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Submit
      </Button>
      {isLoading && <Loading className="mt-10" />}
      {error === "Failed to fetch users orders" ? (
        <Error />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders?.length > 0 ? (
        <ShowOrders orders={orders} />
      ) : (
        !error && orders && <p className="mt-5">No orders found.</p>
      )}
    </section>
  );
}
