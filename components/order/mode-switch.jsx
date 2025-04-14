import { useToggleStore } from "@/stores/toggle";

import { Button } from "@/components/ui/button";

import SwitchToggle from "./switch-toggle";

export default function ModeSwitch({ isLoading }) {
  const { clickBothMode } = useToggleStore();
  return (
    <>
      <div className="w-full h-fit flex items-center justify-center mt-5 space-x-6">
        <SwitchToggle vegType isLoading={isLoading}>
          <VegSwitchSVG />
        </SwitchToggle>
        <SwitchToggle isLoading={isLoading}>
          <NonVegSwitchSVG />
        </SwitchToggle>
        <Button
          variant="outline"
          size="sm"
          className="font-semibold bg-transparent hover:bg-[#f7d7b0] text-black/75 hover:text-black border-black/75 hover:border-black"
          disabled={isLoading}
          onClick={clickBothMode}
        >
          Both
        </Button>
      </div>
    </>
  );
}

const VegSwitchSVG = () => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
    >
      <rect width="40" height="40" rx="4" fill="#008060" />
      <circle cx="20" cy="20" r="10" fill="white" />
    </svg>
  );
};

const NonVegSwitchSVG = () => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
    >
      <rect width="40" height="40" rx="4" fill="#FF4444" />
      <path d="M20 10L30 30H10L20 10Z" fill="white" />
    </svg>
  );
};
