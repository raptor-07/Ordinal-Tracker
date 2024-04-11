"use server";

import EmailTemplate from "@/components/Templates";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/confirm-email?token=${
    token || ""
  }`;

  await resend.emails.send({
    from: "OrdiFy@hurmaan.biz",
    to: [email],
    subject: "Confirm Email for Ordi Track",
    react: EmailTemplate({ emailType: "confirmation", link: confirmLink }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // const resend = new Resend(process.env.RESEND_API_KEY);

  const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${
    token || ""
  }`;

  const { data, error } = await resend.emails.send({
    from: "OrdiFy@hurmaan.biz",
    to: [email],
    subject: "Password Reset for Ordi Track",
    react: EmailTemplate({ emailType: "reset", link: resetLink }),
  });

  console.log(data, error);
};
