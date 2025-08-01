

export default async function getChart(Name: string): Promise<number[]> {
    const url = 'https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=1';
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`Failed to fetch chart for ${Name}`);
        return [];
    }

    const data = await res.json();

    if (!data.prices || !Array.isArray(data.prices)) {
        console.error(`No price data for ${Name}`);
        return [];
    }
    return data.prices.map((entry: [number, number]) => entry[1]);
}