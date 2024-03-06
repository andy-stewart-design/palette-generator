import { ComponentProps } from "react";
import classes from "./component.module.css";

export default function RangeInput({
  className,
  ...delegated
}: ComponentProps<"input">) {
  return (
    <input
      {...delegated}
      type="range"
      className={`${classes.input} ${className}`}
    />
  );
}
