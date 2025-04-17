import { useCallback, useEffect, useState } from "react";
import { GetOrdersByDate } from "@/actions/order";

import OrderItem from "@/components/all-orders/order-item";
import Error from "@/components/common/error";

export default function Store({ user }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
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
    };

    fetchOrders();

    // set up SSE connection
    const eventSource = new EventSource("/api/sse?client-id=" + user);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new-order") {
        setOrders((prevOrders) =>
          prevOrders
            .map((order) => ({ ...order, newOrder: false }))
            .concat({
              ...data.order,
              newOrder: true,
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user]);

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
