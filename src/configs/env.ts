import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string(),
  APP_BASE_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  DATABASE_URL_UNPOOLED: z.string().url(),
});

export const env = envSchema.parse(process.env);
