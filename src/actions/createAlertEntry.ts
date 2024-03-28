"use server";

import { getUserByEmail } from "@/data/user";
import { createAlertEntryForUser, getAlertEntriesForUser } from "@/data/collection";

export const createAlertEntry = async (userRef: any, alertData: any) => {
  const user: any = await getUserByEmail(userRef.current.email);

  if (!user) {
    return {
      error: "User not found",
    };
  }

  try {
    const alertEntry = await createAlertEntryForUser(user, alertData);
    return alertEntry;
  } catch (error) {
    console.error("Error in createAlertEntry:", error);
    throw error;
  }
};

export const getAlertEntries = async (userRef: any) => {
  const user: any = await getUserByEmail(userRef.current.email);

  if (!user) {
    return {
      error: "User not found",
    };
  }

  try {
    const alertEntries = await getAlertEntriesForUser(user);
    return alertEntries;
  } catch (error) {
    console.error("Error in getAlertEntries:", error);
    throw error;
  }
}