/* This is used to retrieve the News, The Api 
*  was not working by itself so I used an App directory in app 
* and fetch the data from there
*
*
* Written by Owen Lennox
* */

export default async function getNews() {
    try {
        const res = await fetch('/api/news'); // CORS-safe
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Failed ", err);
        return [];
    }
}



