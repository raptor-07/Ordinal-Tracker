"use server";

import { getUserByEmail } from "@/data/user";
import { createAlertEntryForUser } from "@/data/collection";

export const createAlertEntry = async (userRef: any, alertData: any) => {
  const user: any = await getUserByEmail(userRef.current.email);

  console.log("user in createAlertEntry", user);

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
