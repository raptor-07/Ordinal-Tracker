import { db } from "@/lib/db";

export interface Wallet {
  wId: string;
  uId: string;
  alertsEnabled: boolean;
}

export interface User {
  uId: string;
  username: string;
  email: string;
  password: string;
}

export const addWallet = async (walletString: string, user: User) => {
  try {
    let wallet = await db.wallet.findUnique({
      where: {
        wId: walletString,
      },
    });
    if (wallet) {
      return { error: "Wallet already exists" };
    }

    wallet = await db.wallet.create({
      data: {
        wId: walletString,
        uId: user.uId,
        alertsEnabled: false,
      },
    });

    if (wallet) {
      return { wallet };
    }

    return { error: "wallet not added" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteExistingWallet = async (walletString: string, user: User) => {
  try {
    let wallet = await db.wallet.findUnique({
      where: {
        wId: walletString,
      },
    });
    if (wallet) {
      await db.wallet.delete({
        where: {
          wId: walletString,
        },
      });
      return { wallet };
    }
    return { error: "Wallet does not exist" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
