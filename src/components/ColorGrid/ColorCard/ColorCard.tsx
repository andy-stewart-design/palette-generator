"use client";

import { forwardRef } from "react";
import { motion, circOut } from "framer-motion";
import ColorCardButton from "./ColorCardButton";
import classes from "./component.module.css";

type PageProps = {
  color: string;
  index: number;
  isActive: boolean;
  numItems: number;
};

const ColorCard = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const { color, index, isActive, numItems } = props;
  const boxShadow = `0 3px 12px -2px rgba(0 0 0 / ${0.6 / (index + 1) + 0.1})`;

  const cardVariants = {
    visible: {
      opacity: 1,
      flex: "1 0 0",
      height: "auto",
      transition: { duration: 0.75, type: "spring", when: "beforeChildren" },
    },
    hidden: {
      opacity: 1,
      flex: "0 0 0",
      height: 0,
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
      ref={ref}
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
});

ColorCard.displayName = "ColorCard";

export default ColorCard;
