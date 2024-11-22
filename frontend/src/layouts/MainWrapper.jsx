import { useEffect, useState, createContext } from 'react';
import { setUser } from '../utils/auth';

export const MainContext = createContext(null);

export const MainWrapper = ({ children }) => {
    useEffect(() => {
        const handler = async () => {
            await setUser();
        };
        handler();
    }, []);

    return <MainContext.Provider value={true}>{children}</MainContext.Provider>;
};
