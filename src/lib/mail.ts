import { Resend } from "resend";

import { EmailTemplate } from "@/components/email-template";
import { env } from "@/configs/env";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const baseUrl = env.APP_BASE_URL;
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Your Name <onboarding@resend.dev>",
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
