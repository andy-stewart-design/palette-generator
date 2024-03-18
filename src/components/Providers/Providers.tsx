import type { ReactNode } from "react";
import KeyColorProvider from "./KeyColorProvider";

type PropTypes = {
    keyIndex: {
        current: number
        generated: number
    }
    children: ReactNode
}

export default function Providers({ keyIndex, children }: PropTypes) {
    return <KeyColorProvider keyIndex={keyIndex}>{children}</KeyColorProvider>;
}