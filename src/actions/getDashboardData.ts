"use server";

import { getUserByEmail } from "@/data/user";
import getCollectionIds from "./getCollectionIds";
import getCollectionsStats from "./getCollectionsStats";
import getCollectionsFloor from "./getCollectionsFloor";
import {
  addCollectionsToCollection,
  addCollectionsToUserCollection,
  getUserCollections,
} from "@/data/collection";
import { getUserWallets } from "@/data/wallet";

async function getDashboardData(
  userRef: { current: any },
  wallets: string | null
) {
  let userEmail;
  if (userRef.current == undefined) {
    //session does not exist - Session 0
    userEmail = null;
  } else {
    userEmail = userRef.current.email;
  }
  try {
    console.log("userEmail", userEmail);
    console.log("wallets", wallets);

    if (
      (userEmail == null || userEmail === "" || userEmail === undefined) &&
      wallets !== null &&
      wallets !== "" &&
      wallets !== undefined
    ) {
      //Session 0 | Wallets 1
      console.log("Session 0 | Wallets 1");
      const collectionIds: string[] | any = await getCollectionIds(wallets);

      if (collectionIds.error) {
        return { error: collectionIds.error };
      }

      if (collectionIds.length > 20) {
        collectionIds.slice(0, 20);
      }

      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(collectionIds),
        getCollectionsFloor(collectionIds),
      ]);

      if (collectionsStats.length === 0 || collectionsFloor.length === 0) {
        return { error: "No data found" };
      }

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
    } else if (
      userEmail !== null &&
      userEmail !== "" &&
      userEmail !== undefined &&
      wallets !== null &&
      wallets !== "" &&
      wallets !== undefined
    ) {
      //Session 1 | Wallets 1
      console.log("Session 1 | Wallets 1");
      if (userEmail === null || userEmail === "" || userEmail === undefined) {
        return { error: "user does not exist" };
      }
      // console.log("userEmail", userEmail);
      const user = await getUserByEmail(userEmail);
      if (user == null) {
        return { error: "user does not exist" };
      }
      console.log("user", user);

      const collectionIds: string[] | any = await getCollectionIds(wallets);

      if (collectionIds.error) {
        return { error: collectionIds.error };
      }

      if (collectionIds.length > 20) {
        collectionIds.slice(0, 20);
      }

      const addedCollection: any = await addCollectionsToCollection(
        collectionIds,
        user
      );

      if (addedCollection.hasOwnProperty("error")) {
        return { error: addedCollection.error };
      }

      await addCollectionsToUserCollection(collectionIds, user);

      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(collectionIds),
        getCollectionsFloor(collectionIds),
      ]);

      if (collectionsStats.length === 0 || collectionsFloor.length === 0) {
        return { error: "No data found" };
      }
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
    } else {
      //Session 1 | Wallets 0
      console.log("Session 1 | Wallets 0");
      if (userEmail === null || userEmail === "" || userEmail === undefined) {
        return { error: "user does not exist" };
      }
      const user = await getUserByEmail(userEmail);
      if (user == null) {
        return { error: "user does not exist" };
      }
      const collectionIds: any = await getUserCollections(user);
      if (collectionIds.error === "No collections found") {
        return { error: collectionIds.error };
      }
      const collectionIdStrings = collectionIds.map(
        (item: any) => item.collectionId
      );

      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(collectionIdStrings),
        getCollectionsFloor(collectionIdStrings),
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

      const userWallets = await getUserWallets(user);
      const userWalletsString = userWallets
        .map((wallet: any) => wallet.wId)
        .join(",");
      console.log({ wallets: userWalletsString, data: mergedData });
      return { wallets: userWalletsString, data: mergedData };
    }
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    throw error;
  }
}

export default getDashboardData;
