import { cn } from "@/lib/utils";

export default function VegTypeSVG({ veg = false }) {
  return (
    <div
      className={cn(
        "size-4 rounded border flex items-center justify-center",
        veg ? "border-emerald-500" : "border-destructive"
      )}
    >
      <div
        className={cn(
          "size-2 rounded-full",
          veg ? "bg-emerald-500" : "bg-destructive"
        )}
      />
    </div>
  );
}
