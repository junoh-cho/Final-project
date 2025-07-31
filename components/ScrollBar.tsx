import {TckrProps} from "@/types";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

const scroll = keyframes`
  0% { transform: translateX(20%); } // At the start shift all the content 20% to the right, fills in blank space
    // this next line states that we want to end with 100% of content 
    // we transform it to -100% so it is completely shifted off the screen
  100% { transform: translateX(-100%); }
`;

const TickerWrapper = styled.div`
  width: 100vw;
  overflow: hidden; // removes all content outside of the width of the wrapper
  background-color: #dbeafe;
  position: fixed;
  bottom: 0;
  padding: 0.5rem 0;
  border-top: 2px solid #333;
  
`;

const TickerContent = styled.div`
  display: inline-block;
  white-space: nowrap; // coins always stay in a single line stops content from breaking into rows
  animation: ${scroll} 250s linear infinite; //each scroll will take 250 seconds to complete, and it scrolls infinitely 
  font-weight: bold;
  font-size: 1rem;
`;
const StyledSpan = styled.span`
    margin-right: 2rem;
    padding-right: 1rem;
    border-right: 2px solid black;
    display: inline-block;
`;
const StyledLink = styled(Link)`
    
   
    
`

const Triangle = styled.span<{ $isUp: boolean }>`
  color: ${({ $isUp }) => ($isUp ? "green" : "red")};
  margin-left: 5px;
`;

export default function ScrollBar({ scrollBar }: { scrollBar: TckrProps[] }) {
    return(

        <TickerWrapper>
            <TickerContent>
                {scrollBar.map((coin, idx) => (
                    <StyledLink href={`/${coin.symbol}`} passHref key={idx}>
                        <StyledSpan>
                            {coin.name}: {coin.current_price}$
                            <Triangle $isUp={coin.price_change_24h > 0}>
                            {coin.price_change_24h > 0 ? "▲" : "▼"}
                                {coin.price_change_24h}$
                        </Triangle>
                        </StyledSpan>
                    </StyledLink>
                ))}
            </TickerContent>
        </TickerWrapper>
    )

}