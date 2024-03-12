"use server";

async function getCollectionsStats(collectionIds: string[]) {
  let apikey: string = process.env.SIMPLE_HASH ?? "";
  const collectionIdsParam = collectionIds.join(",");

  const headers = new Headers();
  headers.append("x-api-key", apikey);

  const response = await fetch(
    `https://api.simplehash.com/api/v0/nfts/collections_activity?collection_ids=${collectionIdsParam}`,
    {
      method: "GET",
      headers: headers,
    }
  );

  const jsonData = await response.json();

  const collectionStats = jsonData.collections.map((collection: any) => ({
    collection_id: collection.collection_id,
    name: collection.name,
    volume_1d: collection["1_day_volume"],
    volume_7d: collection["7_day_volume"],
    volume_30d: collection["30_day_volume"],
    market_cap: collection.market_cap,
  }));

  return collectionStats;
}

export default getCollectionsStats;