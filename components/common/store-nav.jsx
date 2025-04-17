"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const navOptions = [
  {
    name: "All Orders",
    link: "/all-orders",
  },
  {
    name: "Orders History",
    link: "/orders-history",
  },
  {
    name: "Inventory",
    link: "/inventory",
  },
];

export default function StoreNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="px-2 flex justify-between items-center sticky top-0 bg-brand-primaryYellow">
      {navOptions.map(({ name, link }) => (
        <div
          key={name}
          className={cn(
            "py-5 hover:cursor-pointer hover:text-brand-listHover",
            pathname === link &&
              "border-b border-brand-listHover text-brand-listHover"
          )}
          onClick={() => router.push(link)}
        >
          {name}
        </div>
      ))}
    </nav>
  );
}
