"use server";

import { db } from "@/lib/db";

export async function GetInventory(veg = false, stock = true) {
  const whereClause = {};

  if (veg === true) {
    whereClause.veg = true;
  }

  if (stock !== undefined) {
    whereClause.stock = stock;
  }

  try {
    const inventory = await db.Inventory.findMany({
      where: whereClause,
    });
    return { data: inventory };
  } catch (error) {
    console.log("Error in GetInventory", error);
    return { error: "Failed to fetch inventory" };
  }
}

export async function GetInventoryItemByID(id) {
  try {
    const inventoryItem = await db.Inventory.findUnique({
      where: {
        id,
      },
    });
    return { data: inventoryItem };
  } catch (error) {
    console.log("Error in GetInventoryItemByID", error);
    return { error: "Failed to fetch inventory" };
  }
}
