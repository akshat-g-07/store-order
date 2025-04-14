import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VegTypeSVG from "@/components/common/veg-type-svg";

export default function MenuItem({
  id,
  name,
  price,
  veg,
  minusClick,
  getValue,
  plusClick,
}) {
  return (
    <>
      <Card className="w-full max-w-[500px]">
        <CardHeader className="pb-3">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <VegTypeSVG veg={veg} />
            <p>Rs.{price}</p>
          </div>

          <div className="flex bg-brand-primaryYellow rounded py-2 *:px-3">
            <div
              className="border-r border-black/80 cursor-pointer"
              onClick={() => {
                minusClick(id);
              }}
            >
              -
            </div>
            <div className="font-semibold pointer-events-none">
              {getValue(id)}
            </div>
            <div
              className="border-l border-black/80 cursor-pointer"
              onClick={() => {
                plusClick(id);
              }}
            >
              +
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
