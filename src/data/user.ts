import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (UId: string) => {
  try {
    const user = await db.user.findUnique({ where: { UId } });

    return user;
  } catch {
    return null;
  }
};
