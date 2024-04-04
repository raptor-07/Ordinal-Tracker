"use server";

import { getUserByEmail } from "@/data/user";
import {
  deleteAlertEnryById,
  deleteAlertEntryByCollectionId,
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
    return {
      success: true,
      data: alertEntry,
    };
  } catch (error) {
    console.error("Error in createAlertEntry:", error);
    throw error;
  }
};

export const deleteAlertEntryByCollection = async (userRef: any, collectionId: any) => {
  const user: any = await getUserByEmail(userRef.current.email);

  if (!user) {
    return {
      error: "User not found",
    };
  }

  try {
    const alertEntry = await deleteAlertEntryByCollectionId(user, collectionId);
    return {
      success: true,
      data: alertEntry,
    };
  } catch (error) {
    console.error("Error in createAlertEntry:", error);
    throw error;
  }
}
