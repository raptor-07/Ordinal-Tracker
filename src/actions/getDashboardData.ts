"use server";

import { getUserByEmail } from "@/data/user";
import getCollectionIds from "./getCollectionIds";
import getCollectionsStats from "./getCollectionsStats";
import getCollectionsFloor from "./getCollectionsFloor";
import {
  addCollectionsToCollection,
  addCollectionsToUserCollection,
} from "@/data/collection";

async function getDashboardData(
  userEmail: string | null | undefined,
  wallets: string | null
) {
  try {
    if (
      userEmail == null ||
      userEmail === "" ||
      (userEmail === undefined && wallets !== null)
    ) {
      const collectionIds: string[] = await getCollectionIds(wallets);

      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(collectionIds),
        getCollectionsFloor(collectionIds),
      ]);

      const collectionsStatsMap = collectionsStats.reduce(
        (map: any, collection: any) => {
          map[collection.collection_id] = collection;
          return map;
        },
        {}
      );

      const mergedData = collectionsFloor.map((floorPrice: any) => {
        const collectionStats = collectionsStatsMap[floorPrice.collection_id];
        return {
          ...collectionStats,
          ...floorPrice,
        };
      });

      return mergedData;
    } else {
      //with session

      const user = await getUserByEmail(userEmail);
      if (user == null) {
        return { error: "user does not exist" };
      }

      const collectionIds: string[] = await getCollectionIds(wallets);

      if (collectionIds.length > 20) {
        collectionIds.slice(0, 20);
      }

      await addCollectionsToCollection(collectionIds, user);

      await addCollectionsToUserCollection(collectionIds, user);

      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(collectionIds),
        getCollectionsFloor(collectionIds),
      ]);

      const collectionsStatsMap = collectionsStats.reduce(
        (map: any, collection: any) => {
          map[collection.collection_id] = collection;
          return map;
        },
        {}
      );

      const mergedData = collectionsFloor.map((floorPrice: any) => {
        const collectionStats = collectionsStatsMap[floorPrice.collection_id];
        return {
          ...collectionStats,
          ...floorPrice,
        };
      });

      console.log("mergedData", mergedData);
      return mergedData;
    }
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    throw error;
  }
}

export default getDashboardData;
