import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (uId: string) => {
  try {
    const user = await db.user.findUnique({ where: { uId } });

    return user;
  } catch {
    return null;
  }
};

export const getAlertEntriesByUser = async (user: any) => {
  try {
    const alertEntries = await db.floor_Alerts.findMany({
      where: {
        user: {
          uId: user.uId,
        },
      },
    });
    return alertEntries;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
