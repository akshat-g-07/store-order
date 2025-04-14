"use server";

import { db } from "@/lib/db";

export async function CreateUser(userName, phoneNumber) {
  try {
    const user = await db.User.create({
      data: {
        userName,
        phoneNumber,
      },
    });
    return { data: user };
  } catch (error) {
    console.log("Error in CreateUser", error);
    return { error: "Failed to create user" };
  }
}

export async function GetUser(phoneNumber) {
  try {
    const user = await db.User.findFirst({
      where: {
        phoneNumber,
      },
    });
    return { data: user };
  } catch (error) {
    console.log("Error in GetUser", error);
    return { error: "Failed to fetch user" };
  }
}

export async function GetUserOrdersByPhoneNumber(phoneNumber) {
  try {
    const userOrders = await db.User.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            orderItems: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (userOrders) {
      return { data: userOrders };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    console.log("Error in GetUserOrdersByPhoneNumber", error);
    return { error: "Failed to fetch users orders" };
  }
}
