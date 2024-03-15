import type { ReactNode } from "react";
import KeyColorProvider from "./KeyColorProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return <KeyColorProvider>{children}</KeyColorProvider>;
}