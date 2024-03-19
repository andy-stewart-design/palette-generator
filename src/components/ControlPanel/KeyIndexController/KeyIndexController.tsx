"use client";

import ControllerWrapper from "../ControllerWrapper";
import Label from "@/components/Label";
import NumberInput from "@/components/NumberInput";
import { Locked, Undo, Unlocked } from "@/components/icons/16";
import { useKeyColorContext } from "@/components/Providers";
import classes from "./component.module.css";
import VisuallyHidden from "@/components/VisuallyHidden";

type PropTypes = {
  max: number;
};

export default function KeyIndexController({ max }: PropTypes) {
  const { keyIndex, updateKeyIndex, isLocked, toggleIsLocked } =
    useKeyColorContext();

  const resetIndex = () => updateKeyIndex(-1);

  return (
    <ControllerWrapper>
      <div className={classes.labelWrapper}>
        <Label htmlFor="key-index">Key Index</Label>
        <Label as="span">
          <button onClick={toggleIsLocked} className={classes.button}>
            {isLocked ? <Locked /> : <Unlocked />}
            <VisuallyHidden>{isLocked ? "Unlock" : "Lock"}</VisuallyHidden>
          </button>
        </Label>
        <Label as="span">
          <button
            disabled={isLocked || keyIndex.current === keyIndex.generated}
            onClick={resetIndex}
            className={classes.button}
          >
            <Undo />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </Label>
      </div>
      <NumberInput
        id="key-index"
        defaultValue={keyIndex.current}
        onChangeCallback={updateKeyIndex}
        disabled={isLocked}
        min={0}
        max={max}
      />
    </ControllerWrapper>
  );
}
