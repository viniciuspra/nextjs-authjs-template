import { prisma } from "@/lib/prisma";

export const getUserAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    return null;
  }
};
