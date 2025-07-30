"use client"
import {TckrProps} from "@/types";
import styled from 'styled-components'
import Link from 'next/link'

const StyledWrapper = styled.div`
    background-color: lightsteelblue;
    height: 100vh;
`
const CoinButton = styled.div`
    border: 1px solid black;
    width: 30vw;
    margin: 10px;
    background-color: lavender;
    display: inline-flex;
    padding: 10px;
    
    
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


export default function HomeDisplay({TckrData}: {TckrData: TckrProps[]}) {

    return(
        <StyledWrapper>
            <p> Top 5 Coins</p>
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

                            ({coin.price_change_percentage_24h.toFixed(2)}%)

                        </p>

                    </StyledDiv3>
                    <StyledP> Market Cap Rank: {coin.market_cap_rank}</StyledP>

                </CoinButton>
                </Link>

            ))}
        </StyledWrapper>
    );
}