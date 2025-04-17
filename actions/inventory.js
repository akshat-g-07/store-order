"use server";

import { db } from "@/lib/db";

export async function GetInventory(veg = false, nonVeg = false, stock = true) {
  const whereClause = {};

  if (veg === true) {
    whereClause.veg = true;
  }

  if (nonVeg === true) {
    whereClause.veg = false;
  }

  if (stock === true) {
    whereClause.stock = true;
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

export async function CreateInventoryItem(data) {
  try {
    const inventoryItem = await db.Inventory.create({
      data,
    });
    return { data: inventoryItem };
  } catch (error) {
    console.log("Error in CreateInventoryItem", error);
    return { error: "Failed to create inventory item" };
  }
}

export async function UpdateInventoryItem(id, data) {
  try {
    const inventoryItem = await db.Inventory.update({
      where: { id },
      data,
    });
    return { data: inventoryItem };
  } catch (error) {
    console.log("Error in UpdateInventoryItem", error);
    return { error: "Failed to update inventory item" };
  }
}
