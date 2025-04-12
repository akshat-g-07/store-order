import { GetOrdersByDate } from "@/actions/order";

export async function generateOrderID() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const datePart = `${day}Aa${month}Aa${year}`;
  const response = await GetOrdersByDate(today);

  const orderCount = response.data.length + 1;

  return datePart + "aa" + orderCount;
}
