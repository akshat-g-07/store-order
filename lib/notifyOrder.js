export async function notifyOrder(order) {
  if (global.orderControllers) {
    const message = JSON.stringify({ type: "new-order", order });
    global.orderControllers.forEach((controller) => {
      controller.enqueue(`data: ${message}\n\n`);
    });
  }
}
