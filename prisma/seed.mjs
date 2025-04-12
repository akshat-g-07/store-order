import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      userName: "John Doe",
      phoneNumber: "1234567890",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      userName: "Jane Smith",
      phoneNumber: "1231231231",
    },
  });
  console.log("Created users");

  const inventoryItems = await Promise.all(
    Array(10)
      .fill(0)
      .map((_, i) =>
        prisma.inventory.create({
          data: {
            name: `Item ${i + 1}`,
            veg: i % 2 === 0,
            stock: i < 8, // 8 items in stock, 2 out of stock
            pricePerItem: 100 + i * 50, // prices from 100 to 550
          },
        })
      )
  );
  console.log("Created inventory items");

  const orders = [];
  for (let i = 0; i < 10; i++) {
    const userId = i % 2 === 0 ? user1.id : user2.id;
    const orderItemsData = [
      {
        frequency: Math.floor(Math.random() * 5) + 1,
        inventoryID: inventoryItems[i].id,
      },
      {
        frequency: Math.floor(Math.random() * 5) + 1,
        inventoryID: inventoryItems[(i + 5) % 10].id,
      },
    ];

    const totalPrice = orderItemsData.reduce((sum, item) => {
      const inventoryItem = inventoryItems.find(
        (inv) => inv.id === item.inventoryID
      );
      return sum + inventoryItem.pricePerItem * item.frequency;
    }, 0);

    const order = await prisma.order.create({
      data: {
        orderID: `ORD-${1000 + i}`,
        status: i < 7 ? "CONFIRMED" : "DELIVERED",
        totalPrice,
        ownerID: userId,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: true,
      },
    });

    orders.push(order);
  }
  console.log(`Created orders with order items`);
}

if (process.env.NODE_ENV !== "production") {
  main()
    .then(async () => {
      console.log("Database has been seeded!");
    })
    .catch(async (e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} else {
  console.log("Seeding is disabled in production environment.");
  prisma.$disconnect();
}
