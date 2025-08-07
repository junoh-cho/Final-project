/*
     THis file uses react context to provide a blobal them
     Uses an isDarkMode use state to keep track
     of wether its enabled
     If the Moon/sun is clicked toggle theme will switch the state.
     We use this ThemeProvider to wrap all of our components
 */


'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};
// React context object used purely by other components
// It will either be of Type Theme context or undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) // Theme Provider accepts any valid jsx component
 {
    const [isDarkMode, setIsDarkMode] = useState(true); // holds weither dark mode is enabled, true by default

    const toggleTheme = () => setIsDarkMode((prev) => !prev); //change theme on click

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}> {/* passes the isDarkMde to all descendants
        acssesible by useContext(ThemeContext)*/}
            {children}
        </ThemeContext.Provider>
    );
}

