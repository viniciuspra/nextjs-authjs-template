import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATANEXT_PUBLIC_APP_URL: z.string().url(),
  DATANEXT_PUBLIC_APP_URL_UNPOOLED: z.string().url(),
});

export const env = envSchema.parse(process.env);
