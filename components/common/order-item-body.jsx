import VegTypeSVG from "@/components/common/veg-type-svg";

export default function OrderItemBody({ orderItem }) {
  return (
    <div className="flex w-full gap-x-2 items-center">
      <VegTypeSVG veg={orderItem.inventory.veg} />
      <p className="w-[22px] opacity-50 text-sm">{orderItem.frequency} X</p>
      <p className="flex-1">{orderItem.inventory.name}</p>
      <p className="w-[50px] font-medium text-right text-sm">
        Rs.{orderItem.inventory.pricePerItem}
      </p>
      <p className="w-[55px] font-medium text-right border-l border-black">
        Rs.{orderItem.inventory.pricePerItem * orderItem.frequency}
      </p>
    </div>
  );
}
