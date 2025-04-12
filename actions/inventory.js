"use server";

import { db } from "@/lib/db";

export async function getInventory(veg = false, stock = true) {
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
    console.log("Error in getInventory", error);
    return { error: "Failed to fetch inventory" };
  }
}
