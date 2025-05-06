"use server";

import { db } from "@/lib/db";

export async function CreateCategory(categoryName) {
  try {
    const category = await db.Category.create({
      data: {
        categoryName,
      },
    });

    return { data: category };
  } catch (error) {
    console.log("Error in CreateCategory", error);
    return { error: "Failed to create category" };
  }
}

export async function GetCategories() {
  try {
    const categories = await db.Category.findMany();
    return { data: categories };
  } catch (error) {
    console.log("Error in GetCategories", error);
    return { error: "Failed to get categories" };
  }
}
