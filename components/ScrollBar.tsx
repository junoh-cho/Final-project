/*
    For this Portion, I utilize key frames. I create a keyrame animation through styled-components-
    The first step in key frames is defining our animation, with start  points and end points
    as seen in const scroll
    We design the scroll so that we have a sliding motion
    Nextly I specify that I want the 50 Tckrs to come out at a rate such that it takes 250s to display them all
    In the function, I map out over the array in a ,map
    https://blog.pixelfreestudio.com/how-to-use-keyframe-animation-in-react-applications/

    each element is displayed as a link that when clicked, directs you to the tckr page

    Written By Owen Lennox

* */

import {TckrProps} from "@/types";
import styled, { keyframes } from "styled-components";
import Link from "next/link";


const scroll = keyframes`
  0% { transform: translateX(15%); 
  } // At the start (0%) shift the elements by 20% of its width  
    //this is because if we start at 0% the entire bar will be filled up, slightly overweliming
    //this means we move them to the right by 20%
  100% { transform: translateX(-100%); }
    // The end of the animination is when all possibe tckrs are off the screen
`;

const TickerWrapper = styled.div`
  width: 100vw;
  overflow: hidden; // removes all content outside of the width of the wrapper
  background-color: #1ce783;
  position: fixed; //fixed to the bottom of the screen
  bottom: 0;
  padding: 1vh 0;
  border-top: 2px solid #333;
  
`;

const TickerContent = styled.div`
  display: inline-block;
  white-space: nowrap; // coins always stay in a single line stops content from breaking into rows
  animation: ${scroll} 250s linear infinite; //each scroll will take 250 seconds to complete, and it scrolls infinitely 
  font-weight: bold;font-size: calc(10px + 1vh);
    @media screen and (max-width: 768px) {
        font-size: calc(5px + 1vh);
    }
`;
const StyledSpan = styled.span`
    margin-right: 2vw;
    padding-right: 1vw;
    border-right: 2px solid black; //add border between each coin, on right
    display: inline-block;
`;
const StyledLink = styled(Link)`
    
   
    
`

const Triangle = styled.span<{ $isUp: boolean }>`
  color: ${({ $isUp }) => ($isUp ? "green" : "red")};
  margin-left: 1vw;
`;

export default function ScrollBar({ scrollBar }: { scrollBar: TckrProps[] }) {

    return(

        <TickerWrapper>
            <TickerContent>
                {scrollBar.map((coin, idx) => (
                    <StyledLink href={`/${coin.symbol}`} key={idx}> {/* every element has a pressable linl*/}
                        <StyledSpan>
                            {coin.name}: {coin.current_price}$ {/*  display name and other important data*/}
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