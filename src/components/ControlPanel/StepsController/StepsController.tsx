"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ControllerWrapper from "../ControllerWrapper";
import Label from "@/components/Label";
import NumberInput from "@/components/NumberInput";

type PropTypes = {
    defaultValue: number;
};

export default function StepsController({ defaultValue }: PropTypes) {
    const router = useRouter();
    const params = useSearchParams();

    function pushRouter(value: string | number) {
        const newValue = typeof value === "string" ? parseInt(value) : value;
        const searchParams = new URLSearchParams(params);

        if (newValue === 11) searchParams.delete("steps");
        else searchParams.set("steps", newValue.toString());

        const keyIndex = params.get("keyIndex");
        if (keyIndex && parseInt(keyIndex) >= newValue - 1) {
            searchParams.set("keyIndex", (newValue - 1).toString());
        }

        router.push(`/?${searchParams}`, { scroll: false });
    }

    return (
        <ControllerWrapper>
            <Label htmlFor="steps">Steps</Label>
            <NumberInput id="steps" onChangeCallback={pushRouter} defaultValue={defaultValue} min={3} max={19} />
        </ControllerWrapper>
    )
}