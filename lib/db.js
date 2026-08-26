import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

global.prisma = global.prisma || new PrismaClient({ adapter });

const db = global.prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

export { db };
