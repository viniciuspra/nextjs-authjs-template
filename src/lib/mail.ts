import { Resend } from "resend";

import { EmailTemplate } from "@/components/email-template";
import { PasswordResetEmailTemplate } from "@/components/password-reset-email-template";
import TwoFactorEmailTemplate from "@/components/two-factor-email-template";

/**
 * Email service using Resend
 *
 * This file contains functions for sending different types of emails:
 * - Email verification
 * - Password reset
 * - Two-factor authentication codes
 */

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

/**
 * Send an email verification link
 *
 * @param email - Recipient email address
 * @param token - Verification token
 * @param name - User's name (optional)
 * @returns Response with data or error
 */
const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string | null,
) => {
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Change to your domain
      to: email,
      subject: "Confirm Your Email",
      react: EmailTemplate(confirmLink, name),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

/**
 * Send a password reset link
 *
 * @param email - Recipient email address
 * @param token - Password reset token
 * @param name - User's name (optional)
 * @returns Response with data or error
 */
const sendRestPassword = async (
  email: string,
  token: string,
  name: string | null,
) => {
  const resetLink = `${baseUrl}/auth/new-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Change to your domain
      to: email,
      subject: "Reset Your Password",
      react: PasswordResetEmailTemplate(resetLink, name),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

/**
 * Send a two-factor authentication code
 *
 * @param email - Recipient email address
 * @param token - Two-factor authentication code
 * @returns Response with data or error
 */
const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Change to your domain
      to: email,
      subject: "Two Factor Authentication",
      react: TwoFactorEmailTemplate(token),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export { sendVerificationEmail, sendRestPassword, sendTwoFactorTokenEmail };
