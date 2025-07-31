"use server"
import HomeDisplay from '@/components/HomeDisplay'
import {TckrProps} from "@/types";
import GetHomeTckr from '@/lib/getHomeTckr'
import GetTopGainers from '@/lib/getTopGainer'
import GetScrollBar from '@/lib/getScrollBar'

export default async function HomePage() {
    const data: TckrProps[]| undefined = await GetHomeTckr();
    const top: TckrProps[] = await GetTopGainers();
    const scroll: TckrProps[] | undefined = await GetScrollBar();
    if (!data ) return <p>Failed to load coin data.</p>;
    if(!top) return <p>Failed to load top gainers.</p>
    if(!scroll) return <p>Failed to load scroll bar.</p>
    console.log(
        {data},
        {top},
        {scroll}
    )
    return(
        <HomeDisplay TckrData ={data} topGainer = {top} scrollBar={scroll}/>
    )
}