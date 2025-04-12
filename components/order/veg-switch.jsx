"use client";

import { useVegOnlyStore } from "@/stores/veg-only";

import { Switch } from "@/components/ui/switch";

export default function VegSwitch({ isLoading }) {
  const { vegOnly, toggleVegMode } = useVegOnlyStore();

  return (
    <>
      <div className="flex flex-col items-center [&>label]:flex [&>label]:flex-col [&>label]:items-center">
        <label className="w-full mb-1" htmlFor="veg-toggle">
          <p className="font-semibold">Veg</p>
          <p className="text-xs">Only</p>
        </label>
        <Switch
          id="veg-toggle"
          checked={vegOnly}
          onCheckedChange={toggleVegMode}
          className="h-3 [&>*]:size-5 data-[state=checked]:bg-brand-primaryGreenHover [&>*]:data-[state=unchecked]:-translate-x-0.5"
          disabled={isLoading}
        />
      </div>
    </>
  );
}
