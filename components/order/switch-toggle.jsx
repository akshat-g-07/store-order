"use client";

import { useToggleStore } from "@/stores/toggle";

import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";

export default function SwitchToggle({ isLoading, children, vegType = false }) {
  const { vegOnly, nonVegOnly, toggleVegMode, toggleNonVegMode } =
    useToggleStore();
  const config = {
    id: vegType ? "veg-toggle" : "non-veg-toggle",
    text: vegType ? "Veg" : "Non-Veg",
    checked: vegType ? vegOnly : nonVegOnly,
    onCheckedChange: vegType ? toggleVegMode : toggleNonVegMode,
    className: vegType
      ? "data-[state=checked]:bg-emerald-500"
      : "data-[state=checked]:bg-red-500",
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <label className="w-full text-sm font-semibold" htmlFor={config.id}>
          {config.text} Only
        </label>
        <Switch
          id={config.id}
          checked={config.checked}
          onCheckedChange={config.onCheckedChange}
          className={cn(
            "h-3 *:size-5 data-[state=unchecked]:*:-translate-x-0.5",
            config.className
          )}
          disabled={isLoading}
        >
          {children}
        </Switch>
      </div>
    </>
  );
}
