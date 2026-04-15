import React, { createContext, useState, useEffect } from 'react';
import service from './services/api.js';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [photosBaseUrl, setPhotosBaseUrl] = useState('');

    useEffect(() => {
        const fetchBaseUrl = async () => {
            try {
                const url = await service.getPhotosBaseUrl();
                setPhotosBaseUrl(url);
            } catch (error) {
                console.error("Failed to fetch photos base URL", error);
            }
        };
        fetchBaseUrl();
    }, []);

    return (
        <AppContext.Provider value={{ photosBaseUrl }}>
            {children}
        </AppContext.Provider>
    );
};
