import { createContext, useContext } from 'react';

// Shared auth context object used by provider and consumers.
export const MyContext = createContext(null);

export const useMyContext = () => {
    const context = useContext(MyContext);

    if (!context) {
        throw new Error('useMyContext must be used inside MyContextProvider');
    }

    return context;
};
