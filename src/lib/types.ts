"use client"

import { z } from "zod"

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

export type TSignUpSchema = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export type TSignInSchema = z.infer<typeof signinSchema>;
