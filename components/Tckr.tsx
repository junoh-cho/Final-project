/*
    This component displays detailed information about a selected coin (ticker),
    including its image, name, symbol, current price, 24-hour change, a price chart, 
    and extra stats such as market cap, 24h high, and 24h low.

    It fetches market chart data from the CoinGecko API using the coin’s ID
    and displays the past 365 days as a line graph using Chart.js.

    Written by Junoh Cho
 */

"use client";

import { TckrProps } from "@/types";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import { useTheme } from '@/app/context/useTheme';
import styled from "styled-components";
import Loading from "@/components/Loading";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { incrementApiCall } from "@/lib/apiCallTracker";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

// Page background with conditional theme support
const PageWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isDarkMode",
})<{ isDarkMode: boolean }>`
    background-color: ${(props) => (props.isDarkMode ? "black" : "#f0f0f0")};
    min-height: 100vh;
    padding-top: 2%;
`;

// Centers content and limits max width
const Container = styled.div`
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
`;

// For coin logo, name and symbol.
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2%;
    margin-bottom: 2%;
`;

//Coin logo styling
const CoinImage = styled.img`
    border-radius: 50%;
    width: 7vw;
    height: 7vw;
    max-width: 60px;
    max-height: 60px;
`;

const CoinTitle = styled.h2.withConfig({
    shouldForwardProp: (prop) => prop !== "isDarkMode", //Prevents passing isDarkMode to DOM
})<{ isDarkMode: boolean }>`
    background-color: #1ce783;
    color: black;
    padding: 1% 3%;
    border-radius: 2%;
    font-weight: bold;
    font-size: 2.5vw;
`;

//Styling the main chart
const ChartBox = styled.div`
    background-color: white;
    border-radius: 4%;
    padding: 2%;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    margin-top: 2%;
`;

const PriceInfo = styled.div`
    margin-top: 1.5%;
    font-size: 2vw;
    color: white;
    display: flex;
    justify-content: center;
    gap: 5%;
`;

const Price = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== "isDarkMode",
})<{ isDarkMode: boolean }>`
    font-size: 2.2vw;
    font-weight: bold;
    color: ${(props) => (props.isDarkMode ? "white" : "black")};
`;

const PriceChange = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isPositive'
})<{ isPositive: boolean }>`
    color: ${(props) => (props.isPositive ? "limegreen" : "tomato")};
    font-weight: bold;
    font-size: 2vw;
`;

//
const ExtraStatsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2%;
    margin-top: 2%;
    width: 100%;
    flex-wrap: wrap;
`;

// Styling for bottom 3 extra stats
const StatBox = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    background-color: ${(props) => (props.isDarkMode ? "#1c1c1c" : "#fff")};
    color: ${(props) => (props.isDarkMode ? "white" : "black")};
    flex: 1 1 30%;
    padding: 1.5% 2%;
    border-radius: 10px;
    text-align: center;
    font-size: 1.5vw;
    font-weight: 500;
`;

export default function Tckr({ coin }: { coin: TckrProps }) {
    const { isDarkMode } = useTheme();  //Retrieve darkmode toggle
    const [chartData, setChartData] = useState<ChartData<'line'> | null>(null); //Empty chartData initliazed

    useEffect(() => {
        async function fetchData() {
            try {
                incrementApiCall("graph");
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=365`
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                } //Error message when api rate hits a limit.

                const data = await res.json();

                if (!data.prices) {
                    console.error("Unexpected API response (missing 'prices'):", data);
                    return;
                } //Error message when data retrieval fails.

                const prices = data.prices;

                setChartData({ //Creating Chart, using api data.
                    labels: prices.map((p: [number, number]) =>
                        new Date(p[0]).toLocaleDateString()
                    ),
                    datasets: [
                        {
                            label: `${coin.name} Price (USD)`,
                            data: prices.map((p: [number, number]) => p[1]),
                            fill: false,
                            borderColor: "rgba(75,192,192,1)",
                            tension: 0.1,
                        },
                    ],
                });

            } catch (err) { // Handle any fetch or logic errors
                console.error("Failed to fetch data:", err);
            }
        }

        fetchData();
    }, [coin.id, coin.name]); //Uses coinid and coin name to determine if the coin has been changed. If yes, rerender. If not render only once.

    //Shows loading instead of blank screen
    if (!chartData) return <Loading />;

    return (
        <PageWrapper isDarkMode={isDarkMode}>
            <Container>
                <Header> {/* Coin title and logo */}
                    <CoinImage src={coin.image} alt={`${coin.name} logo`} />
                    <CoinTitle isDarkMode={isDarkMode}>
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </CoinTitle>
                </Header>

                {/* Current price and 24h change */}
                <PriceInfo>
                    <Price isDarkMode={isDarkMode}>
                        Current Price: ${coin.current_price.toFixed(2)}
                    </Price>
                    <PriceChange isPositive={coin.price_change_24h >= 0}>
                        24h Change: ${coin.price_change_24h.toFixed(2)}
                    </PriceChange>
                </PriceInfo>

                {/*The Graph*/}
                <ChartBox>
                    <Line data={chartData} />
                </ChartBox>

                {/* Extra stats Stats Section */}
                <ExtraStatsWrapper>
                    <StatBox isDarkMode={isDarkMode}>
                        Market Cap<br />${coin.market_cap.toLocaleString()}
                    </StatBox>
                    <StatBox isDarkMode={isDarkMode}>
                        24h High<br />${coin.high_24h.toFixed(2)}
                    </StatBox>
                    <StatBox isDarkMode={isDarkMode}>
                        24h Low<br />${coin.low_24h.toFixed(2)}
                    </StatBox>
                </ExtraStatsWrapper>
            </Container>
        </PageWrapper>
    );
}
