import { useMemo, useState } from 'react';
import { clearAuthToken, getAuthToken, setAuthToken } from '../Services/api';
import { MyContext } from './context';

// App-wide provider for auth state and helpers.
export function MyContextProvider({ children }) {
    const [token, setToken] = useState(getAuthToken());

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
        logout
    }), [token]);

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
