/*
    This component holds the search bar,
    This lets us search a ticker, and redirects us to
    a link /{tckr}

    To do this I create An input for the user
    Then, They can type the tckr and press enter,
    which is a link, that will take it to an information page
    about the tckr

    Written by Owen Lennox
 */

'use client';
import { useState } from "react";
import Link from "next/link";
import styled from 'styled-components'
import { useTheme } from '@/app/context/useTheme';
const StyledDiv = styled.div<{$dark : boolean}>`
    background-color: ${({ $dark }) => ($dark ? '#121212' : '#f9f9f9')};
    border-top: 2px solid green;
    border-bottom: 2px solid green;
    padding: 10px;
    font-family: sans-serif "Times New Roman" "Arial Hebrew Scholar" ;
      
`
const StyledInput = styled.input`
      border: 1px solid black;
        width: 30vw;
    align-self: center;
    background-color: lavender;
    text-align: center;
    margin: 10px;
  
`
const StyledLink = styled(Link) `
    background-color: lightblue;
    width: 20vw;
    align-self: center;
    margin: 10px;
    border: 1px solid black;
    
`
const StyledDiv2 = styled.div`
    border: 2px solid forestgreen;
    height: 30vh;
    text-align: center;
    padding: 10px;
    font-size: calc(10px + 3vh);
    display: flex;
    flex-direction: column;
    width: 40vw;
    background-color: mediumseagreen;
    margin: 0 auto;
    overflow: auto;
`

export default function SearchBar() {
    const [tckr, setTckr] = useState(""); //keep track of the tckr
    const { isDarkMode } = useTheme(); // use context
    return (
        <StyledDiv $dark={isDarkMode}> {/* style in light or dark*/}

            <StyledDiv2>

                <label htmlFor="TCKR">Search by ticker</label>
                <StyledInput
                    type="text"
                    id="TCKR"
                    placeholder="e.g., btc"
                    onChange={(e) => setTckr(e.target.value)}
                /> {/* this will hold the tckr input */}
                
                <StyledLink href={`/${tckr}`}>Enter</StyledLink> {/* This Redirects us to the tckr page when clicked*/}
            </StyledDiv2>
        </StyledDiv>
    );
}