"use server";

import { Resend } from "resend";

export const sendEmailVerification = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const confirmLink = `${process.env.BASE_URL}/auth/confirm-email?token=${token}`;

  const Template = `
    <h1>Confirm your email</h1>
    <p>Click the link below to confirm your email</p>
    <a href="${confirmLink}">Confirm Email</a>
    `;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Email for Ordi Track",
    html: Template,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;

  const Template = `
    <h1>Reset Password</h1>
    <p>Click the link below to reset your password</p>
    <a href="${resetLink}">Reset Password</a>
    `;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset for Ordi Track",
    html: Template,
  });
};
