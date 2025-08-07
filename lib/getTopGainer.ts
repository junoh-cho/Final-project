/* This is used to retrieve the Top 5 Coins
*  The implementation follows steps provided by Coin Gekko
*   We retrieve all coins in the market
* then we sort them by the highest Price chane in the last 24h.
* and then return the top 3
*
* Written by Owen Lennox
* */

import { TckrProps } from "@/types";
import { incrementApiCall } from './apiCallTracker';

const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY;

export default async function getTopGainers(): Promise<TckrProps[]> {
    incrementApiCall("getTopGainers");
    console.log("getTopGainers");

    try {
        const url =
            "https://api.coingecko.com/api/v3/coins/markets?" +
            new URLSearchParams({ //object which will put the data into the link
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: "250",
                page: "1",
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

        if (!res.ok) {
            console.error(" TopGainers not working :", res.status);
            throw new Error(` API failed ${res.status}`);
        }

        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
            console.error("[ actual array", data);

        }

        const typedData = data as TckrProps[];

        const sorted = typedData
            .filter((coin) => coin.price_change_percentage_24h !== null) //removes all where price change doesnt exist
            .sort(
                (a, b) => // goes from start ,compares a and b, if negative b moves to before a, goes until full array is sorted

                    (b.price_change_percentage_24h ) -
                    (a.price_change_percentage_24h )
            );

        return sorted.slice(0, 3);
    } catch (err: any) {
        console.error("[getTopGainers ERROR]", err.message || err);
        return []; // or: throw err;
    }
}
