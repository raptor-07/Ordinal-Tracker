"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";

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

  await signIn("credentials", {
    email,
    password,
    redirectTo: callbackUrl || "/dashboard",
  });

  return { success: true };
};

export default login;
