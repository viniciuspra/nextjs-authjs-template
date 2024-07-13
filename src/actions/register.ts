"use server";
import { RegisterSchema } from "@/schemas/auth";

import { z } from "zod";

interface RegisterResponse {
  error?: string;
  success?: string;
}

export const register = async (
  data: z.infer<typeof RegisterSchema>
): Promise<RegisterResponse> => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: "Account was successfully created!" });
    }, 1000);
  });
};
