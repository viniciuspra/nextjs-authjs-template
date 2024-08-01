import { Resend } from "resend";

import { EmailTemplate } from "@/components/email-template";
import { env } from "@/configs/env";
import { PasswordResetEmailTemplate } from "@/components/password-reset-email-template";
import TwoFactorEmailTemplate from "@/components/two-factor-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string | null
) => {
  const baseUrl = env.BASE_URL;
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
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

const sendRestPassword = async (
  email: string,
  token: string,
  name: string | null
) => {
  const baseUrl = env.BASE_URL;
  const resetLink = `${baseUrl}/auth/new-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
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

const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
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
