"use client";

import { createContext, useContext, useOptimistic, useTransition, type ReactNode } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

type PropTypes = {
    keyIndex: {
        current: number
        generated: number
    }
    children: ReactNode
}

type KeyColorContextType = {
    isLocked: boolean;
    toggleIsLocked: () => void;
    keyIndex: {
        current: number
        generated: number
    }
    updateKeyIndex: (value: string | number) => void;
}

const KeyColorContext = createContext<KeyColorContextType | undefined>(undefined);

export default function KeyColorProvider({ keyIndex: keyIndexParam, children }: PropTypes) {
    const router = useRouter();
    const params = useSearchParams();
    const keyIsLocked = params.get('lockKey') ? true : false;

    const [_, startTransition] = useTransition();
    const [isLocked, setIsLocked] = useOptimistic(keyIsLocked);
    const [keyIndex, setKeyIndex] = useOptimistic(keyIndexParam);

    function toggleIsLocked() {
        const searchParams = new URLSearchParams(params);

        if (isLocked) {
            searchParams.delete("lockKey");

            if (keyIndex.current === keyIndex.generated) {
                searchParams.delete("keyIndex");
            }
        } else {
            searchParams.set("keyIndex", keyIndex.current.toString());
            searchParams.set("lockKey", 'true');
        }

        startTransition(() => {
            setIsLocked(!isLocked);
            router.push(`/?${searchParams}`, { scroll: false });
        })
    };

    function updateKeyIndex(value: string | number) {
        if (isLocked) return;

        const newValue = typeof value === "string" ? parseInt(value) : value;
        const searchParams = new URLSearchParams(params);

        if (newValue === -1 || newValue === keyIndex.generated) {
            searchParams.delete("keyIndex");
        } else {
            searchParams.set("keyIndex", newValue.toString());
        }

        startTransition(() => {
            if (newValue === -1) {
                setKeyIndex({ ...keyIndex, current: keyIndex.generated });
            } else {
                setKeyIndex({ ...keyIndex, current: newValue });
            }

            router.push(`/?${searchParams}`, { scroll: false });
        })
    }

    const contextValue = {
        isLocked,
        toggleIsLocked,
        keyIndex,
        updateKeyIndex
    };

    return <KeyColorContext.Provider value={contextValue}>{children}</KeyColorContext.Provider>;
};

export const useKeyColorContext = () => {
    const context = useContext(KeyColorContext);

    if (!context) {
        throw new Error('useKeyColorContext must be used within a KeyColorProvider');
    }

    return context;
};
