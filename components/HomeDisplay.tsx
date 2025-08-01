"use client"
import {TckrProps} from "@/types";
import styled from 'styled-components'
import Link from 'next/link'
import ScrollBar from '@/components/ScrollBar'
import ChartRetrieve from "@/components/ChartRetrieve";

const StyledWrapper = styled.div`
    background-color: lightsteelblue;
    height: 100vh;
    
`
const StyledP22 = styled.p`
    font-size: calc(10px + 3vh);
`
const CoinButton = styled.div`
    border: 1px solid black;
    width: 30vw;
    margin: 10px;
    background-color: lavender;
    display: inline-flex;
    padding: 10px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    
    
    
`
const StyledImg = styled.img`
    width: 2vw;
    margin-left : 1vw;
`
const StyledDiv2 = styled.div`
    display: flex;
   align-self: center;
    justify-content: center;
    
    
    
`
const Triangle = styled.span<{ $isUp: boolean }>`
  color: ${({ $isUp }) => ($isUp ? "green" : "red")};
  margin-left: 5px;
`;

const StyledDiv3 = styled.div`
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
    
    width: 30vw;
    margin: 10px;
    
    display: inline-flex;
    padding: 10px;
    justify-content: center;
`
const StyledDiv4 = styled.div`
   display: flex;
`

export default function HomeDisplay({TckrData, topGainer, scrollBar}: {
    TckrData: TckrProps[];
    topGainer: TckrProps[];
    scrollBar: TckrProps[];
}) {

    return(
        <StyledWrapper>
            <ScrollBar scrollBar={scrollBar}/>
            <StyledP22> Top 5 Coins </StyledP22>
            {TckrData.map((coin, index) => (
                <Link href={`/${coin.symbol}`} passHref key={index}>
                <CoinButton key = {index} >
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
                    <ChartRetrieve Name={coin.id}/>
                </CoinButton>

                </Link>

            ))}

            <StyledP22>Top 3 Performers</StyledP22>
            <StyledTop>
                {topGainer.map((coin, index) => (
                    <Link href={`/${coin.symbol}`} passHref key={index}>
                        <CoinButton>

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
                        <ChartRetrieve Name={coin.id}/>
                    </Link>
                ))}
            </StyledTop>
        </StyledWrapper>
    );
}