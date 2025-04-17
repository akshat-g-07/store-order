import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OrderItemBody from "@/components/common/order-item-body";

export default function ShowOrders({ orders }) {
  return (
    <div className="w-full px-4">
      {orders.map((order) => (
        <Order key={order.orderID} order={order} />
      ))}
    </div>
  );
}

function Order({ order }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={order.orderID} className="border-b-2">
        <AccordionTrigger className="hover:no-underline [&>div>.order-title]:hover:underline">
          <div className="flex flex-col items-start font-normal">
            <p className="order-title text-base font-bold">
              Order No: {order.orderID.split("aa")[1]}
            </p>
            <p>
              Status:{" "}
              <span
                className={cn(
                  "font-medium",
                  order.status === "CONFIRMED"
                    ? "text-brand-primaryYellow"
                    : "text-brand-primaryGreen"
                )}
              >
                {order.status}
              </span>
            </p>
            <p className="text-xs opacity-50">
              on:{" "}
              {new Date(order.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-y-2">
            {order.orderItems.map((orderItem) => (
              <OrderItemBody key={orderItem.id} orderItem={orderItem} />
            ))}
          </div>
          <div className="w-full border-t border-border mt-4 pt-2 flex justify-between items-center text-lg">
            <p className="ml-14">Total:</p>
            <p className="text-right font-medium">Rs.{order.totalPrice}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
