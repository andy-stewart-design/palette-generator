"use client";

import ControllerWrapper from "../ControllerWrapper";
import Label from "@/components/Label";
import NumberInput from "@/components/NumberInput";
import { useKeyColorContext } from "@/components/Providers";
import classes from "./component.module.css";

type PropTypes = {
    current: number
    generated: number
    max: number
}

export default function KeyIndexController({ current, generated }: PropTypes) {
    const { updateKeyIndex } = useKeyColorContext();

    const resetIndex = () => updateKeyIndex(-1);

    return (
        <ControllerWrapper>
            <div className={classes.labelWrapper}>
                <Label htmlFor="key-index">Key Index</Label>
                <Label as="span">
                    <button disabled={current === generated} onClick={resetIndex} className={classes.button}>
                        Reset
                    </button >
                </Label>
            </div>
            <NumberInput id="key-index" pushRouter={updateKeyIndex} defaultValue={current} min={0} max={19} />
        </ControllerWrapper>
    )
}