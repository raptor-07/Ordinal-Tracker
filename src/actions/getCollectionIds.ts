"use server";

import dotenv from "dotenv";
dotenv.config();

async function getCollectionIds(wallets: string | null) {
  let collectionIds: string[] = [];

  let apikey: string = process.env.SIMPLE_HASH ?? "";

  const fetchData = async (url: string) => {
    const headers = new Headers();
    headers.append("x-api-key", apikey);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    // console.log("response", response.status);
    if (response.status === 200) {
      const jsonData = await response.json();
      // console.log("jsonData", jsonData);

      const filteredTransfers = jsonData.transfers.filter(
        (transfer: any) =>
          transfer.chain === "bitcoin" && transfer.collection_id !== null
      );

      const ids = filteredTransfers.map(
        (transfer: any) => transfer.collection_id
      );
      collectionIds = collectionIds.concat(ids);

      if (jsonData.next) {
        await fetchData(jsonData.next);
      }
    } else {
      throw new Error();
    }
  };

  try {
    await fetchData(
      `https://api.simplehash.com/api/v0/nfts/transfers/wallets?chains=bitcoin&wallet_addresses=${wallets}`
    );

    const uniqueCollectionIds = Array.from(new Set(collectionIds));
    console.log("uniqueCollectionIds", uniqueCollectionIds);
    return uniqueCollectionIds;
  } catch (error) {
    console.error("Error fetching collection IDs:", error);
    throw error;
  }
}

export default getCollectionIds;
