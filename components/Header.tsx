"use client"
import styled from 'styled-components'
import Link from 'next/link'

const colors = {
      background: "steelblue",
      text: "white",
      accent: "#FFD700", // example: gold
};

const StyledDiv = styled.div`
      background-color: ${colors.background};
      color: ${colors.text};
      text-align: center;
      padding: 10px;
      font-size: calc(10px + 3vh);
`

export default function Header() {
      return(
          <StyledDiv>
            <Link href = "/"> Crypto Finder </Link>
          </StyledDiv>
      )

}