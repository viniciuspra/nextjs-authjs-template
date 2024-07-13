"use server";
import { LoginSchema } from "@/schemas/auth";

import { z } from "zod";

interface LoginResponse {
  error?: string;
  success?: string;
}

export const login = async (
  data: z.infer<typeof LoginSchema>
): Promise<LoginResponse> => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: "Email sent!" });
    }, 1000);
  });
};
