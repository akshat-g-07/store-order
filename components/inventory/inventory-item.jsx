import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VegTypeSVG from "@/components/common/veg-type-svg";

export default function InventoryItem({
  item: { id, name, veg, stock, pricePerItem },
  handleEdit,
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{stock ? "In Stock" : "Out of Stock"}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <VegTypeSVG veg={veg} />
          <p className="text-sm font-medium">Rs. {pricePerItem}</p>
        </div>
        <div className="flex items-center justify-center">
          <Button variant="outline" size="icon" onClick={() => handleEdit(id)}>
            <Pencil className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
