import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton
 *
 * This creates a single instance of PrismaClient to be used throughout the application.
 * In development, it's stored on the global object to prevent multiple instances
 * during hot reloading.
 */

declare global {
  var prisma: PrismaClient | undefined;
}

// Use existing Prisma instance if available, or create a new one
export const prisma = globalThis.prisma || new PrismaClient();

// In development, attach to global object to prevent multiple instances during hot reload
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
