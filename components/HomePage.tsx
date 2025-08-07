/*
    This Component serves as a retrievel of three of the API calls for the Home Page 
    Then it passes it to Home display 
    Home display will style it
    
    Written by Owen Lennox
 */

"use server"
import HomeDisplay from '@/components/HomeDisplay'
import {TckrProps} from "@/types";
import GetHomeTckr from '@/lib/getHomeTckr'
import GetTopGainers from '@/lib/getTopGainer'
import GetScrollBar from '@/lib/getScrollBar'

export default async function HomePage() {
        //try to retrieve data, if it doenst work, error message pips up
        try {
            const data: TckrProps[] | undefined = await GetHomeTckr();
            const top: TckrProps[] = await GetTopGainers();
            const scroll: TckrProps[] | undefined = await GetScrollBar();

            if (!data) return <p>Failed to load coin data.</p>;
            if (!top) return <p>Failed to load top gainers.</p>;
            if (!scroll) return <p>Failed to load scroll bar.</p>;
            //pass to Home display
            return (
                <HomeDisplay
                    TckrData={data}
                    topGainer={top}
                    scrollBar={scroll}
                />
            );
        } catch (error) {
            console.error("Error loading homepage data:", error);
            return <p>Something went wrong while loading the page.</p>;
        }
    }