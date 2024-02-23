"use client";

import ColorCard from "./ColorCard";
import { AnimatePresence } from "framer-motion";
import classes from "./component.module.css";

type PropTypes = {
  hue: number;
  saturation: number;
  lightnessValues: number[];
  keyIndex: number;
};

export default function ColorGrid({
  hue,
  saturation,
  lightnessValues,
  keyIndex,
}: PropTypes) {
  return (
    <section className={classes.grid}>
      <AnimatePresence mode={"popLayout"} initial={false}>
        {lightnessValues.map((lightness, index) => (
          <ColorCard
            key={index}
            hue={hue}
            saturation={saturation}
            lightness={lightness}
            index={index}
            keyIndex={keyIndex}
            numItems={lightnessValues.length}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}
