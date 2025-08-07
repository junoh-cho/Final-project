/* This is used to retrieve the Top 5 Coins
*  The implementation follows steps provided by Coin Gekko
*
*
* Written by Owen Lennox
* */


"use server"
import { TckrProps } from "@/types";
const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY;
import { CoinGeckoMarketCoin } from "@/types";
import { incrementApiCall } from './apiCallTracker';

export default async function GetHomeTckr(): Promise<TckrProps[]> {
    incrementApiCall("GetHomeTckr");
    console.log("GetHomeTckr");

    try {
        // Clean way to format my optional retrievals
        const url = 'https://api.coingecko.com/api/v3/coins/markets?' +
            new URLSearchParams({
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: '5',
                page: '1',
                sparkline: 'false',
                price_change_percentage: '24h'
            });
        //steps provided on coin Gekko
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': CRYPTO_API_KEY || '', // use .env
            }
        };

        const res = await fetch(url, options);

        if (!res.ok) throw new Error('Failed ');

        const data: CoinGeckoMarketCoin[] = await res.json();

        if (!Array.isArray(data)) throw new Error("FAIL");

        const tckrProps: TckrProps[] = data.map((coin) => ({
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
            price_change_percentage_24h: coin.price_change_percentage_24h
        }));

        return tckrProps;
    } catch (error) {
        console.error("Error :", error);
        return []; // return empty array to prevent crash
    }
}