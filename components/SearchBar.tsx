'use client';
import { useState } from "react";
import Link from "next/link";
import styled from 'styled-components'

const StyledDiv = styled.div`
      background-color: lightsteelblue;
    
    padding: 10px;
      
`
const StyledInput = styled.input`
      border: 1px solid black;
        width: 30vw;
    align-self: center;
    background-color: lightgrey;
    text-align: center;
    margin: 10px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
`
const StyledLink = styled(Link) `
    background-color: lightblue;
    width: 20vw;
    align-self: center;
    margin: 10px;
    border: 1px solid black;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
`
const StyledDiv2 = styled.div`
    border: 2px solid steelblue;
    height: 30vh;
    text-align: center;
    padding: 10px;
    font-size: calc(10px + 3vh);
    display: flex;
    flex-direction: column;
    width: 40vw;
    background-color: cadetblue;
    margin: 0 auto;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    
`

export default function SearchBar() {
    const [tckr, setTckr] = useState("");

    return (
        <StyledDiv>
            <StyledDiv2>
                <p> Search by Ticker</p>
                <label htmlFor="TCKR"></label>
                <StyledInput
                    type="text"
                    id="TCKR"
                    placeholder="e.g., btc"
                    onChange={(e) => setTckr(e.target.value)}
                />
                <StyledLink href={`/${tckr}`}>Enter</StyledLink>
            </StyledDiv2>
        </StyledDiv>
    );
}