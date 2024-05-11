"use client";

import { AnimatePresence as FramerAP, AnimatePresenceProps } from "framer-motion";

const AnimatePresence: React.FunctionComponent<React.PropsWithChildren<AnimatePresenceProps>> = ({ children, ...delegated }) => {
    return (
        <FramerAP {...delegated}>{children}</FramerAP>
    )
}

export default AnimatePresence;