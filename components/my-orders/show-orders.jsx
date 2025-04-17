import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OrderItemBody from "@/components/common/order-item-body";
import OrderItemHeader from "@/components/common/order-item-header";

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
          <OrderItemHeader
            orderID={order.orderID}
            status={order.status}
            createdAt={order.createdAt}
          />
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
