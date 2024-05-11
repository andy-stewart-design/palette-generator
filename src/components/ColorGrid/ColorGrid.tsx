import ColorCard from "./ColorCard";
import AnimatePresence from "@/components/AnimatePresence";
import classes from "./component.module.css";

type PropTypes = {
  colors: Array<string>;
  names: Array<number>;
};

export default function ColorGrid({ colors, names }: PropTypes) {
  return (
    <section className={classes.grid}>
      <AnimatePresence mode={"popLayout"} initial={false}>
        {colors.map((color, index) => (
          <ColorCard
            key={index}
            color={color}
            name={names[index]}
            index={index}
            numItems={colors.length}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}
