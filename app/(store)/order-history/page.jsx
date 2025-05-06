"use client";

import { useEffect, useState } from "react";
import { GetOrdersByDate } from "@/actions/order";

import Error from "@/components/common/error";
import Loading from "@/components/common/loading";
import OrderItem from "@/components/common/order-item";
import DatePicker from "@/components/order-history/date-picker";

export default function Page() {
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await GetOrdersByDate(date);
      if (response.error) {
        setError(response.error);
        setOrders(null);
      } else {
        setError(null);
        setOrders(response.data);
        setTotalSales(
          response.data.reduce((sum, order) => sum + order.totalPrice, 0)
        );
      }
      setLoading(false);
    };
    fetchOrders();
  }, [date]);

  if (error) {
    return <Error className="w-full text-center" />;
  }

  return (
    <section>
      <DatePicker date={date} setDate={setDate} loading={loading} />
      {loading ? (
        <Loading className="w-full flex justify-center my-10" />
      ) : orders?.length === 0 ? (
        <div className="size-full flex justify-center items-center my-10">
          <p className="text-2xl opacity-75 font-medium italic">
            No orders found
          </p>
        </div>
      ) : (
        <>
          <div className="my-2 w-full text-center font-semibold text-lg">
            Total Sales: {totalSales}
          </div>
          <div className="py-5 px-2 flex flex-col items-center space-y-4">
            {orders?.map((order) => (
              <OrderItem key={order.orderID} order={order} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
