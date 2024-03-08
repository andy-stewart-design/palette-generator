import { ComponentProps } from "react";
import { map } from "@/utils/math";
import classes from "./component.module.css";

export default function RangeInput({
  className,
  value,
  min,
  max,
  style,
  ...delegated
}: ComponentProps<"input">) {
  const sliderProgress = map(Number(value), Number(min), Number(max), 0, 100);
  const internalStyle = {
    "--slider-progress": `${sliderProgress}%`,
  };

  return (
    <input
      {...delegated}
      type="range"
      className={`${classes.input} ${className}`}
      value={value}
      min={min}
      max={max}
      style={{ ...style, ...internalStyle }}
    />
  );
}
