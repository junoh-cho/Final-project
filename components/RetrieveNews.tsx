/* 
This components retrieve news data 
and displays it at the bottom


Written By Owen Lennox
 */

'use client';

import { useEffect, useState } from 'react';
import getNews from '../lib/getNews';

import {NewsProps } from '@/types'
import styled from 'styled-components'
import {decode} from 'html-entities'

const StyledUL = styled.ul`
    list-style: none;
    display: flex;
    
    list-style: none;
    padding: 0;
    margin: 0 auto ;
    gap: 1rem;
    justify-content: center;
    font-size: calc(5px + 1vh);
    
`
const StyledLI = styled.li`
    width: 30vw;
    height: 30vh;
    overflow: auto;
    border: 3px lightgreen;
    padding: 1vw;
    background-color: lavender;
    @media screen and (max-width: 768px) {
        font-size: calc(5px + 1vh);
        height: 20vh;
}
   
    
    
`
const StyledH3 = styled.h3`
    margin-bottm: 1vh;
    font-size: calc(5px + 2vh);
    font-weight: bold;
`



export default function RetrieveNews() {
    const [newsArr, setNewsArr] = useState<NewsProps[]>([]); // Should be ann array of NewsProps

    useEffect(() => {
        async function fetchNews() {
            try {
                const news = await getNews();
                console.log("no fail", news);
                setNewsArr(news);
            } catch (err) {
                console.error("fail", err);
            }
        }

        fetchNews();
    }, []);

  
    if (!newsArr) return <p>Loading news...</p>;

    return (
        Array.isArray(newsArr) && newsArr.length > 0 ? (
            <StyledUL> {/* This will return the title and description*/}
                {newsArr.slice(0, 3).map((item, index) => (
                    <StyledLI key={index}>
                        <StyledH3>{item.title}</StyledH3>
                        <p>{decode(item.description)}</p>
                    </StyledLI>
                ))}
            </StyledUL>
        ) : (
            <p>No news available</p>
        )
    );

}