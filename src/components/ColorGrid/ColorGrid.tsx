import ColorCard from "./ColorCard";
import AnimatePresence from "@/components/AnimatePresence";
import classes from "./component.module.css";

type PropTypes = {
  colors: Array<string>;
  keyIndex: number;
};

export default function ColorGrid({ keyIndex, colors }: PropTypes) {
  return (
    <section className={classes.grid}>
      <AnimatePresence mode={"popLayout"} initial={false}>
        {colors.map((color, index) => (
          <ColorCard
            key={index}
            color={color}
            index={index}
            isActive={index === keyIndex}
            numItems={colors.length}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}
