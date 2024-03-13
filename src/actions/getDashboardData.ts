"use server";

import { getUserByEmail } from "@/data/user";
import getCollectionIds from "./getCollectionIds";
import getCollectionsStats from "./getCollectionsStats";
import getCollectionsFloor from "./getCollectionsFloor";

async function getDashboardData(
  userEmail: string | null,
  wallets: string | null
) {
  if (userEmail == null) {
    // No session
    return null;
  } else {
    console.log("userEmail inside get dashboard servaction", userEmail);
    const user = await getUserByEmail(userEmail);
    if (user == null) {
      return { null: null };
    }

    console.log("wallets inside get dashboard servaction", wallets);
    const collectionIds: string[] = await getCollectionIds(wallets);
    
    const [collectionsStats, collectionsFloor] = await Promise.all([
      getCollectionsStats(collectionIds),
      getCollectionsFloor(collectionIds),
    ]);

    console.log("collectionsStats", collectionsStats);
    console.log("collectionsFloor", collectionsFloor);

    const collectionsStatsMap = collectionsStats.reduce((map: any, collection: any) => {
      map[collection.collection_id] = collection;
      return map;
    }, {});
    
    const mergedData = collectionsFloor.map(floorPrice => {
      const collectionStats = collectionsStatsMap[floorPrice.collection_id];
      return {
        ...collectionStats,
        ...floorPrice,
      };
    });
    
    console.log("mergedData", mergedData);
    return mergedData;
  }
}

export default getDashboardData;