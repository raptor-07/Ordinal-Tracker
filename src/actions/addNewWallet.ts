"use server";

import { addWallet } from "@/data/wallet";
import { getUserByEmail } from "@/data/user";
import { User } from "next-auth";

export const addNewWallet = async (user: User, wallets: any[]) => {
  try {
    const existingUser = await getUserByEmail(user.email ?? "");
    if (existingUser) {
      const result = await addWallet(wallets, existingUser);
      if (result.errors.length > 0) {
        return { error: result.errors.join(", ") };
      }
    }
    return { error: "User does not exist" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
