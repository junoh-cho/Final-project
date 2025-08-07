export type TckrProps =  {
    //https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&symbols=btc&include_tokens=all&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=2

    id: string;
    name: string;
    image: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;



}
export type CoinGeckoMarketCoin = {
    id: string;
    name: string;
    image: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
};

export type NewsProps = {
    id: string
    slug : string;
    title: string;
    description: string;
    publishedAt: string;
    createdAt: string;
    kind : string;
}