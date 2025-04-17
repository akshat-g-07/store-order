export async function GET(req) {
  const url = new URL(req.url);
  const clientId = url.searchParams.get("client-id");
  const authUsers = JSON.parse(process.env.AUTH_USERS);

  if (!authUsers.includes(clientId)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = new Response(
    new ReadableStream({
      start(controller) {
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
