/*
    This is where We Retrieve the news
    A different method was necessary do to coors and retrieval issues
    This time we fetch the Api and then we iterate through the json
    with response.json
    We then return the array in Json format and then it is called by

    Written by Owen Lennox
 */


import { NextResponse } from 'next/server';

export async function GET() {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${NEWS_API_KEY}&filter=important&public=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }

        const json = await response.json();
        return NextResponse.json(json.results); // return only the news array
    } catch (err) {
        console.error("Error fetching news:", err);
        return NextResponse.json({ error: 'Failed to fetch news' }) //reTurn error
    }
}
