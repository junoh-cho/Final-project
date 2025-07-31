"use server"
import {TckrProps} from "@/types";
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY;
import {CoinGeckoMarketCoin} from "@/types";

export default async function GetHomeTckr(): Promise<TckrProps[] | undefined> {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&include_tokens=top&order=market_cap_desc&per_page=25&sparkline=false&price_change_percentage=24h")
        console.log({res})
        const data: CoinGeckoMarketCoin[] = await res.json();
        if (!Array.isArray(data)) {
            console.error("Unexpected CoinGecko response:", data);
            return [];
        }
        console.log("DEBUG DATA:", data);
        const coins: TckrProps[] = data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            image: coin.image,
            symbol: coin.symbol,
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            market_cap_rank: coin.market_cap_rank,
            total_volume: coin.total_volume,
            high_24h: coin.high_24h,
            low_24h: coin.low_24h,
            price_change_24h: coin.price_change_24h,
            price_change_percentage_24h: coin.price_change_percentage_24h,
        }));

        return coins;
    } catch (error) {
        console.error("Error fetching top coins:", error);
        return undefined;
    }
}