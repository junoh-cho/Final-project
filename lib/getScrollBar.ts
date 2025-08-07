/* This is used to retrieve the Top 50 Coins
*  The implementation follows steps provided by Coin Gekko
* This info is passed to be used in the bottom scroll bar
*
*
* Written by Owen Lennox
* */

"use server";

import { TckrProps, CoinGeckoMarketCoin } from "@/types";
import { incrementApiCall } from "./apiCallTracker";

const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY;

export default async function GetHomeTckr(): Promise<TckrProps[] | undefined> {
    incrementApiCall("GetScrollBar");

    try {
        const url =
            "https://api.coingecko.com/api/v3/coins/markets?" +
            new URLSearchParams({
                vs_currency: "usd",
                include_tokens: "top",
                order: "market_cap_desc",
                per_page: "25",
                sparkline: "false",
                price_change_percentage: "24h",
            });

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": CRYPTO_API_KEY || "",
            },
        };

        const res = await fetch(url, options);

        const data: CoinGeckoMarketCoin[] = await res.json();

        if (!Array.isArray(data)) {
            console.error("FAIL", data);
            return [];
        }

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
        console.error("Error:", error);
        return undefined;
    }
}