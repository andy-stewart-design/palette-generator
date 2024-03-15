import ControllerWrapper from "../ControllerWrapper";
import Label from "@/components/Label";
import NumberInput from "@/components/NumberInput";

type PropTypes = {
    defaultValue: number;
};

export default function StepsController({ defaultValue }: PropTypes) {
    return (
        <ControllerWrapper>
            <Label htmlFor="steps">Steps</Label>
            <NumberInput id="steps" param="steps" defaultValue={defaultValue} min={3} max={19} />
        </ControllerWrapper>
    )
}