"use client"
import {TckrProps} from "@/types";
import styled from 'styled-components'


const StyledDiv = styled.div`
    border: 1px solid black;
    width: 30vw;
    margin: 10px;
    background-color: lavender;
    display: inline-flex;
    
    
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

export default function HomeDisplay({TckrData}: {TckrData: TckrProps[]}) {

    return(
        <div>
            <p> Top 5 Coins</p>
            {TckrData.map((coin, index) => (
                <StyledDiv key = {index}>
                    <StyledDiv2>
                    <p> {coin.name} ({coin.symbol})</p>

                    <StyledImg src = {coin.image} alt = {coin.name}/>
                    </StyledDiv2>
                    <p> {coin.current_price}</p>
                    <p>
                        {coin.price_change_24h}
                        <Triangle $isUp={coin.price_change_24h > 0}>
                            {coin.price_change_24h > 0 ? "▲" : "▼"}
                        </Triangle>
                    </p>

                </StyledDiv>

            ))}
        </div>
    );
}