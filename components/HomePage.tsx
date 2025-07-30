"use server"
import HomeDisplay from '@/components/HomeDisplay'
import {TckrProps} from "@/types";
import GetHomeTckr from '@/lib/GetHomeTckr'


export default async function HomePage() {
    const data: TckrProps[]| undefined = await GetHomeTckr();
    if (!data) return <p>Failed to load coin data.</p>;
    return(
        <HomeDisplay TckrData ={data}/>
    )
}