import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getUserAccountByUserId } from "./data/account";

/**
 * Auth.js configuration with Prisma adapter and JWT session strategy
 * This file sets up the main authentication functionality including:
 * - Custom sign-in page
 * - Error handling
 * - Account linking
 * - Two-factor authentication
 * - Session and JWT callbacks
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  events: {
    // Automatically verify email when user links an OAuth account
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // Control whether a user can sign in
    async signIn({ user, account }) {
      // Allow OAuth sign-in without additional verification
      if (account?.provider !== "credentials") {
        return true;
      }

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      // Prevent sign-in if email is not verified
      if (!existingUser?.emailVerified) {
        return false;
      }

      // Handle two-factor authentication if enabled
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          user.id,
        );

        // Prevent sign-in if 2FA is not confirmed
        if (!twoFactorConfirmation) return false;

        // Clean up the 2FA confirmation after successful verification
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    // Customize session object with user data
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    // Customize JWT token with user data
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getUserAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma), // Use Prisma adapter for database integration
  session: { strategy: "jwt" }, // Use JWT for session management
  ...authConfig, // Import additional configuration
});
