import {Suspense} from "react"
import Tckr from '@/components/Tckr'

export default async function TckrPage({params, } : {params: Promise<{tckr:string}>}) {
    const tckr = decodeURIComponent((await params).tckr)

    return(
        <Suspense fallback = {<p>loading..</p>}>
            <Tckr/>
        </Suspense>

    )
}