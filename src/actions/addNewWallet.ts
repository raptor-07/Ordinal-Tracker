"use server";

import { addWallet } from "@/data/wallet";
import { getUserByEmail } from "@/data/user";
import { User } from "next-auth";

export const addNewWallet = async (user: User, walletString: string) => {
  try {
    const existingUser = await getUserByEmail(user.email ?? "");
    if (existingUser) {
      return await addWallet(walletString, existingUser);
    }
    return { error: "User does not exist" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
