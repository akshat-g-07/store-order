"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetInventoryItemByID } from "@/actions/inventory";
import { CreateOrder } from "@/actions/order";
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [errorInUserDetails, setErrorInUserDetails] = useState(null);
  const { getAllObjects, getItem } = useCartStore();
  const allObjects = getAllObjects();

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let totalPrice = 0;

      for (const obj of allObjects) {
        const frequency = getItem(obj);
        const response = await GetInventoryItemByID(obj);
        if (response.error) {
          console.log("Error in CalculateTotalPrice", response.error);
        } else {
          totalPrice += response.data.pricePerItem * frequency;
        }
      }
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [allObjects, getItem]);

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
        <div className="py-5 px-2 fixed bg-brand-primaryYellow w-full max-w-[550px] bottom-[130px]">
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
            onClick={async (e) => {
              e.preventDefault();
              if (userName.length === 0) {
                setErrorInUserDetails("Please enter your name");
                return;
              }

              if (userPhone.length === 0) {
                setErrorInUserDetails("Please enter your phone number");
                return;
              }

              if (userPhone.length !== 10) {
                setErrorInUserDetails("Please enter a valid phone number");
                return;
              }

              setErrorInUserDetails(null);
              const response = await CreateOrder(
                userName,
                userPhone,
                allObjects.map((obj) => ({
                  frequency: getItem(obj),
                  inventoryID: obj,
                })),
                totalPrice
              );

              if (response.error) {
                setErrorInUserDetails(
                  "Something went wrong. Please try again in sometime."
                );
                return;
              }

              setUserName("");
              setUserPhone("");
              router.push(`/confirm?orderID=${response.data.orderID}`);
            }}
            className="bg-brand-primaryGreen text-white hover:bg-brand-primaryGreenHover"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
        {errorInUserDetails && (
          <p className="text-red-500 text-sm">{errorInUserDetails}</p>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
