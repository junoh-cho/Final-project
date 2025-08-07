/*
    This component functions as a simple display 
    for while the chart data is loading.
    
    Written by Junoh Cho
 */

"use client";

import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* full screen height */
    background-color: #000;
`;

const Text = styled.div`
    color: #fff;
    font-size: 3vw;
`;

export default function Loading() {
    return (
        <Wrapper>
            <Text>Loading...</Text>
        </Wrapper>
    );
}
