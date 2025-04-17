import { UpdateOrderStatus } from "@/actions/order";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderItemBody from "@/components/common/order-item-body";

export default function OrderItem({
  order: { orderID, createdAt, orderItems, user, status, totalPrice, newOrder },
  computeOrders,
}) {
  return (
    <Card className={cn("w-full", newOrder && "animate-slide-in")}>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between">
          <div className="flex flex-col items-start font-normal space-y-1">
            <p className="order-title text-base font-bold">
              Order No: {orderID.split("aa")[1]}
            </p>

            <p>
              Status:{" "}
              <span
                className={cn(
                  "font-medium",
                  status === "CONFIRMED"
                    ? "text-brand-primaryYellow"
                    : "text-brand-primaryGreen"
                )}
              >
                {status}
              </span>
            </p>
            <p className="text-xs">
              <span className="opacity-50">by: </span>
              {user.userName}, {user.phoneNumber}
            </p>
            <p className="text-xs opacity-50">
              on:{" "}
              {new Date(createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          {computeOrders && (
            <Button
              size="lg"
              className="bg-brand-primaryGreen text-white hover:bg-brand-primaryGreenHover"
              onClick={async () => {
                await UpdateOrderStatus(orderID);
                computeOrders(orderID);
              }}
            >
              Delivered
              <Check className="size-5 ml-2" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          {orderItems.map((orderItem) => (
            <OrderItemBody key={orderItem.id} orderItem={orderItem} />
          ))}
        </div>
        <div className="w-full border-t border-border mt-4 pt-2 flex justify-between items-center text-lg">
          <p className="ml-14">Total:</p>
          <p className="text-right font-medium">Rs.{totalPrice}</p>
        </div>
      </CardContent>
    </Card>
  );
}
