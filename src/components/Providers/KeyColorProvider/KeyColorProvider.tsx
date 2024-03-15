"use client";

import { ComponentProps, createContext, useContext, useState } from 'react';

// Define the type for the context state
interface KeyColorContextType {
    keyColorIsLocked: boolean;
    toggleKeyColorLock: (newValue?: boolean) => void;
    // keyColorGenerated: number;
    // setKeyColorGenerated: (value: number) => void;
}

// Create the context
const KeyColorContext = createContext<KeyColorContextType | undefined>(undefined);

// Create the context provider component
export default function KeyColorProvider({ children }: ComponentProps<'div'>) {
    const [keyColorIsLocked, setKeyColorIsLocked] = useState(false);
    // const [keyColorGenerated, setKeyColorGenerated] = useState(-1);

    // Function to toggle the lock state
    const toggleKeyColorLock = (newValue?: boolean) => {
        if (newValue !== undefined) {
            setKeyColorIsLocked(newValue);
        } else {
            setKeyColorIsLocked(currentValue => !currentValue);
        }
    };

    // Provide the context value
    const contextValue: KeyColorContextType = {
        keyColorIsLocked,
        toggleKeyColorLock,
        // keyColorGenerated,
        // setKeyColorGenerated,
    };

    return <KeyColorContext.Provider value={contextValue}>{children}</KeyColorContext.Provider>;
};

// Custom hook to consume the context
export const useKeyColorContext = () => {
    const context = useContext(KeyColorContext);

    if (!context) {
        throw new Error('useKeyColorContext must be used within a KeyColorProvider');
    }

    return context;
};
