"use client";

import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type TSignUpSchema = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignInSchema = z.infer<typeof signinSchema>;

export const sendResetTokenFormSchema = z.object({
  email: z.string().email(),
});

export type TSendResetTokenFormSchema = z.infer<
  typeof sendResetTokenFormSchema
>;

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
