import { CSSProperties } from "react";
import Color from "@andystewartdesign/colorjs.io";
import ColorCardButton from "./ColorCardButton";
import classes from "./component.module.css";

type PageProps = {
  hue: number;
  saturation: number;
  lightness: number;
  index: number;
  keyIndex: number;
};

export default function ColorCard({
  hue,
  saturation,
  lightness,
  index,
  keyIndex,
}: PageProps) {
  const bgColor = new Color("hsluv", [hue, saturation, lightness]);
  const boxShadow = `0 3px 12px -2px rgba(0 0 0 / ${0.6 / (index + 1) + 0.1})`;

  return (
    <div
      key={lightness}
      className={classes.card}
      data-state={index === keyIndex ? "on" : "off"}
      style={
        {
          "--background-color": bgColor.to("srgb").toString(),
          "--box-shadow": boxShadow,
        } as CSSProperties
      }
    >
      <span className={classes.hex}>
        {bgColor.to("srgb").toString({ format: "hex" })}
      </span>
      <ColorCardButton index={index} disabled={index === keyIndex} />
    </div>
  );
}
