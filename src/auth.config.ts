import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
// import Github from "next-auth/providers/github";

import { LoginSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";

/**
 * Auth.js provider configuration
 *
 * This file configures the authentication providers:
 * - OAuth providers (Google, Facebook, GitHub)
 * - Credentials provider for email/password login
 *
 * Additional providers like GitHub can be uncommented and configured as needed
 */
export default {
  providers: [
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      // Validate credentials (email/password) during login
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // User not found or has no password (OAuth user)
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
