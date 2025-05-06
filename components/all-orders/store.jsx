"use client";

import { useCallback, useEffect, useState } from "react";
import { GetOrdersByDate } from "@/actions/order";

import Error from "@/components/common/error";
import OrderItem from "@/components/common/order-item";

export default function Store() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    console.log("called at", Date());

    const { data, error } = await GetOrdersByDate();
    if (error) {
      setError(true);
      setOrders([]);
    } else {
      setOrders(
        data
          .filter((order) => order.status !== "DELIVERED")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setError(null);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const computeOrders = (orderID) => {
    setOrders((prev) =>
      prev
        .filter(
          (order) => order.status !== "DELIVERED" && order.orderID !== orderID
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };

  if (error) return <Error />;

  return (
    <section className="py-5 px-2 flex flex-col items-center space-y-4">
      {orders.map((order) => (
        <OrderItem
          key={order.orderID}
          order={order}
          computeOrders={computeOrders}
        />
      ))}
    </section>
  );
}
