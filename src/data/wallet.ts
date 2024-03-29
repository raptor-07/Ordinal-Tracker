import { db } from "@/lib/db";

export interface Wallet {
  wId: string;
  lastTrackedTransaction?: string;
  lastTrackedTimeStamp?: string;
}

export interface User {
  uId: string;
  username: string;
  email: string;
  password: string;
}

export interface UserWallet {
  uId: string;
  wId: string;
  alertsEnabled?: boolean;
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

      let wallet = await db.wallet.upsert({
        where: {
          wId: walletData.label,
        },
        update: {
          lastTrackedTimeStamp: null,
          lastTrackedTransaction: null,
        },
        create: {
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
      await db.user_Wallet.deleteMany({
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
    const userWallets = await db.user_Wallet.findMany({
      where: {
        uId: user.uId,
      },
      include: {
        wallet: true,
      },
    });

    const wallets: any = userWallets.map((userWallet) => {
      return {
        wId: userWallet.wId,
        uId: userWallet.uId,
        alertsEnabled: userWallet.alertsEnabled,
      };
    });
    return wallets;
  } catch (error) {
    console.error("Error in getUserWallets:", error);
    throw error;
  }
};

export const markWalletAs = async (
  userId: string,
  walletId: string,
  mark: boolean
) => {
  try {
    const userWallet = await db.user_Wallet.updateMany({
      where: {
        uId: userId,
        wId: walletId,
      },
      data: {
        alertsEnabled: mark,
      },
    });

    return userWallet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
