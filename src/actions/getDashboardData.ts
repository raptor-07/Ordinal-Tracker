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
    const user = await getUserByEmail(userEmail);
    if (user == null) {
      return { null: null };
    }

    const collectionIds: string[] = await getCollectionIds(wallets);
    const [collectionsStats, collectionsFloor] = await Promise.all([
      getCollectionsStats(collectionIds),
      getCollectionsFloor(collectionIds),
    ]);

    const collectionsStatsMap = collectionsStats.reduce((map: any, collection: any) => {
      map[collection.collection_id] = collection;
      return map;
    }, {});

    const mergedData = collectionsFloor.map(floorPrice => {
      if (floorPrice) {
        const collectionStats = collectionsStatsMap[floorPrice.collection_id];
        return {
          collection_id: floorPrice.collection_id,
          floor_price: floorPrice.floor_price,
          One_D_floor: floorPrice.One_D_floor,
          Seven_D_floor: floorPrice.Seven_D_floor,
          volume_1d: collectionStats["1_day_volume"],
          volume_7d: collectionStats["7_day_volume"],
          volume_30d: collectionStats["30_day_volume"],
          market_cap: collectionStats.market_cap,
        };
      }
      return null;
    });

    return mergedData;
  }
}

export default getDashboardData;