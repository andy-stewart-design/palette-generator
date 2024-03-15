"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
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

  return (
    <motion.div
      ref={ref}
      layout={true}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className={`${classes.card} color-card`}
      data-state={isActive ? "on" : "off"}
      style={{
        "--background-color": color,
        "--box-shadow": boxShadow,
        zIndex: isActive ? 100000 : 30 - index,
      }}
    >
      <motion.div
        key={numItems}
        layout={true}
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
