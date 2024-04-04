"use server";

import { getUserByEmail } from "@/data/user";
import { createAlertEntryForUser, getAlertEntriesForUser } from "@/data/collection";
import getCollectionsFloor from "./getCollectionsFloor";

export const createAlertEntry = async (userRef: any, alertData: any) => {
  const user: any = await getUserByEmail(userRef.current.email);

  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  try {
    //get latest floor
    const latestFloor = await getCollectionsFloor([alertData]);

    console.log("Creating alert entry for user @ 16", alertData);

    if (latestFloor.length > 0 && typeof latestFloor[0] === 'object' && 'floor_price' in latestFloor[0]) {
      const alertEntry = await createAlertEntryForUser(user, alertData, latestFloor[0].floor_price);
      return {
        success: true,
        data: alertEntry
      };
    } else {
      throw new Error("Latest floor not found");
    }
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