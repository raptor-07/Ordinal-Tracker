import { db } from "@/lib/db";
import { User } from "./wallet";
import { TrackType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const addCollectionsToCollection = async (
  collections: string[],
  user: User
) => {
  try {
    //create collection_id request param
    const collectionParam = collections.join(",");

    const headers = new Headers();
    headers.append("x-api-key", process.env.SIMPLE_HASH ?? "");
    console.log("collectionParam", collectionParam);
    const response = await fetch(
      `https://api.simplehash.com/api/v0/nfts/collections/ids?collection_ids=${collectionParam}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    console.log("response for collections", response);
    if (response.status === 200) {
      const data = await response.json();

      const mergedData = collections
        .map((collection) => {
          const collectionData = data.collections.find(
            (item: any) => item.collection_id === collection
          );
          if (collectionData) {
            return {
              collectionId: collectionData.collection_id,
              name: collectionData.name,
              description: collectionData.description,
              image: collectionData.image_url,
            };
          }
        })
        .filter(Boolean);

      console.log("mergedData", mergedData);
      let collectionsUpdate;
      mergedData.forEach(async (collection) => {
        await db.collection.upsert({
          where: {
            cId: collection?.collectionId ?? "",
          },
          update: {
            cId: collection?.collectionId ?? "",
            name: collection?.name ?? "",
            description: collection?.description ?? "",
            image: collection?.image ?? "",
          },
          create: {
            cId: collection?.collectionId ?? "",
            name: collection?.name ?? "",
            description: collection?.description ?? "",
            image: collection?.image ?? "",
          },
        });
      });
      return {};
    }
    return { error: "Error fetching collection IDs" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addCollectionsToUserCollection = async (
  collections: string[],
  user: User
) => {
  try {
    const ownedCollections = await db.user_Collection.findMany({
      where: {
        uId: user.uId,
      },
    });

    const ownedCollectionIds = ownedCollections.map((c) => c.collectionId);
    const newCollections = collections.filter(
      (c) => !ownedCollectionIds.includes(c)
    );

    const addedCollections = await Promise.all(
      newCollections.map((collectionId) => {
        return db.user_Collection.create({
          data: {
            uId: user.uId,
            collectionId: collectionId,
          },
        });
      })
    );

    return addedCollections;
  } catch (error) {
    console.error("Error in addCollectionsToUserCollection:", error);
    throw error;
  }
};

export const getUserCollections = async (user: User) => {
  try {
    const collections = await db.user_Collection.findMany({
      where: {
        uId: user.uId,
      },
    });
    if (collections.length === 0) {
      return { error: "No collections found" };
    }
    return collections;
  } catch (error) {
    console.error("Error in getUserCollections:", error);
    throw error;
  }
};

export const getCollectionById = async (collectionId: string) => {
  try {
    const collection = await db.collection.findUnique({
      where: {
        cId: collectionId,
      },
    });

    return collection;
  } catch (error) {
    console.error("Error in getCollectionById:", error);
    throw error;
  }
};
export const getWatchlistCollections = async (user: any) => {
  try {
    const collections = await db.user_Watchlist.findMany({
      where: {
        uId: user.uId,
      },
    });
    console.log("collections", collections);
    return collections;
  } catch (error) {
    console.error("Error in getWatchlistCollections:", error);
    throw error;
  }
};

export const isWatchlistCollection = async (
  collectionId: string,
  user: any
) => {
  try {
    let watchlist = await db.user_Watchlist.findUnique({
      where: {
        uId_collectionId: {
          uId: user.uId,
          collectionId: collectionId,
        },
      },
    });

    if (!watchlist) {
      watchlist = await db.user_Watchlist.create({
        data: {
          uId: user.uId,
          collectionId: collectionId,
        },
      });
    }

    return watchlist;
  } catch (error) {
    console.error("Error in isWatchlistCollection:", error);
    throw error;
  }
};

export const isInCollection = async (collectionId: string) => {
  try {
    const collection = await db.collection.findUnique({
      where: {
        cId: collectionId,
      },
    });
    if (collection === null) {
      return {
        error: "Collection not found",
      };
    }
    return collection;
  } catch (error) {
    console.error("Error in isInCollection:", error);
    throw error;
  }
};

export const createAlertEntryForUser = async (user: any, alertData: any) => {
  const {
    trackingType,
    refPrice,
    trackingDirection,
    trackingValue,
    watchlistId,
  } = alertData;

  const trackTypeEnum = {
    "Percent Movement": "percentage",
    "Absolute Value": "absolute_value",
  };

  try {
    const newAlert = await db.floor_Alerts.create({
      data: {
        aId: uuidv4(),
        user: {
          connect: {
            uId: user.uId,
          },
        },
        collection: {
          connect: {
            cId: watchlistId,
          },
        },
        trackType: trackTypeEnum[
          trackingType as keyof typeof trackTypeEnum
        ] as TrackType,
        refPrice: parseInt(refPrice),
        direction: trackingDirection === "Up",
        value: parseInt(trackingValue),
      },
    });

    console.log("newAlert", newAlert);

    return newAlert;
  } catch (error) {
    console.error("Error creating alert entry for user:", error);
    throw error;
  }
};
