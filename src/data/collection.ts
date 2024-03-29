import { db } from "@/lib/db";
import { User } from "./wallet";
import { TrackType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const addCollectionsToCollection = async (
  collections: string[],
  user: User,
  collectionData: any[]
) => {
  try {
    const mergedData = collections
      .map((collectionId) => {
        const collection = collectionData.find(
          (item: any) => item.collection_id === collectionId
        );
        if (collection) {
          return {
            collectionId: collection.collection_id,
            name: collection.name,
            description: collection.description,
            image: collection.image_url,
            owner_count: collection.distinct_owner_count,
            nft_count: collection.distinct_nft_count,
            quantity: collection.total_quantity,
          };
        }
      })
      .filter(Boolean);

    for (const coll of mergedData) {
      try {
        await db.collection.upsert({
          where: {
            cId: coll?.collectionId ?? "",
          },
          update: {
            cId: coll?.collectionId ?? "",
            name: coll?.name ?? "",
            description: coll?.description ?? "",
            image: coll?.image ?? "",
            owner_count: coll?.owner_count ?? 0,
            nft_count: coll?.nft_count ?? 0,
            quantity: coll?.quantity ?? 0,
          },
          create: {
            cId: coll?.collectionId ?? "",
            name: coll?.name ?? "",
            description: coll?.description ?? "",
            image: coll?.image ?? "",
            owner_count: coll?.owner_count ?? 0,
            nft_count: coll?.nft_count ?? 0,
            quantity: coll?.quantity ?? 0,
          },
        });
      } catch (error) {
        console.log(
          `Failed to insert collection with id: ${coll?.collectionId} \n Error: ${error}`
        );
      }
    }
    return {};
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addCollectionsToUserCollection = async (
  collections: any,
  user: User,
  wallets: string | null
) => {
  try {
    const addedCollections = [];
    const avoidedCollections = [];

    console.log("this is the wallets and their collections", collections);

    for (const walletId in collections) {
      console.log("this is walletId", walletId);
      const collectionIds = collections[walletId];
      console.log("this is collectionIds of the wallet", collectionIds);

      for (const collectionId of collectionIds) {
        console.log("this is collectionId", collectionId);
        const existingCollection = await db.user_Collection.findUnique({
          where: {
            uId_collectionId_walletId: {
              uId: user.uId,
              collectionId: collectionId,
              walletId: walletId,
            },
          },
        });

        if (!existingCollection) {
          try {
            const addedCollection = await db.user_Collection.create({
              data: {
                uId: user.uId,
                collectionId: collectionId,
                walletId: walletId,
              },
            });

            addedCollections.push(addedCollection);
          } catch (error) {
            console.log(
              `Failed to add collection with id: ${collectionId} to the database because of error: ${error}`
            );
          }
        } else {
          avoidedCollections.push(collectionId);
        }
      }
    }

    return { addedCollections, avoidedCollections };
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
    //return only unique collection ids
    const uniqueCollectionIds = Array.from(
      new Set(collections.map((item) => item.collectionId))
    );

    console.log("uniqueCollectionIds", uniqueCollectionIds);

    return uniqueCollectionIds;
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
    // console.log("collections", collections);
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

export const deleteWatchlistCollection = async (
  collectionId: string,
  user: any
) => {
  try {
    await db.user_Watchlist.delete({
      where: {
        uId_collectionId: {
          uId: user.uId,
          collectionId: collectionId,
        },
      },
    });
    return {};
  } catch (error) {
    console.error("Error in deleteWatchlistCollection:", error);
    throw error;
  }
}

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

export const createAlertEntryForUser = async (user: any, collectionId: any) => {

  const trackTypeEnum = {
    "Percent Movement": "percentage",
    "Absolute Value": "absolute_value",
  };

  // Hard coded values
  const trackingType = "Percent Movement";
  const refPrice = "100";
  const trackingDirection = "Up";
  const trackingValue = "10";

  try {
    const newAlert = await db.floorAlerts.create({
      data: {
        aId: uuidv4(),
        user: {
          connect: {
            uId: user.uId,
          },
        },
        collection: {
          connect: {
            cId: collectionId,
          },
        },
        trackType: trackTypeEnum[
          trackingType as keyof typeof trackTypeEnum
        ] as TrackType,
        refPrice: parseInt(refPrice),
        direction: trackingDirection === "Up",
        value: parseInt(trackingValue),
        latestFloor: null,
      },
    });

    console.log("newAlert", newAlert);

    return newAlert;
  } catch (error) {
    console.error("Error creating alert entry for user:", error);
    throw error;
  }
};

export const getAlertEntriesForUser = async (user: any) => {
  try {
    const alerts = await db.floorAlerts.findMany({
      where: {
        uId: user.uId,
      },
    });

    return alerts;
  } catch (error) {
    console.error("Error getting alert entries for user:", error);
    throw error;
  }
}

export const deleteAlertEnryById = async (user: any, alertId: string) => {
  try {
    await db.floorAlerts.delete({
      where: {
        aId: alertId,
        uId: user.uId,
      },
    });
  } catch (error) {
    console.error("Error deleting alert entry by id:", error);
    throw error;
  }
};

export const deleteUserCollectionsByWallet = async (
  walletId: string,
  userId: string
) => {
  try {
    await db.user_Collection.deleteMany({
      where: {
        walletId: walletId,
        uId: userId,
      },
    });
  } catch (error) {
    console.error("Error deleting user collections by wallet: ", error);
    throw error;
  }
};
