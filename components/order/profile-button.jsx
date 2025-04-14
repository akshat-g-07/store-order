import Link from "next/link";
import { CircleUserRound } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProfileButton() {
  return (
    <Sheet>
      <SheetTrigger>
        <CircleUserRound className="size-10 text-white/90" />
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 size-full pt-10">
          <Link href="/my-orders">My Orders</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
