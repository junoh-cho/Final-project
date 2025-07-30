"use server"
import HomeDisplay from '@/components/HomeDisplay'
import {TckrProps} from "@/types";
import GetHomeTckr from '@/lib/GetHomeTckr'
import GetTopGainers from '@/lib/GetTopGainer'

export default async function HomePage() {
    const data: TckrProps[]| undefined = await GetHomeTckr();
    const top: TckrProps[] = await GetTopGainers();
    if (!data) return <p>Failed to load coin data.</p>;
    return(
        <HomeDisplay TckrData ={data} topGainer = {top}/>
    )
}