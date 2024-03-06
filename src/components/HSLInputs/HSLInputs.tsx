"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import RangeInput from "../base/RangeInput";
import type { Okhsl } from "culori/src/okhsl/types";
import classes from "./component.module.css";

type PropTypes = {
  color: Okhsl;
  updateColor: (color: string | { h: number; s: number; l: number }) => void;
};

export default function HSLInputs({ color, updateColor }: PropTypes) {
  const [hue, setHue] = useState(color.h ?? 0);
  const [saturation, setSaturation] = useState(color.s);
  const [ligthness, setLightness] = useState(color.l);

  useEffect(() => {
    if (color.h !== hue) setHue(color.h ?? 0);
    if (color.s !== saturation) setSaturation(color.s);
    if (color.l !== ligthness) setLightness(color.l);
  }, [color]);

  function updateHue(e: ChangeEvent<HTMLInputElement>) {
    const newHue = parseFloat(e.target.value);
    setHue(newHue);
    updateColor({ h: newHue, s: saturation, l: ligthness });
  }

  function updateSaturation(e: ChangeEvent<HTMLInputElement>) {
    const newSaturation = parseFloat(e.target.value);
    setSaturation(newSaturation);
    updateColor({ h: hue, s: newSaturation, l: ligthness });
  }

  function updateLightness(e: ChangeEvent<HTMLInputElement>) {
    const newLightness = parseFloat(e.target.value);
    setLightness(newLightness);
    updateColor({ h: hue, s: saturation, l: newLightness });
  }

  return (
    <article className={classes.section}>
      <div className={classes.wrapper}>
        <label htmlFor="hue" className={classes.label}>
          H
        </label>
        <RangeInput
          id="hue"
          className={classes.input}
          value={hue}
          onChange={updateHue}
          min={0}
          max={360}
          step={0.1}
        />
        <span className={classes.value}>{hue.toFixed(1)}</span>
      </div>
      <div className={classes.wrapper}>
        <label htmlFor="saturation" className={classes.label}>
          S
        </label>
        <RangeInput
          value={saturation}
          onChange={updateSaturation}
          min={0}
          max={1}
          step={0.01}
        />
        <span className={classes.value}>{saturation.toFixed(2)}</span>
      </div>
      <div className={classes.wrapper}>
        <label htmlFor="lightness" className={classes.label}>
          L
        </label>
        <RangeInput
          value={ligthness}
          onChange={updateLightness}
          min={0}
          max={1}
          step={0.01}
        />
        <span className={classes.value}>{ligthness.toFixed(2)}</span>
      </div>
    </article>
  );
}
