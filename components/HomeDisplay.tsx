/*
    In this component, I style Three set of data and lay out the foundation for the home page
    First we use Tckr which is passed in by Home page, This holds a TckrProps Array with the top 5 Crypto Currencies.
    We go through this array by a map and wrap every element in a link, so we can click on it and direct us to the tckrs page
    The same Steps are followed for the TopGainers Array, this hold a TckrProps array of the top 3 performing currencies of the day
    At the top of the code, There is a call to <ScrollBar> which adds a slow moving bar to the bottom of the screen.
    A call to Retrieve News adds top stores to the bottom of the page
 
 
    Written By Owen Lennox
 */

"use client"
import {TckrProps} from "@/types";
import styled from 'styled-components'
import Link from 'next/link'
import ScrollBar from '@/components/ScrollBar'
import {Suspense} from "react";
import RetrieveNews from "@/components/RetrieveNews";
import { useTheme } from '@/app/context/useTheme';

const StyledWrapper = styled.div<{ $dark: boolean }>`
    
    // We check the background color
    background-color: ${({ $dark }) => ($dark ? '#121212' : '#f9f9f9')};
    height: 100vh;
    
    font-size: calc(5px + 1vh);
    padding:1vh;
    font-family: sans-serif "Times New Roman" "Arial Hebrew Scholar" ;
`

const StyledP22 = styled.p`
    //style the header for our subdivisions 
    font-size: calc(10px + 2vh);
    color: black;
    background-color: #00e676;
    width: 25vw;
    margin: 1vh auto;
    // we round the corners of the box
    box-shadow: 0 0 15px rgba(28, 231, 131, 0.3);
    border-radius: 12px;
`
const CoinButton = styled.div`
    
    // style each coin button
    border: 3px ;
    width: 30vw;
    margin: 1vh;
    background-color: lavender;
    display: inline-flex; //line them side by side
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 12px rgba(28, 231, 131, 0.4);
    @media screen and (max-width: 768px) {
        width: 30vw;
        height: 10vh;
        font-size: calc(2px + 1vh);
        
    }
   
    
    
`
const StyledImg = styled.img`
    width: 2vw;
    margin-left : 1vw;
`
const StyledDiv2 = styled.div`
    //have the name and image appear side by side
    display: flex;
   align-self: center;
    justify-content: center;
    
    
    
`
const Triangle = styled.span<{ $isUp: boolean }>`
    // triange is green if up, red if down
    color: ${({ $isUp }) => ($isUp ? "green" : "red")};
  margin-left: 5px;
`;

const StyledDiv3 = styled.div`
    //have price and price change apear in col form 
    display: flex;
    flex-direction: column;
    margin-left: 1vw;
`
const StyledP = styled.p`
    margin-left: 1vw;
    justify-content: center;
    align-self: center;
`
const StyledTop = styled.div`
    

    
    display: inline-flex;
   
    justify-content: center;
`
const StyledDiv4 = styled.div`
   width:10vw;
`

export default function HomeDisplay({TckrData, topGainer, scrollBar}: {
    TckrData: TckrProps[];
    topGainer: TckrProps[];
    scrollBar: TckrProps[];
}) {
    const { isDarkMode } = useTheme();
    return(
        <StyledWrapper $dark={isDarkMode}>
            <Suspense fallback={<p>Loading...</p>}> {/* Retrieve ScrollBar*/}
                <ScrollBar scrollBar={scrollBar}/>
            </Suspense>
            <StyledP22> Top 5 Coins </StyledP22>
            {TckrData.map((coin, index) => ( // map over the top 5 coins 
                <Link href={`/${coin.symbol}`}  key={index}> {/* make the coin clickable*/}
                <CoinButton key = {index} > {/* each coin appears with name, symbol, img, price change */}
                    <StyledDiv2>
                    <p> {coin.name} ({coin.symbol})</p>

                    <StyledImg src = {coin.image} alt = {coin.name}/>
                    </StyledDiv2>
                    <StyledDiv3>
                        <p> {coin.current_price}$
                            <Triangle $isUp={coin.price_change_24h > 0}>
                                {coin.price_change_24h > 0 ? "▲" : "▼"}
                            </Triangle>
                        </p>

                        <p>

                            ({coin.price_change_24h.toFixed(2)}$)

                        </p>

                    </StyledDiv3>
                    <StyledP> Market Cap Rank: {coin.market_cap_rank}</StyledP>

                </CoinButton>

                </Link>

            ))}

            <StyledP22>Top 3 Performers</StyledP22>
            <StyledTop>
                {topGainer.map((coin, index) => ( // map ober the top gaimers
                    <Link href={`/${coin.symbol}`}  key={index}> {/* make the coin clickable */}
                        <CoinButton> {/* add image, name symbol, and price  change to the button*/}

                                <StyledDiv2>
                                    <p>{coin.name} ({coin.symbol})</p>
                                    <StyledImg src={coin.image} alt={coin.name} />
                                </StyledDiv2>
                                <StyledDiv3>
                                    <p>
                                        {coin.current_price}$
                                        <Triangle $isUp={coin.price_change_percentage_24h > 0}>
                                            {coin.price_change_percentage_24h > 0 ? "▲" : "▼"}
                                        </Triangle>
                                    </p>
                                    <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                                </StyledDiv3>
                                    <StyledP>Market Cap Rank: {coin.market_cap_rank}</StyledP>



                        </CoinButton>

                    </Link>
                ))}
            </StyledTop>
            <StyledP22>Top Crypto News</StyledP22>
            <Suspense fallback={<p>Loading...</p>}>
                 <RetrieveNews/> {/* retrieve the news*/}
            </Suspense>
        </StyledWrapper>
    );
}