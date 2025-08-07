/*
    This is the construction of our hompage
    Global styling for the home page by tailwind is used in the div

    Written By Owen Lennox
 */


import HomePage from '@/components/HomePage'
import SearchBar from '@/components/SearchBar'


export default function Home() {
  return (
    <div className = "text-center h-screen font-sans ">

        <SearchBar/> {/* adds search bar */}

        <HomePage/> {/* adds crypto info */}
    </div>
  );
}
