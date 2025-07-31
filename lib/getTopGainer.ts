import { TckrProps } from "@/types";

export default async function getTopGainers(): Promise<TckrProps[]> {
    const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&price_change_percentage=24h'
    );
    const data: TckrProps[] = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid data");

    // Sort descending by 24h change
    const sorted = data
        .filter((coin) => coin.price_change_percentage_24h !== null)
        .sort(
            (a, b) =>
                (b.price_change_percentage_24h ?? -Infinity) -
                (a.price_change_percentage_24h ?? -Infinity)
        );

    // Return the top 3
    return sorted.slice(0, 3);
}
