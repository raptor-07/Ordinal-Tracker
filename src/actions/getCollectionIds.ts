"use server";

import dotenv from "dotenv";
dotenv.config();

async function getCollectionIds(wallets: string | null) {
  let apikey: string = process.env.SIMPLE_HASH ?? "";

  const fetchData = async (wallet: string) => {
    const headers = new Headers();
    headers.append("x-api-key", apikey);

    const response = await fetch(
      `https://api.simplehash.com/api/v0/nfts/transfers/wallets?chains=bitcoin&wallet_addresses=${wallet}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (response.status === 200) {
      const jsonData = await response.json();

      const filteredTransfers = jsonData.transfers.filter(
        (transfer: any) =>
          transfer.chain === "bitcoin" && transfer.collection_id !== null
      );

      const ids = filteredTransfers.map(
        (transfer: any) => transfer.collection_id
      );

      return { [wallet]: ids };
    } else {
      throw new Error();
    }
  };

  try {
    if (wallets) {
      const walletIds = wallets.split(",");
      const walletCollections = await Promise.all(
        walletIds.map((wallet) => fetchData(wallet))
      );

      const result = Object.assign({}, ...walletCollections);
      console.log("result", result);
      return result;
    }
  } catch (error) {
    console.error("Error fetching collection IDs:", error);
    throw error;
  }
}

export default getCollectionIds;