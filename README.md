# Next.js 14 Auth.js Template

A ready-to-use authentication template built with [Next.js 14](https://nextjs.org) and [Auth.js](https://authjs.dev) (formerly NextAuth.js).

[![GitHub stars](https://img.shields.io/github/stars/viniciuspra/nextjs-authjs-template?style=social)](https://github.com/viniciuspra/nextjs-authjs-template/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

>[!IMPORTANT]  
> The Resend email service requires a verified custom domain for emails to function properly in production.  
>
> You can access the demo here: [https://nextjs-authjs-template.vercel.app/](https://nextjs-authjs-template.vercel.app/)  
> - **For testing purposes, use these credentials:**  
>   - **Email:** user@example.com  
>   - **Password:** 123456


---

## Table of Contents

- [Features](#features)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [Customization](#customization)
- [Database](#database)
- [Deployment](#deployment)
- [Support](#support)

---

## Features

- 🔐 **Complete Authentication System**: Secure user registration and login.
- ✉️ **Email Verification**: Verify accounts through email confirmation.
- 🔑 **Password Reset**: Self-service password recovery.
- 🔒 **Two-Factor Authentication (2FA)**: Optional additional security.
- 🌐 **Social Login**: Sign in using Google, Facebook, and GitHub.
- 👤 **User Roles**: Differentiate between Admin and regular users.
- 🛡️ **Protected Routes**: Secure pages accessible only to authenticated users.
- 📱 **Responsive Design**: Fully responsive UI for all devices.
- 🔧 **Easy Customization**: Modular structure for seamless modifications.

---

## Setup

### Prerequisites

- **Node.js**: Version 18.17 or higher.
- **Database**: PostgreSQL.
- **Resend API Key**: For sending emails (ensure your custom domain is verified for production).

### Quick Start

1. **Clone the Repository**

   ```bash
   git clone https://github.com/viniciuspra/nextjs-authjs-template.git
   cd nextjs-authjs-template
   ```

2. **Install Dependencies**

   Use your package manager of choice:
   
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   Copy the example environment file and update it with your configuration:
   
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials and configuration values.

4. **Database Setup**

   Generate the Prisma client and migrate your database schema:
   
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**

   Launch the app locally:
   
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable                     | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`        | Base URL for your application              |
| `DATABASE_URL`               | PostgreSQL connection string                 |
| `AUTH_SECRET`                | Secret for JWT encryption                    |
| `GOOGLE_CLIENT_ID`           | Google OAuth Client ID                       |
| `GOOGLE_CLIENT_SECRET`       | Google OAuth Client Secret                   |
| `FACEBOOK_CLIENT_ID`         | Facebook OAuth Client ID                     |
| `FACEBOOK_CLIENT_SECRET`     | Facebook OAuth Client Secret                 |
| `GITHUB_CLIENT_ID`           | GitHub OAuth Client ID (optional)            |
| `GITHUB_CLIENT_SECRET`       | GitHub OAuth Client Secret (optional)        |
| `RESEND_API_KEY`             | API key for sending emails                   |

---

## Project Structure

```plaintext
.
├── prisma/                   # Prisma folder (Database schema and migrations)
├── public/                   # Public assets (Static files like images, fonts, etc.)
├── src/                      # Source code folder
│   ├── actions/              # Next.js API actions
│   ├── app/                  # Next.js App Router components
│   │   ├── api/              # API routes
│   │   ├── (protected)/      # Protected routes (accessible only by authenticated users)
│   │   └── auth/             # Authentication pages
│   ├── components/             # Reusable React components
│       ├── email-template.tsx  # Email verification template
│       ├── password-reset-email-template.tsx  # Password reset template
│       └── two-factor-email-template.tsx  # 2FA code template
│   ├── data/                 # Database queries and data access layer
│   │   ├── account.ts        # Account data access (OAuth accounts)
│   │   ├── password-reset-token.ts  # Password reset tokens
│   │   ├── two-factor-confirmation.ts  # Two-factor confirmation data
│   │   ├── two-factor-token.ts      # Two-factor tokens
│   │   ├── user.ts           # User data access
│   │   └── verification-token.ts  # Email verification tokens
│   ├── hooks/                # Custom React hooks
│   │   ├── use-current-role.ts  # Hook to retrieve current user role
│   │   └── use-current-user.ts  # Hook to retrieve current user info
│   ├── lib/                  # Utility libraries and helpers
│   │   ├── auth.ts           # Auth-related utility functions
│   │   ├── mail.ts           # Email sending utilities
│   │   └── token.ts          # Token generation utilities
│   ├── routes/               # Route definitions
│   ├── schemas/              # Zod schemas for form validation
│   ├── auth.config.ts        # Authentication configuration for OAuth providers
│   └── middleware.ts         # Middleware for authentication
```

---

## Authentication Flow

1. **Registration**: Users create an account using email and password.
2. **Email Verification**: Confirm registration via email link.
3. **Login**: Authenticate using email/password or social login providers.
4. **Two-Factor Authentication (2FA)**: Optionally secure your account with 2FA.
5. **Password Reset**: Allow users to reset forgotten passwords.

---

## Customization

### Adding OAuth Providers

Edit `auth.config.ts` to enable or add additional OAuth providers. Simply uncomment the existing providers or insert new ones following the provided format. For example, to add a provider for Twitter, you can add the following snippet:

```ts
// src/auth.config.ts
import TwitterProvider from "next-auth/providers/twitter";

export default {
  providers: [
    // Other providers...
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  // ...other configuration options
};
```
> [!NOTE]
> For a full list of supported providers and additional configuration details, please refer to the [Auth.js documentation](https://authjs.dev/).

### Modifying Routes
You can customize your application’s routes by editing the `routes.ts` file. This file defines which routes are public, which routes are authentication-related, and where to redirect users after a successful login.

For example, consider the following implementation:
- **Public Routes:** Accessible without authentication.
- **Auth Routes:** For login, registration, etc.
- **Protected Routes:** Accessible only to authenticated users.
- **Default Redirects:** Post-login redirection settings.

```ts
// src/routes/index.ts
const publicRoutes = ["/", "/auth/new-verification"];

const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/new-password",
];

const apiAuthPrefix = "/api/auth";

const DEFAULT_LOGIN_REDIRECT = "/settings";

export { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };
```

### Creating a Custom Email

You can easily send custom emails using **React Email** components with **Resend**. Here's how to implement a new email in your app:

#### 1. Create the Email Template

Create a new file inside the `components/` folder (or a subfolder like `components/emails/`) and name it something like `welcome-email-template.tsx`.

This is your actual email layout and content. Use [React Email](https://react.email/docs/introduction) to build it:

```tsx
// components/welcome-email-template.tsx
import { Html, Body, Text, Container } from "@react-email/components";

export const WelcomeEmailTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container>
          <Text>Hello {name},</Text>
          <Text>Welcome to our app! 🎉</Text>
          <Text>We’re excited to have you on board.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmailTemplate;
```
> [!TIP]
> You can add any structure and styling supported by [@react-email/components](https://react.email/components).

#### 2. Add a Function to Send the Email

Go to `src/lib/mail.ts` and import your new template. Then, create a function to send it using Resend.

```ts
// lib/mail.ts
import { Resend } from "resend";
import WelcomeEmailTemplate from "@/components/welcome-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a welcome email to the user
 *
 * @param email - Recipient email address
 * @param name - User's name
 */
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "YourApp <noreply@yourdomain.com>", // Your verified Resend domain or use `onboarding@resend.dev>` in development
      to: email,
      subject: "Welcome to Our App!",
      react: WelcomeEmailTemplate({ name }),
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
};
```
> [!NOTE]
> You can adjust the props passed to your template depending on what content your email needs.

---

## Database

This template uses [Prisma](https://www.prisma.io) with PostgreSQL. The schema defines:

- **User**: Core user information.
- **Account**: OAuth account associations.
- **VerificationToken**: Tokens for email verification.
- **PasswordResetToken**: Tokens for password recovery.
- **TwoFactorToken**: Codes for 2FA.
- **TwoFactorConfirmation**: Confirmations for 2FA.

---

## Deployment

Deploy your application on any platform that supports Next.js (e.g., Vercel, Railway). **Remember:** Set all environment variables on your deployment platform for smooth operation.

---

## Support

If you find this template helpful, please give it a star on [GitHub](https://github.com/viniciuspra/nextjs-authjs-template) and consider contributing. For any issues or suggestions, open an issue in the repository.
