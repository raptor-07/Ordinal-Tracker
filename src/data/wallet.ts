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

export const addWallet = async (wallets: any[], user: User) => {
  try {
    const addedWallets = [];
    const errors = [];

    for (const walletData of wallets) {
      let wallet = await db.wallet.findUnique({
        where: {
          wId: walletData.label,
        },
      });

      if (wallet) {
        errors.push(`Wallet ${walletData.label} already exists`);
        continue;
      }

      wallet = await db.wallet.create({
        data: {
          wId: walletData.label,
          uId: user.uId,
          alertsEnabled: false,
        },
      });

      if (wallet) {
        addedWallets.push(wallet);
      } else {
        errors.push(`Failed to add wallet ${walletData.label}`);
      }
    }

    return { addedWallets, errors };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteExistingWallet = async (
  walletString: string,
  user: User
) => {
  try {
    let wallet = await db.wallet.findUnique({
      where: {
        wId: walletString,
      },
    });
    if (wallet) {
      await db.user_Collection.deleteMany({
        where: {
          walletId: walletString,
        },
      });

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


export const getUserWallets = async (user: User) => {
  try {
    const wallets = await db.wallet.findMany({
      where: {
        uId: user.uId,
      },
    });

    return wallets;
  } catch (error) {
    console.error("Error in getUserWallets:", error);
    throw error;
  }
};

export const markWalletAs = async (walletId: string, mark: boolean) => {
  try {
    const wallet = await db.wallet.update({
      where: {
        wId: walletId,
      },
      data: {
        alertsEnabled: mark,
      },
    });

    return wallet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
