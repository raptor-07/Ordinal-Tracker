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

    //Session 0 | Wallets 1
    if (
      (userEmail == null || userEmail === "" || userEmail === undefined) &&
      wallets !== null &&
      wallets !== "" &&
      wallets !== undefined
    ) {
      console.log("Session 0 | Wallets 1");

      const result: any = await getCollectionIds(wallets);
      const collectionIds = result.collectionIds;
      const collectionDetails = result.collectionDetails;

      if (collectionIds.error) {
        return { error: "No data found" };
      }

      const mergedCollectionIds: any = Array.from(
        new Set(Object.values(collectionIds).flat())
      );

      if (mergedCollectionIds.length > 20) {
        mergedCollectionIds.slice(0, 20);
      }

      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(mergedCollectionIds),
        getCollectionsFloor(mergedCollectionIds),
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

      const collectionDetailsMap = collectionDetails.reduce((map: any, collection: any) => {
        map[collection.collection_id] = collection;
        return map;
      }, {});

      const mergedData = collectionsFloor.map((floorPrice: any) => {
        const collectionStats = collectionsStatsMap[floorPrice.collection_id];
        const collectionDetail = collectionDetailsMap[floorPrice.collection_id];

        return {
          ...collectionStats,
          ...floorPrice,
          // Add additional fields from collectionDetail
          image_url: collectionDetail?.image_url,
          distinct_owner_count: collectionDetail?.distinct_owner_count,
          distinct_nft_count: collectionDetail?.distinct_nft_count,
          total_quantity: collectionDetail?.total_quantity,
        };
      });

      return mergedData;
    } else if (
      //Session 1 | Wallets 1
      userEmail !== null &&
      userEmail !== "" &&
      userEmail !== undefined &&
      wallets !== null &&
      wallets !== "" &&
      wallets !== undefined
    ) {
      console.log("Session 1 | Wallets 1");
      if (userEmail === null || userEmail === "" || userEmail === undefined) {
        return { error: "user does not exist" };
      }

      const user = await getUserByEmail(userEmail);
      if (user == null) {
        return { error: "user does not exist" };
      }
      // console.log("user", user);

      const resultFromGetCollectionIds: any = await getCollectionIds(wallets);

      const collectionIds: any = resultFromGetCollectionIds.collectionIds;
      const collectionDetails: any = resultFromGetCollectionIds.collectionDetails;

      console.log("collectionIds", collectionIds);

      if (collectionIds.error) {
        return { error: "No data found" };
      }
      let mergedCollectionIds: any = Array.from(
        new Set(Object.values(collectionIds).flat())
      );

      console.log(
        "number of items in mergedCollectionIds",
        mergedCollectionIds.length
      );
      console.log("mergedCollectionIds", mergedCollectionIds);
      const addedCollection: any = await addCollectionsToCollection(
        mergedCollectionIds,
        user,
        collectionDetails
      );

      if (addedCollection.hasOwnProperty("error")) {
        return { error: "No data found" };
      }

      //add collections to user collection
      const addedCollectionsToUserCollection: any = await addCollectionsToUserCollection(
        collectionIds,
        user,
        wallets
      );

      console.log("addedCollectionsToUserCollection", addedCollectionsToUserCollection.addedCollections);
      console.log("addedCollectionsToUserCollection", addedCollectionsToUserCollection.avoidedCollections);

      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(mergedCollectionIds),
        getCollectionsFloor(mergedCollectionIds),
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

      const collectionDetailsMap = collectionDetails.reduce((map: any, collection: any) => {
        map[collection.collection_id] = collection;
        return map;
      }, {});

      const mergedData = collectionsFloor.map((floorPrice: any) => {
        const collectionStats = collectionsStatsMap[floorPrice.collection_id];
        const collectionDetail = collectionDetailsMap[floorPrice.collection_id];

        return {
          ...collectionStats,
          ...floorPrice,
          // Add additional fields from collectionDetail
          image_url: collectionDetail?.image_url,
          distinct_owner_count: collectionDetail?.distinct_owner_count,
          distinct_nft_count: collectionDetail?.distinct_nft_count,
          total_quantity: collectionDetail?.total_quantity,
        };
      });

      console.log("mergedData", mergedData);
      return mergedData;
    } else {
      //Session 1 | Wallets 0
      console.log("Session 1 | Wallets 0");
      if (userEmail === null || userEmail === "" || userEmail === undefined) {
        return {
          error: "user, collectionDetails does not exist"
        };
      }
      const user = await getUserByEmail(userEmail);
      if (user == null) {
        return { error: "user does not exist" };
      }
      // console.log("user inside S1WO", user);
      const collectionIds: any = await getUserCollections(user);
      if (collectionIds.error === "No collections found") {
        return { error: collectionIds.error };
      }

      // console.log("collectionIds", collectionIds);
      const [collectionsStats, collectionsFloor] = await Promise.all([
        getCollectionsStats(collectionIds),
        getCollectionsFloor(collectionIds),
      ]);
      // console.log("collectionsStats", collectionsStats);
      // console.log("collectionsFloor", collectionsFloor);

      if (getCollectionsStats.length === 0 || collectionsFloor.length === 0) {
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
