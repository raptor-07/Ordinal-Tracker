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
      let userWallet = await db.user_Wallet.findUnique({
        where: {
          uId_wId: {
            uId: user.uId,
            wId: walletData.label,
          },
        },
      });

      if (userWallet) {
        errors.push(walletData.label);
        continue;
      }

      let wallet = await db.wallet.create({
        data: {
          wId: walletData.label,
          lastTrackedTimeStamp: null,
          lastTrackedTransaction: null,
        },
      });

      userWallet = await db.user_Wallet.create({
        data: {
          uId: user.uId,
          wId: walletData.label,
          alertsEnabled: null,
        },
      });

      if (wallet && userWallet) {
        addedWallets.push(userWallet);
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
