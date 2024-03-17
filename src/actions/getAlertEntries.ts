"use server";

import { getCollectionById } from "@/data/collection";
import { getUserByEmail } from "@/data/user";
import { getAlertEntriesByUser } from "@/data/user";

export async function getAlertEntries(userRef: any) {
  const user: any = await getUserByEmail(userRef.current.email);

  if (!user) {
    return { error: "Please login to view your alerts" };
  }

  const alertEntries = await getAlertEntriesByUser(user);

  // Create a new array to hold the final result
  const result = [];

  // Loop over each alertEntry
  for (const alertEntry of alertEntries) {
    const collectionDetails = await getCollectionById(alertEntry.collectionId);

    console.log("collectionDetails", collectionDetails);

    console.log("alertEntry", alertEntry);

    result.push({
      collectionId: alertEntry.collectionId,
      aId: alertEntry.aId,
      name: collectionDetails?.name,
      Image: collectionDetails?.image,
      TrackType: alertEntry.trackType,
      refPrice: alertEntry.refPrice,
      direction: alertEntry.direction,
      value: alertEntry.value,
    });
  }

  console.log("result", result);

  return result;
}
