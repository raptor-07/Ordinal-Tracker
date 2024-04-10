"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { sendEmailVerification } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";
import { VerificationToken } from "@prisma/client";

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
    console.log("Registering user", email, password, name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "User already exists" };
    }

    console.log("Creating user");

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        username: name,
      },
    });
    console.log("User created", user);
    // genereate token
    const token: VerificationToken = await generateVerificationToken(email);
    console.log("Token generated", token);

    //send verification email
    await sendEmailVerification(token.email, token.token);

    return { user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default register;
