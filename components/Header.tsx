/*
    This component is static , and will appear on every page
    The title (Crpto tracker is made as a link to Home when clicked)
    We add a citation to COINKGEKKO for the API USE
    We also have a static link to the about page

    Written By Owen Lennox
 */


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
    const { isDarkMode, toggleTheme } = useTheme(); // toggle the theme
    return(
        <StyledDiv>
            <Link href = "/"> Crypto Tracker </Link> {/* Link back to home page */}
            <button onClick={toggleTheme}> {/* If isDarkmode is true the moon will be the button, else it is the sun */}
                {isDarkMode ? "🌙" : "\u2600"}
            </button>
            <div>
                <StyledLink href = "https://www.coingecko.com" > {/* links to coin Gekko and About Page */}
                    Powered by CoinGecko API
                </StyledLink>
                <StyledLink href = '/about'> About Page</StyledLink>
            </div>
        </StyledDiv>
    )

}