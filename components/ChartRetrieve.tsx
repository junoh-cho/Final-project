"use client"
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
} from "chart.js";
import getChart from "@/lib/getChart";
type Props = {
    Name: string;
};
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);
export default function ChartRetrieve({Name} : Props) {
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getChart(Name);
            setChartData(data);
        }
        fetchData();
    }, [Name]);

    if (chartData.length === 0) return <p>Loading chart...</p>;
    const data = {
        labels: chartData.map((_, i) => i), // simple x-axis labels: 0,1,2...
        datasets: [
            {
                label: "Price",
                data: chartData,
                borderColor: "green",
                borderWidth: 1,
                tension: 0.5,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        scales: {
            x: { display: true },
            y: { display: true },
        },
    };

    return (
        <div >
            <Line data={data} options={options} />
        </div>
    );
}


