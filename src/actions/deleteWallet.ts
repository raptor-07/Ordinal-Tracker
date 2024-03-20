"use server";

import { deleteExistingWallet } from "@/data/wallet";
import { getUserByEmail } from "@/data/user";
import { User } from "next-auth";
import { deleteUserCollectionsByWallet } from "@/data/collection";

export const deleteWallet = async (user: User, walletString: string) => {
  try {
    console.log("inside deleteWallet");
    const existingUser = await getUserByEmail(user.email ?? "");
    if (existingUser) {
      console.log("deleteUserCollectionsByWallet");
      await deleteUserCollectionsByWallet(walletString, existingUser.uId);
      console.log("deleteExistingWallet");
      await deleteExistingWallet(walletString, existingUser);
      return {};
    }
    return { error: "User does not exist" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
