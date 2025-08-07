"use client"
import styled from 'styled-components'
import Link from 'next/link'
import {useState} from "react"
import { useTheme } from '@/app/context/useTheme';

const StyledDiv = styled.div`
    background-color: #1ce783;
    padding-bottom: 2vh;
    box-shadow: 0 4px 10px rgba(28, 231, 131, 0.2);
    border-bottom: 1px solid #1ce783;
    text-align: center;
    padding: 10px;
    font-size: calc(10px + 3vh);
    box-shadow: 0 0 10px lightgreen;
    font-weight: 650;


`
const StyledLink = styled(Link) `

    font-size: calc(5px + 1vh);
    text-align: flex-end;
    color: cornflowerblue;
    font-weight: bold;
    display: block;

`
const StyledLink2 = styled(Link) `

    font-size: calc(5px + 2vh);
    color: black;
    font-weight: bold;
    margin-left: 1vw;
    
    
    
`

export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme(); // ✅ this is correct
    return(
        <StyledDiv>
            <Link href = "/"> Crypto Tracker </Link>
            <button onClick={toggleTheme}>
                {isDarkMode ? "🌙" : "\u2600"}
            </button>
            <div>
                <StyledLink href = "https://www.coingecko.com" >
                    Powered by CoinGecko API
                </StyledLink>
                <StyledLink href = '/about'> About Page</StyledLink>
            </div>
        </StyledDiv>
    )

}