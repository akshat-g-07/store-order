"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart";
import { Check } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PlaceOrder() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const { getAllObjects } = useCartStore();
  const allObjects = getAllObjects();

  //   MARK: calculate total price by getting all items, iterating over them, get price from db and add them
  const totalPrice = 200;

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserPhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setUserPhone(value);
    }
  };

  if (allObjects.length === 0) {
    return <></>;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="py-5 px-2 fixed bg-gradient-to-r from-[#FFCF91] to-[#FFD194] w-full max-w-[550px] bottom-0">
          <Card className="w-full max-w-[500px] bg-transparent shadow-none border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex space-x-2 items-center text-2xl justify-center">
                <span>Place Order</span>
                <Check />
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full text-center text-xl">
              Total <span className="font-semibold">Rs. {totalPrice}</span>
            </CardContent>
          </Card>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter your details</AlertDialogTitle>
        </AlertDialogHeader>
        <label htmlFor="userName">Your Name</label>
        <Input
          id="userName"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          className="focus-visible:ring-brand-primaryGreen"
        />
        <label htmlFor="userPhone">Your Phone Number</label>
        <Input
          id="userPhone"
          type="tel"
          pattern="[0-9]*"
          inputMode="numeric"
          value={userPhone}
          onChange={handleUserPhoneChange}
          className="focus-visible:ring-brand-primaryGreen"
        />
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              router.push("/confirm?orderId=123");
            }}
            className="bg-brand-primaryGreen text-white hover:bg-brand-primaryGreenHover"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
