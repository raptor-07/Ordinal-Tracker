"use server";

import { getUserByEmail } from "@/data/user";
import {
  createAlertEntryForUser,
  deleteAlertEnryById,
} from "@/data/collection";

export const deleteAlertEntry = async (userRef: any, alertId: any) => {
  const user: any = await getUserByEmail(userRef.current.email);

  if (!user) {
    return {
      error: "User not found",
    };
  }

  try {
    const alertEntry = await deleteAlertEnryById(user, alertId);
    return alertEntry;
  } catch (error) {
    console.error("Error in createAlertEntry:", error);
    throw error;
  }
};
