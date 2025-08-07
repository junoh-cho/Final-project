/*
    This fuction is used to reduce code verbosity
    rather then calling useContext(ThemeProvider) in every component
    we can just use use Theme

    Written By Owen Lennox
 */

import { useContext } from 'react';
import {ThemeContext} from './ThemeContext';

export function useTheme() {
    const context = useContext(ThemeContext); //get the context value
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context; //true or false, dark or light
}