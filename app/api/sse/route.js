import { headers } from "next/headers";

export async function GET(req) {
  const response = new Response(
    new ReadableStream({
      start(controller) {
        const clientId = headers().get("client-id") || Date.now().toString();
        global.orderControllers = global.orderControllers || new Map();
        global.orderControllers.set(clientId, controller);

        req.signal.addEventListener("abort", () => {
          global.orderControllers.delete(clientId);
        });
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );

  return response;
}
