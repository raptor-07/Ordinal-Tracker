"use server";
import { markWalletAs } from "@/data/wallet";

export const markWallet = async (walletId: string, mark: boolean) => {
  const result = await markWalletAs(walletId, mark);
  return result;
};
