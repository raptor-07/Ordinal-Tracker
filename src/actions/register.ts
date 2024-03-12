"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

const register = async (values: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "Validation error" };
    }
    const { email, password, name } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "User already exists" };
    }

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return { user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default register;
