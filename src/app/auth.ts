import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../auth.config";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import type User from "./lib/userDefinition";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function getUser(
  identifier: string,
  isEmail: boolean
): Promise<User | null> {
  try {
    let user;
    if (isEmail) {
      user = await prisma.user.findUnique({
        where: {
          email: identifier,
        },
      });
    } else {
      user = await prisma.user.findUnique({
        where: {
          username: identifier,
        },
      });
    }
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("credentials", credentials);

        const isEmail = (credentials.usernameOrEmail as string).includes("@");

        let parsedCredentials;

        if (isEmail) {
          parsedCredentials = z
            .object({
              usernameOrEmail: z.string().email(),
              password: z.string().min(6),
            })
            .safeParse(credentials);
        } else {
          parsedCredentials = z
            .object({
              usernameOrEmail: z.string().min(1),
              password: z.string().min(6),
            })
            .safeParse(credentials);
        }

        console.log("parsedCredentials:", parsedCredentials);

        if (parsedCredentials.success) {
          const { usernameOrEmail, password } = parsedCredentials.data;
          const user = await getUser(usernameOrEmail, isEmail);
          if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
              console.log("User authenticated successfully.");
              return { email: user.email, name: user.username };
            }
          }
        }

        return null;
      },
    }),
  ],
});

export const signup = async (formData: FormData) => {
  console.log("formData:", formData);

  const data: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    data[key] = value as string;
  });

  const formDataSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const parsedFormData = formDataSchema.safeParse(data);

  console.log("parsedFormData:", parsedFormData);

  if (parsedFormData.success) {
    const { username, email, password } = parsedFormData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });
      console.log("User added successfully.");
    } catch (error) {
      console.error("Failed to add user:", error);
      throw new Error("Failed to add user.");
    }
  }
};
