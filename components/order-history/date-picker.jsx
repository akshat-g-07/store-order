"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePicker({ date, setDate, loading }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center mt-4">
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[265px] justify-start text-left font-normal items-center space-x-2",
              !date && "text-muted-foreground"
            )}
            onClick={() => setIsOpen(true)}
            disabled={loading}
          >
            <CalendarIcon className="size-4" />
            <span>
              {date.toLocaleString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
          onFocusOutside={() => setIsOpen(false)}
          onInteractOutside={() => setIsOpen(false)}
        >
          <Calendar
            mode="single"
            hideNavigation
            selected={date}
            onSelect={(day) => {
              setDate(day);
              setIsOpen(false);
            }}
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
