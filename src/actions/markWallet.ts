"use server";
import { getUserByEmail } from "@/data/user";
import { getUserWallets, markWalletAs } from "@/data/wallet";

export const markWallet = async (
  walletId: string,
  mark: boolean,
  userRef: any
) => {
  const user: any = await getUserByEmail(userRef.email);

  if (!user) {
    return { error: "User not found" };
  }

  const result = await markWalletAs(user.uId, walletId, mark);

  if (result == null) {
    return { error: "Wallet does not exist" };
  }

  const newWallets = await getUserWallets(user);

  return newWallets;
};
