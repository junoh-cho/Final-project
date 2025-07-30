'use client';
import { useState } from "react";
import Link from "next/link";
import styled from 'styled-components'

const StyledDiv = styled.div`
      background-color: lightsteelblue;
    height: 30vh;
      text-align: center;
        padding: 10px;
      font-size: calc(10px + 3vh);
        display: flex;
    flex-direction: column;
`
const StyledInput = styled.input`
      border: 1px solid black;
        width: 30vw;
    align-self: center;
    background-color: lightgrey;
    text-align: center;
`
const StyledLink = styled(Link) `
    background-color: lightblue;
    width: 30vw;
    align-self: center;
    margin: 10px;
    border: 1px solid black;
`

export default function SearchBar() {
    const [tckr, setTckr] = useState("");

    return (
        <StyledDiv>
            <p> Search by Ticker</p>
            <label htmlFor="TCKR"></label>
            <StyledInput
                type="text"
                id="TCKR"
                placeholder="e.g., btc"
                onChange={(e) => setTckr(e.target.value)}
            />
            <StyledLink href={`/${tckr}`}>Enter</StyledLink>
        </StyledDiv>
    );
}