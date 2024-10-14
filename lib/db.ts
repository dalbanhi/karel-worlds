import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : [], // Optional: log more in dev mode
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
