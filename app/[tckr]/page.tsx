/*
    Dynamic route server component:
    Handles server-side data fetching from API, uses the url param to identify the coin
    Once the coin is identified, it is passed as a prop to Tckr.tsx
    Various error handling implemented.
    Written by Junoh Cho
 */

import { TckrProps } from "@/types";
import { incrementApiCall } from "@/lib/apiCallTracker";
import Tckr from "@/components/Tckr";
import { Suspense } from "react";

export default async function TckrPage({ params }: { params: Promise<{ tckr: string }> }) {
    incrementApiCall("graph");

    const symbol = decodeURIComponent((await params).tckr);
    const url = "https://api.coingecko.com/api/v3/coins/markets?" +
        new URLSearchParams({
            vs_currency: "usd",  //Return prices in USD
            order: "market_cap_desc",
            per_page: "250",
            page: "1",
            sparkline: "false",  //Don't include sparkline data
            price_change_percentage: "24h"  //Include 24h info
        });

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.CRYPTO_API_KEY || "",
        }
    };

    try {
        const res = await fetch(url, options); //Fetch from CoinGecko

        //Handle failed request
        if (!res.ok) {
            console.error("[CoinGecko] Fetch failed with status:", res.status);
            throw new Error("Failed to fetch from CoinGecko");
        }

        //Parse JSON result
        const data: unknown = await res.json();

        //Ensures the data fetched is in array form.
        if (!Array.isArray(data)) {
            console.error("[CoinGecko] Invalid response format:", data);
            throw new Error("CoinGecko response was not an array");
        }

        const coin = (data as TckrProps[]).find(
            (c) => c.symbol.toLowerCase() === symbol.toLowerCase()//finds specific coin object from the fetched data list
        );

        if (!coin) { //Handles coin not found
            console.warn(`[CoinGecko] Coin with symbol "${symbol}" not found.`);
            return <p>Coin not found</p>;
        }

        /*Suspense fallback was the original logic to handling loading screen, but since then I have implemented loading screen
        in Tckr.tsx. Didn't remove this suspense tag just in case loading.tsx fails, we still need basic loading message.*/
        return (
            <Suspense fallback={<p>Loading...</p>}>
                <Tckr coin={coin} />
            </Suspense>
        );
    } catch (error: any) { //Handles any unexpected errors during data fetch or processing,
        console.error("[TckrPage ERROR]", error.message || error); // logs the error for debugging, and displays a fallback UI to the user.

        return <p>Failed to load coin data.</p>;
    }
}