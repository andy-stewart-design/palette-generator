"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ControllerWrapper from "../ControllerWrapper";
import Label from "@/components/Label";
import NumberInput from "@/components/NumberInput";
import classes from "./component.module.css";

type PropTypes = {
    current: number
    generated: number
    max: number
}

export default function KeyIndexController({ current, generated }: PropTypes) {
    const router = useRouter();
    const params = useSearchParams();

    function handleClick() {
        const searchParams = new URLSearchParams(params);
        searchParams.delete("keyIndex");
        router.push(`/?${searchParams}`, { scroll: false });
    }

    return (
        <ControllerWrapper>
            <div className={classes.labelWrapper}>
                <Label htmlFor="key-index">Key Index</Label>
                <Label as="span">
                    <button disabled={current === generated} onClick={handleClick} className={classes.button}>
                        Reset
                    </button >
                </Label>
            </div>
            <NumberInput id="key-index" param="keyIndex" defaultValue={current} min={0} max={19} />
        </ControllerWrapper>
    )
}