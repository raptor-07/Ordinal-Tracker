"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendEmailVerification } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";
import { VerificationToken } from "@prisma/client";

const login = async (
  values: {
    email: string;
    password: string;
  },
  callbackUrl?: string | null
) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Validation error" };
  }
  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (user?.emailVerified === null) {
    const token: VerificationToken = await generateVerificationToken(email);
    console.log("Token generated", token);

    //send verification email
    await sendEmailVerification(email, token.token);

    return { error: "Email not verified" };
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });

  return { success: true };
};

export default login;
