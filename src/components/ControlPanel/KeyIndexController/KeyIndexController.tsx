"use client";

import ControllerWrapper from "../ControllerWrapper";
import Label from "@/components/Label";
import NumberInput from "@/components/NumberInput";
import { useKeyColorContext } from "@/components/Providers";
import classes from "./component.module.css";

type PropTypes = {
  max: number;
};

export default function KeyIndexController({ max }: PropTypes) {
  const { keyIndex, updateKeyIndex, isLocked } = useKeyColorContext();

  const resetIndex = () => updateKeyIndex(-1);

  return (
    <ControllerWrapper>
      <div className={classes.labelWrapper}>
        <Label htmlFor="key-index">Key Index</Label>
        <Label as="span">
          <button
            disabled={isLocked || keyIndex.current === keyIndex.generated}
            onClick={resetIndex}
            className={classes.button}
          >
            Reset
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
