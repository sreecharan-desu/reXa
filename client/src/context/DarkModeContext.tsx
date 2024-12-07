import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return JSON.parse(saved);
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (localStorage.getItem('darkMode') === null) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        const html = document.documentElement;
        
        // Add transitioning class
        html.classList.add('transitioning');
        
        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        // Remove transitioning class after transition completes
        const timeout = setTimeout(() => {
            html.classList.remove('transitioning');
        }, 300);

        return () => clearTimeout(timeout);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}; 