"use server";

import {
  addCollectionsToCollection,
  getCollectionById,
  getWatchlistCollections,
  isWatchlistCollection,
} from "@/data/collection";
import { db } from "@/lib/db";

interface data {
  watchlists?: string[];
  error?: string;
}

export const getWatchlists = async (userRef: any): Promise<data> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: userRef.current.email,
      },
    });
    //TODO: handle logout here, Remove session
    const collections = await getWatchlistCollections(user);
    return {};
  } catch (error: any) {
    console.error("Error in getWatchlists:", error);
    return { error: error };
  }
};

export const addWatchlist = async (slug: string, userRef: any) => {
  try {
    console.log("userRef in addwatchlist", userRef);
    const user: any = await db.user.findUnique({
      where: {
        email: userRef.current.email,
      },
    });
    console.log("user from db", user);
    //TODO: handle logout here, Remove session
    const formatSlug = (slug: string) => {
      let normalized = slug.toLowerCase();

      normalized = normalized.replace(/\s+/g, "");

      return normalized;
    };
    const formattedSlug: string = formatSlug(slug);
    console.log("formattedSlug", formattedSlug);
    //get inscription
    const inscription = await fetch(
      `https://turbo.ordinalswallet.com/collection/${formattedSlug}`,
      {
        method: "GET",
      }
    );
    if (inscription.status !== 200) {
      return { error: "Failed to fetch data from API, Try Again Later" };
    }
    const inscriptionData = await inscription.json();

    const inscriptionNumber = inscriptionData.highest_inscription_num;
    console.log("inscription", inscriptionNumber);
    //get collection id

    const headers = new Headers();
    headers.append("x-api-key", process.env.SIMPLE_HASH ?? "");

    const collectionIdFromSlug = await fetch(
      `https://api.simplehash.com/api/v0/nfts/bitcoin/inscription_number/${inscriptionNumber}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    //verify response
    const response = await collectionIdFromSlug.json();
    // console.log("response", response);
    if (response.status !== 200) {
      if (response.status === 404) {
        if (response.message === "Not Found") {
          return { error: "Collection not found" };
        }
        return { error: "Failed to fetch data from API, Try Again Later" };
      }
    }

    //check if it exists in collection, get details
    const collectionId = response.collection.collection_id;
    console.log("collectionId", collectionId);
    //Add to collections if does not exist
    let collectionDetails;
    if (collectionId.error) {
      collectionDetails = await addCollectionsToCollection(
        [collectionId],
        user
      );
    }
    collectionDetails = await getCollectionById(collectionId);
    console.log("collectionDetails", collectionDetails);

    //check if it exists in user_watchlist, if not, create
    const inwatchlist = await isWatchlistCollection(collectionId, user);
    console.log("inwatchlist", inwatchlist);
    //return collection details
    return collectionDetails;
  } catch (error: any) {
    console.error("Error in addWatchlist:", error);
    return { error: error };
  }
};
