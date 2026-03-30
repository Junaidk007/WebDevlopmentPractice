import { useEffect, useMemo, useState } from 'react';
import { clearAuthToken, getAuthToken, setAuthToken } from '../Services/api';
import { MyContext } from './context';

// App-wide provider for auth state and helpers.
export function MyContextProvider({ children }) {
    const [token, setToken] = useState(getAuthToken());
    
    // Initialize theme from localStorage or default to system preference, fallback to light.
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('taskflow-theme');
        if (storedTheme) return storedTheme;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    });

    // Sync theme to DOM and localStorage on change
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('taskflow-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const login = (nextToken) => {
        setAuthToken(nextToken);
        setToken(nextToken);
    };

    const logout = () => {
        clearAuthToken();
        setToken(null);
    };

    const value = useMemo(() => ({
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
        theme,
        toggleTheme
    }), [token, theme]);

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
