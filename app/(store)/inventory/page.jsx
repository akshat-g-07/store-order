"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CreateInventoryItem,
  GetInventory,
  UpdateInventoryItem,
} from "@/actions/inventory";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Error from "@/components/common/error";
import Loading from "@/components/common/loading";
import InventoryItem from "@/components/inventory/inventory-item";

export default function Page() {
  const form = useForm({
    defaultValues: {
      name: "",
      veg: "",
      stock: "",
      pricePerItem: "",
    },
    resolver: async (values) => {
      const errors = {};
      const { name, veg, stock, pricePerItem } = values;

      const nameRegex = /^[a-zA-Z0-9\s\-_()]*$/;
      if (!name) {
        errors.name = {
          type: "required",
          message: "Name is required.",
        };
      } else if (!nameRegex.test(name)) {
        errors.name = {
          type: "validation",
          message: "Name can only have a-z, A-Z, 0-9, space, -, _.",
        };
      }

      if (!veg) {
        errors.veg = {
          type: "required",
          message: "Veg is required.",
        };
      }

      if (!stock) {
        errors.stock = {
          type: "required",
          message: "Stock is required.",
        };
      }

      const priceRegex = /^\d+$/;
      if (!pricePerItem) {
        errors.pricePerItem = {
          type: "required",
          message: "Price Per Item is required.",
        };
      } else if (
        !priceRegex.test(pricePerItem) ||
        parseInt(pricePerItem) <= 0
      ) {
        errors.pricePerItem = {
          type: "validation",
          message: "Price Per Item should be a positive number.",
        };
      }

      return {
        errors: errors,
        values: values,
      };
    },
  });

  const [inventoryItems, setInventoryItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    const response = await GetInventory(false, false, false);
    if (response.error) {
      setError(response.error);
      setInventoryItems(null);
    } else {
      setInventoryItems(response.data);
      setError(null);
    }
    setLoading(false);
  }, []);

  const handleEdit = useCallback(
    async (id) => {
      setItemToEdit(id);
      const item = inventoryItems.find((item) => item.id === id);
      form.setValue("name", item.name);
      form.setValue("veg", item.veg ? "true" : "false");
      form.setValue("stock", item.stock ? "true" : "false");
      form.setValue("pricePerItem", item.pricePerItem);
      setIsOpen(true);
    },
    [inventoryItems]
  );

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const onSubmit = async (data) => {
    let response;
    const { veg, stock, pricePerItem } = data;
    const dataToSend = {
      ...data,
      veg: veg === "true",
      stock: stock === "true",
      pricePerItem: parseInt(pricePerItem),
    };
    if (itemToEdit) {
      response = await UpdateInventoryItem(itemToEdit, dataToSend);
      setItemToEdit(null);
    } else {
      response = await CreateInventoryItem(dataToSend);
    }
    if (response.error) {
      alert("Please try again.");
    } else if (response.data) {
      alert("Success");
      setIsOpen(false);
      form.reset();
      fetchInventory();
    }
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading className="w-full flex justify-center my-10" />;
  }

  return (
    <section className="pt-4 pb-32 px-2 flex flex-col space-y-4">
      {inventoryItems?.map((item) => (
        <InventoryItem key={item.id} item={item} handleEdit={handleEdit} />
      ))}
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            onClick={() => {
              setIsOpen(true);
            }}
            className="fixed bottom-4 size-14 right-4 rounded-full bg-brand-primaryGreen hover:bg-brand-primaryGreenHover text-white"
          >
            <Plus className="size-16 font-semibold" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter details</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the details of the item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name of the item" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="veg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veg Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a veg type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Veg</SelectItem>
                        <SelectItem value="false">Non-Veg</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a stock type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">In Stock</SelectItem>
                        <SelectItem value="false">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricePerItem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Per Item</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter price per item" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    form.reset();
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction type="submit">Submit</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
