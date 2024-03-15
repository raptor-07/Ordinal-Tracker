import { db } from "@/lib/db";
import { User } from "./wallet";

export const addCollectionsToCollection = async (
  collections: string[],
  user: User
) => {
  try {
    //create collection_id request param
    const collectionParam = collections.join(",");

    const headers = new Headers();
    headers.append("x-api-key", process.env.SIMPLE_HASH ?? "");

    const response = await fetch(
      `https://api.simplehash.com/api/v0/nfts/collections/ids?collection_ids=${collectionParam}`,
      {
        method: "GET",
        headers: headers,
      }
    );

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
              description: collectionData.description,
              image: collectionData.image_url,
            };
          }
        })
        .filter(Boolean);

        console.log("mergedData", mergedData);

      mergedData.forEach(async (collection) => {
        let collectionsUpdate = await db.collection.upsert({
          where: {
            cId: collection?.collectionId ?? "",
          },
          update: {
            cId: collection?.collectionId ?? "",
            description: collection?.description ?? "",
            image: collection?.image ?? "",
          },
          create: {
            cId: collection?.collectionId ?? "",
            description: collection?.description ?? "",
            image: collection?.image ?? "",
          },
        });
      });
      return;
    }
    throw new Error("Failed to fetch data from API, Try Again Later");
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

    console.log("addedCollections", addedCollections);

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

    return collections;
  } catch (error) {
    console.error("Error in getUserCollections:", error);
    throw error;
  }
}