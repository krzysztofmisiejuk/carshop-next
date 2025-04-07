import { PrismaClient } from "@prisma/client";

// Define a global type to store the PrismaClient instance
// This prevents multiple instances during hot reloading in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Export a singleton instance of PrismaClient
// Either use the existing instance from the global object or create a new one
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Enable logging of database queries for debugging
  });

// In development, save the instance to the global object to prevent multiple instances
// This avoids creating a new PrismaClient instance on every hot reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
