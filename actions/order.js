"use server";

import { CreateUser, GetUser } from "@/actions/user";

import { db } from "@/lib/db";
import { generateOrderID } from "@/lib/orderID";

export async function CreateOrder(
  userName,
  phoneNumber,
  orderItems,
  totalPrice
) {
  let user = null;
  try {
    const getUserResponse = await GetUser(phoneNumber);
    if (getUserResponse.data) {
      user = getUserResponse.data;
    } else {
      const createUserResponse = await CreateUser(userName, phoneNumber);
      user = createUserResponse.data;
    }
    const orderID = await generateOrderID();

    const order = await db.Order.create({
      data: {
        orderID,
        totalPrice,
        ownerID: user.id,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        user: true,
        orderItems: {
          include: {
            inventory: true,
          },
        },
      },
    });

    return { data: order };
  } catch (error) {
    console.log("Error in CreateOrder", error);
    return { error: "Failed to create order" };
  }
}

export async function GetOrdersByDate(date = new Date()) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  try {
    const orders = await db.Order.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        orderItems: {
          include: {
            inventory: true,
          },
        },
        user: true,
      },
    });
    return { data: orders };
  } catch (error) {
    console.log("Error in GetOrdersByDate", error);
    return { error: "Failed to get orders" };
  }
}

export async function UpdateOrderStatus(orderID, status = "DELIVERED") {
  try {
    const updatedOrder = await db.Order.update({
      where: { orderID },
      data: { status },
    });

    return { data: updatedOrder };
  } catch (error) {
    console.log("Error in UpdateOrderStatus", error);
    return { error: "Failed to update order status" };
  }
}
