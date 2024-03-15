"use server";

import { getWatchlistCollections } from "@/data/collection";

interface data {
  watchlists?: string[];
  error?: string;
}

export const getWatchlists = async (user: any): Promise<data> => {
  try {
    const collections = await getWatchlistCollections(user);
    return {};
  } catch (error: any) {
    console.error("Error in getWatchlists:", error);
    return { error: error };
  }
};
