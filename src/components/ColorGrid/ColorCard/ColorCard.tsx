"use client";

import ColorCardButton from "./ColorCardButton";
import classes from "./component.module.css";
import { motion, circOut } from "framer-motion";

type PageProps = {
  color: string;
  index: number;
  isActive: boolean;
  numItems: number;
};

export default function ColorCard({
  color,
  index,
  isActive,
  numItems,
}: PageProps) {
  const boxShadow = `0 3px 12px -2px rgba(0 0 0 / ${0.6 / (index + 1) + 0.1})`;

  const cardVariants = {
    visible: {
      opacity: 1,
      flex: "1 0 0",
      width: "auto",
      transition: { duration: 0.75, type: "spring", when: "beforeChildren" },
    },
    hidden: {
      opacity: 1,
      flex: "0 0 0",
      width: 0,
      transition: { duration: 0.75, type: "spring", when: "beforeChildren" },
    },
  };

  const hexVariants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: circOut, delay: 0.5 },
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0, ease: circOut },
    },
  };
  return (
    <motion.div
      layout
      exit="hidden"
      variants={cardVariants}
      className={`${classes.card} color-card`}
      data-state={isActive ? "on" : "off"}
      style={{
        "--background-color": color,
        "--box-shadow": boxShadow,
        zIndex: 10 - index,
      }}
    >
      <motion.div
        key={numItems}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={hexVariants}
        className={classes.hex}
      >
        <span>{color}</span>
      </motion.div>
      <ColorCardButton index={index} disabled={isActive} />
    </motion.div>
  );
}
