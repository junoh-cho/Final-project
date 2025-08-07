"use client";

import styled from "styled-components";
import { useTheme } from "@/app/context/useTheme";

const AboutContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isDarkMode",
})<{ isDarkMode: boolean }>`
    padding: 8% 5%;
    color: ${(props) => (props.isDarkMode ? "white" : "black")};
    background-color: ${(props) => (props.isDarkMode ? "#121212" : "#f4f4f4")};
    min-height: 100vh;
`;

const Title = styled.h1`
    font-size: 5vw;
    font-weight: bold;
    margin-bottom: 4%;
`;

const Paragraph = styled.p`
    font-size: 2.2vw;
    line-height: 1.6;
    margin-bottom: 3%;
    width: 90%;
    max-width: 100%;
`;
export default function AboutPage() {
    const { isDarkMode } = useTheme();

    return (
        <AboutContainer isDarkMode={isDarkMode}>
            <Title>About Us</Title>
            <Paragraph>
                <strong>Crypto Tracker</strong> is a cryptocurrency tracker that lets you visualize live price data and performance of various coins in real-time.
                Whether you are a casual investor or an experienced trader, this tool gives you clean charts, helpful stats, and a sleek interface.
            </Paragraph>
            <Paragraph>
                This project uses the CoinGecko API and is built with Next.js.
            </Paragraph>
            <Paragraph>
                Developed by Owen Lennox and Junoh Cho
            </Paragraph>
        </AboutContainer>
    );
}

